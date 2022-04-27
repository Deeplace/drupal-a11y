<?php

namespace Drupal\a11y;

use Drupal\Core\Config\Entity\ConfigEntityListBuilder;
use Drupal\Core\Entity\EntityInterface;

/**
 * Provides a listing of A11y entities.
 */
class A11yListBuilder extends ConfigEntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['label'] = $this->t('Plugin');
    $header['id'] = $this->t('Machine name');
    $header['enabled'] = $this->t('Enabled');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    $row['label'] = $entity->label();
    $row['id'] = $entity->id();
    $row['enabled'] = ($entity->get('status')) ? $this->t('Yes') : $this->t('No');
    // You probably want a few more properties here...
    return $row + parent::buildRow($entity);
  }

}
