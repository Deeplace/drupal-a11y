<?php

namespace Drupal\a11y\Entity;

use Drupal\Core\Config\Entity\ConfigEntityInterface;

/**
 * Provides an interface for defining A11y entities.
 */
interface A11yInterface extends ConfigEntityInterface {

  /**
   * Check if the site is enabled.
   *
   * @return bool
   *   TRUE if the site is enabled.
   */
  public function isEnabled(): bool;

  /**
   * Get the implementation type.
   *
   * @return string|null
   *   The implementation type.
   */
  public function getPluginType(): ?string;

  /**
   * Set implementation type (plugin).
   *
   * @param string $type
   *   The implementation type.
   */
  public function setPluginType($type): void;

}
