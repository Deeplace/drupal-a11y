<?php

namespace Drupal\a11y\Plugin\Block;

use Drupal\a11y\Entity\A11yInterface;
use Drupal\a11y\Plugin\A11yPluginManagerInterface;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Config\Entity\ConfigEntityStorageInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'A11yBlock' block.
 *
 * @Block(
 *  id = "a11y_block",
 *  admin_label = @Translation("A11y"),
 * )
 */
class A11yBlock extends BlockBase implements ContainerFactoryPluginInterface{

  /**
   * The platform integration plugin manager.
   *
   * @var \Drupal\a11y\Plugin\A11yPluginManager
   */
  private $pluginManager;

  /**
   * The platform entity storage.
   *
   * @var \Drupal\Core\Config\Entity\ConfigEntityStorageInterface
   */
  private $storage;

  /**
   * The platform entities.
   *
   * @var A11yInterface[]
   */
  private $entities;

  public function __construct(array $configuration,
                              $plugin_id, $plugin_definition,
                              A11yPluginManagerInterface $pluginManager,
                              ConfigEntityStorageInterface $storage) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->pluginManager = $pluginManager;
    $this->storage = $storage;
    $this->entities = [];
  }


  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('plugin.manager.a11y_plugin'),
      $container->get('entity_type.manager')->getStorage('a11y')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $plugins = $this->pluginManager->getAvailablePlugins();

    if (empty($plugins)) {
      $form['#markup'] = $this->t('There are no plugins implemented. Please, follow the instructions provided in @link', [
        '@link' => (string) Url::fromRoute('<front>')->toString(),
      ]);

      return $form;
    }

    $configuration = $this->getConfiguration();

    $form['plugins'] = [
      '#type' => 'checkboxes',
      '#title' => $this->t('Available plugins'),
      '#descrption' => $this->t('When rendering the block only those platforms implementing the selected plugins will be used for the output.'),
      '#options' => $plugins,
      '#default_value' => $configuration['plugins'],
      '#required' => TRUE,
    ];

    $form['wrapper_classes'] = [
      '#type' => 'textfield',
      '#title' => $this->t('CSS classes'),
      '#description' => $this->t('A list of space-separated CSS classes to apply to the block. E.g. "class-1 class-2".'),
      '#default_value' => $this->configuration['wrapper_classes'],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);

    $plugins = $form_state->getValue('plugins');
    foreach ($plugins as $key => $value) {
      if ($value === 0) {
        unset($plugins[$key]);
      }
    }

    $this->configuration['plugins'] = $plugins;
    $this->configuration['wrapper_classes'] = $form_state->getValue('wrapper_classes');
  }


  /**
   * {@inheritdoc}
   */
  public function build() {
    $block = [];

    $storage = $this->storage;
    $plugins = $storage->loadMultiple($this->getConfiguration()['plugins']);

    if (!$plugins) {
      return $block;
    }

    if (!empty(trim($this->getConfiguration()['wrapper_classes']))) {
      $classes = explode(' ', trim($this->getConfiguration()['wrapper_classes']));
      $block['#attributes']['class'] = $classes;
    }

    foreach ($plugins as $plugin) {
      /** @var A11yInterface $plugin */
      $id = $plugin->getPluginType();
      $provider = $this->pluginManager->getProviderFromPlugin($plugin);

      // Attach the specify library.
      $block['#attached']['library'][] = "$provider/$id";

      // Get the plugin configuration
      $plugin_configuration = $plugin->get('plugin_configuration');
      $block['#attached']['drupalSettings']['a11y'][$id] = $plugin_configuration;

      $block['a11y']['#plugins'][$id] = TRUE;

    }

    $block['a11y']['#theme'] = 'a11y_template';
    $block['#attached']['library'][] = 'a11y/global';

    return $block;
  }

}
