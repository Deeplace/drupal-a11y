<?php


namespace Drupal\a11y\Plugin\A11yPlugin;


use Drupal\a11y\Annotation\A11yPlugin;
use Drupal\a11y\Plugin\A11yPluginBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation for keyboard accessibility.
 *
 * @A11yPlugin(
 *  id = "keyboard",
 *  label = @Translation("Keyboard tabulation")
 * )
 */
class Keyboard extends A11YPluginBase {

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state): array {
    $form = parent::buildConfigurationForm($form, $form_state);
    $properties = $this->configuration['plugin_configuration'];

    $form['border'] = [
      '#type' => 'details',
      '#title' => 'Border',
      '#open' => 'true'
    ];

    $form['border']['type'] = [
      '#type' => 'select',
      '#title' => 'Type',
      '#description' => 'Choose the color for the outline border',
      '#options' => [
        'solid' => 'Solid',
        'dashed' => 'Dashed',
        'dotted' => 'Dotted'
      ],
      '#default_value' => $properties['border']['type']
    ];

    $form['border']['outline_color'] = [
      '#type' => 'color',
      '#title' => 'Outline Color',
      '#description' => 'Choose the color for the outline border',
      '#default_value' => $properties['border']['outline_color']
    ];

    $form['border']['color'] = [
      '#type' => 'color',
      '#title' => 'Color',
      '#description' => 'Choose the color for the border',
      '#default_value' => $properties['border']['color']
    ];

    $form['border']['size'] = [
      '#type' => 'number',
      '#title' => 'Size',
      '#description' => 'Border size in px',
      '#default_value' => $properties['border']['size']
    ];

    $form['border']['box_size'] = [
      '#type' => 'number',
      '#title' => 'Box size',
      '#description' => 'The box size in px',
      '#default_value' => $properties['border']['box_size']
    ];

    return $form;
  }
}
