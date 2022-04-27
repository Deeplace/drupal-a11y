<?php

namespace Drupal\a11y\Plugin;

use Drupal\a11y\Entity\A11yInterface;
use Drupal\Component\Plugin\Exception\PluginException;
use Drupal\Core\Messenger\MessengerTrait;
use Drupal\Core\Plugin\DefaultPluginManager;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Provides the A11y plugin plugin manager.
 */
class A11yPluginManager extends DefaultPluginManager implements A11yPluginManagerInterface {

  use MessengerTrait, StringTranslationTrait;

  /**
   * The entity-type manager service.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The language manager service.
   *
   * @var \Drupal\Core\Language\LanguageManagerInterface
   */
  private $languageManager;

  /**
   * The module settings.
   *
   * @var \Drupal\Core\Config\ImmutableConfig
   */
  private $config;

  /**
   * Constructs a new A11yPluginManager object.
   *
   * @param \Traversable $namespaces
   *   An object that implements \Traversable which contains the root paths
   *   keyed by the corresponding namespace to look for plugin implementations.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_backend
   *   Cache backend instance to use.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke the alter hook with.
   */
  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    parent::__construct('Plugin/A11yPlugin', $namespaces, $module_handler, 'Drupal\a11y\Plugin\A11yPluginInterface', 'Drupal\a11y\Annotation\A11yPlugin');

    $this->alterInfo('a11y_a11y_plugin_info');
    $this->setCacheBackend($cache_backend, 'a11y_a11y_plugin_plugins');
  }



  /**
   * @inheritdoc
   */
  public function getAvailablePlugins(): array {
    $pluginAsListOption = [];

    try {
      $storage = \Drupal::entityTypeManager()->getStorage('a11y');
      $query = $storage->getQuery()
        ->condition('status', TRUE);
      $ids = $query->execute();
      $plugins = $storage->loadMultiple($ids);
      foreach ($plugins as $key => $plugin) {
        $pluginAsListOption[$key] = $plugin->label();
      }
    }
    catch (\Exception $e) {
      watchdog_exception('a11y', $e);
    }

    return $pluginAsListOption;
  }


  /**
   * @inheritdoc
   */
  public function createInstanceFromPlugin(A11yInterface $plugin): A11YPluginInterface {
    if ($plugin->getPluginType() === NULL) {
      throw new PluginException($this->t('The implementation %label has no plugin set yet.', [
        '%label' => $plugin->label(),
      ]));
    }

    $configuration = $plugin->toArray();
    $configuration['implementation'] = $configuration['id'];
    // Unset non-configuration plugin keys.
    unset($configuration['id'], $configuration['plugin_type'], $configuration['dependencies']);
    /** @var \Drupal\a11y\Plugin\A11YPluginInterface $plugin */
    $plugin = $this->createInstance($plugin->getPluginType(), $configuration);

    return $plugin;
  }

  /**
   * Get plugins definitions as options.
   *
   * Typically to be used as select/checkboxes/radios element options.
   *
   * @return array
   *   An array of id => label pairs of plugins.
   */
  public function getPluginsAsOptions() {
    $definitions = $this->getDefinitions();
    $plugins = array_column($definitions, 'label', 'id');
    asort($plugins);

    return $plugins;
  }

  public function getProviderFromPlugin(A11yInterface $plugin): string {
    /** @var \Drupal\a11y\Plugin\A11yPluginInterface $instace */
    $instance = self::createInstanceFromPlugin($plugin);
    return $instance->getPluginDefinition()['provider'];
  }

}
