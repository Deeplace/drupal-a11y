<?php

namespace Drupal\a11y\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines a A11y plugin item annotation object.
 *
 * @see \Drupal\a11y\Plugin\A11yPluginManager
 * @see plugin_api
 *
 * @Annotation
 */
class A11yPlugin extends Plugin {


  /**
   * The plugin ID.
   *
   * @var string
   */
  public $id;

  /**
   * The label of the plugin.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  public $label;

}
