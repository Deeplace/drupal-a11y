<?php


namespace Drupal\a11y\Plugin\A11yPlugin;


use Drupal\a11y\Annotation\A11yPlugin;
use Drupal\a11y\Plugin\A11yPluginBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Markup;

/**
 * Plugin implementation for contrast accessibility.
 *
 * @A11yPlugin(
 *  id = "contrast",
 *  label = @Translation("Contrast")
 * )
 */
class Contrast extends A11YPluginBase {

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state): array {
    $form = parent::buildConfigurationForm($form, $form_state);
    $properties = $this->configuration['plugin_configuration'];

    $form['noop'] = [
      '#type' => 'item',
      '#markup' => Markup::create($this->t('This plugin has no configuration.')),
    ];


    return $form;
  }
}
