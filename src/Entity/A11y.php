<?php

namespace Drupal\a11y\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBase;

/**
 * Defines the A11y entity.
 *
 * @ConfigEntityType(
 *   id = "a11y",
 *   label = @Translation("A11y"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\a11y\A11yListBuilder",
 *     "form" = {
 *       "add" = "Drupal\a11y\Form\A11yForm",
 *       "edit" = "Drupal\a11y\Form\A11yEditForm",
 *       "delete" = "Drupal\a11y\Form\A11yDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\a11y\A11yHtmlRouteProvider",
 *     },
 *   },
 *   config_prefix = "a11y",
 *   config_export= {"id", "label", "plugin_type", "plugin_configuration"},
 *   admin_permission = "administer site configuration",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "label",
 *     "uuid" = "uuid"
 *   },
 *   links = {
 *     "canonical" = "/admin/config/system/accessibility/a11y/{a11y}",
 *     "add-form" = "/admin/config/system/accessibility/a11y/add",
 *     "edit-form" = "/admin/config/system/accessibility/a11y/{a11y}/edit",
 *     "delete-form" = "/admin/config/system/accessibility/a11y/{a11y}/delete",
 *     "collection" = "/admin/config/system/accessibility/a11y"
 *   }
 * )
 */
class A11y extends ConfigEntityBase implements A11yInterface {

  /**
   * The A11y ID.
   *
   * @var string
   */
  protected $id;

  /**
   * The A11y label.
   *
   * @var string
   */
  protected $label;

  /**
   * The plugin type.
   *
   * @var $plugin
   */
  protected $plugin_type;


  /**
   * {@inheritdoc}
   */
  public function isEnabled(): bool {
    return $this->get('status') ?? FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getPluginType(): ?string {
    return $this->get('plugin_type') ?? 'none';
  }

  /**
   * {@inheritdoc}
   */
  public function setPluginType($type): void {
    $this->set('plugin_type', $type);
  }

}
