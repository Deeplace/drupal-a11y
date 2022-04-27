<?php

namespace Drupal\a11y\Form;

use Drupal\a11y\Plugin\A11yPluginInterface;
use Drupal\a11y\Plugin\A11yPluginManager;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\Core\Messenger\Messenger;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class A11yForm.
 */
class A11yForm extends EntityForm {

  /**
   * The sync target manager.
   *
   * @var \Drupal\a11y\Plugin\A11yPluginManager
   */
  protected $targetManager;

  /**
   * The implementation instance.
   *
   * @var \Drupal\a11y\Entity\A11yInterface
   */
  protected $entity;

  /**
   * The implementation target plugin.
   *
   * @var \Drupal\A11y\Plugin\A11YPluginInterface
   */
  private $plugin;

  /**
   * The entity field manager service.
   *
   * @var \Drupal\Core\Entity\EntityFieldManagerInterface
   */
  protected $entityFieldManager;

  /**
   * The language manager service.
   *
   * @var \Drupal\Core\Language\LanguageManagerInterface
   */
  protected $languageManager;

  /**
   * The messenger service.
   *
   * @var Messenger
   */
  protected $messenger;

  /**
   * {@inheritdoc}
   */
  public function __construct(
    EntityTypeManagerInterface $entityTypeManager,
    EntityFieldManagerInterface $entityFieldManager,
    LanguageManagerInterface $languageManager,
    A11yPluginManager $targetManager,
    Messenger $messenger
  ) {
    $this->entityTypeManager = $entityTypeManager;
    $this->entityFieldManager = $entityFieldManager;
    $this->languageManager = $languageManager;
    $this->targetManager = $targetManager;
    $this->messenger = $messenger;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('entity_field.manager'),
      $container->get('language_manager'),
      $container->get('plugin.manager.a11y_plugin'),
      $container->get('messenger')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    $a11y = $this->entity;
    $form['label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Label'),
      '#maxlength' => 255,
      '#default_value' => $a11y->label(),
      '#description' => $this->t("Label for the A11y."),
      '#required' => TRUE,
    ];

    $form['id'] = [
      '#type' => 'machine_name',
      '#default_value' => $a11y->id(),
      '#machine_name' => [
        'exists' => '\Drupal\a11y\Entity\A11y::load',
      ],
      '#disabled' => !$a11y->isNew(),
    ];

    $form['plugin_configuration'] = [
      '#prefix' => '<div id="plugin-settings-form">',
      '#suffix' => '</div>',
    ];

    $options = $this->targetManager->getPluginsAsOptions();
    $plugin_id = $form_state->getUserInput()['plugin_type'];
    $this->entity->setPluginType($plugin_id);
    $form['plugin_type'] = [
      '#type' => 'select',
      '#title' => $this->t('Accessibility plugin type'),
      '#description' => $this->t('The plugin to implements.'),
      '#options' => $options,
      '#required' => TRUE,
      '#default_value' => $plugin_id,
      '#ajax' => [
        'callback' => [get_class($this), 'pluginFormAjaxCallback'],
        'wrapper' => 'plugin-settings-form',
        'method' => 'replace',
        'effect' => 'fade',
        'speed' => 'slow',
        'progress' => [
          'type' => 'throbber',
          'message' => $this->t('Loading plugin form...'),
        ],
      ],
    ];

    if ($plugin_id !== NULL && $plugin_id !== 'none') {
      try {
        $this->plugin = $this->getPluginInstance();
        $form['plugin_configuration'] += [
          '#type' => 'details',
          '#title' => $this->t(':plugin configuration', [
            ':plugin' => $this->plugin->getLabel(),
          ]),
          '#open' => TRUE,
          '#tree' => TRUE,
        ];
        $form['plugin_configuration'] = $this->plugin->buildConfigurationForm($form['plugin_configuration'], $form_state);
      }
      catch (\Exception $e) {
        $form['plugin_configuration'] += [
          '#type' => 'item',
          '#value' => $e->getMessage(),
        ];
        watchdog_exception('a11y', $e);
      }
    }
    else {
      $form['plugin_configuration'] += [
        '#type' => 'container',
      ];
    }

    /* You will need additional form elements for your custom properties. */

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $a11y = $this->entity;
    $status = $a11y->save();

    switch ($status) {
      case SAVED_NEW:
        $this->messenger->addMessage($this->t('Created the %label A11y.', [
          '%label' => $a11y->label(),
        ]));
        break;

      default:
        $this->messenger->addMessage($this->t('Saved the %label A11y.', [
          '%label' => $a11y->label(),
        ]));
    }
    $form_state->setRedirectUrl($a11y->toUrl('edit-form'));
  }

  /**
   * Get target plugin instance.
   *
   * @return \Drupal\a11y\Plugin\A11YPluginInterface
   *   The target plugin instance.
   *
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   *   Thrown if the target site does not exists.
   */
  protected function getPluginInstance(): A11yPluginInterface {
    return $this->targetManager->createInstanceFromPlugin($this->entity);
  }

  /**
   * AJAX callback to update the fields container.
   *
   * @param array $form
   *   The form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   *
   * @return array
   *   The form element.
   */
  public static function fieldsAjaxCallback(array &$form, FormStateInterface $form_state): array {
    $form_state->setRebuild();
    return $form['fields'];
  }

}
