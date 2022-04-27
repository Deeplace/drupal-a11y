<?php

namespace Drupal\a11y\Plugin;

use Drupal\a11y\Entity\A11yInterface;
use Drupal\a11y\Plugin\A11YPluginInterface;
use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Defines a manager interface for sync target plugin types.
 */
interface A11yPluginManagerInterface {

  /**
   * Get available sites for a given entity.
   *
   *
   * @return \Drupal\A11y\Entity\A11yInterface[]
   *   An array if sites.
   */
  public function getAvailablePlugins(): array;

  /**
   * Creates a plugin instance using a configured site.
   *
   * @param \Drupal\a11y\Entity\A11yInterface $plugin
   *   The site.
   *
   * @return \Drupal\A11y\Plugin\A11YPluginInterface
   *   The plugin instance.
   *
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   *   Thrown if the site has no plugin set.
   */
  public function createInstanceFromPlugin(A11yInterface $plugin): A11YPluginInterface;

}
