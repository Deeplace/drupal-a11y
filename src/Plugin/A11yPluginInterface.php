<?php

namespace Drupal\a11y\Plugin;

use Drupal\Component\Plugin\PluginInspectionInterface;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Form\FormStateInterface;


/**
 * Defines an interface for A11y plugin plugins.
 */
interface A11yPluginInterface extends PluginInspectionInterface {

  /**
   * Get the plugin label.
   *
   * @return \Drupal\Core\StringTranslation\TranslatableMarkup|string
   *   The plugin label.
   */
  public function getLabel();

  /**
   * Alter content entity form.
   *
   * @param array $form
   *   The form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return array
   *   The altered form.
   */
  public function alterForm(array $form, FormStateInterface $form_state): array;

  /**
   * Build entity from submitted form values.
   *
   * Since plugins may alter the content entity form, they may need a method
   * to update the content entity once the form is submitted.
   *
   * @param array $form
   *   The form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *   The entity instance being built.
   */
  public function buildEntity(array $form, FormStateInterface $form_state, ContentEntityInterface $entity): void;

  /**
   * Build configuration plugin form.
   *
   * @param array $form
   * The form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   * The form state.
   *
   * @return array
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state): array;

}
