/**
 * @file
 * Attaches next behavior for keyboard functionality.
 */

(function (Drupal, drupalSettings) {

  const elemName = 'keyboard-accessibility';
  const {
    size,
    type,
    color,
    outline_color,
    box_size} = drupalSettings.a11y.keyboard.border;

  let init = false;

  Drupal.behaviors.a11y_keyboard = {

    attach: function (context, settings) {
      let _behavior = this;

      if (!init) {
        init = true;

        _behavior.init();

        document.addEventListener('keyup', (e) => {
          _behavior.show();
          _behavior.keyUp(e);
        });
        document.addEventListener('keypress', (e) => {
          _behavior.show();
          _behavior.keyUp(e);
        });
        document.addEventListener('mousedown', _behavior.hide);
        document.addEventListener('scroll', _behavior.hide);
        document.addEventListener('keydown', _behavior.hide);
      }
    },

    detach: function () {
      let _behavior = this;

      document.removeEventListener('keyup', _behavior.keyUp);
      document.removeEventListener('keypress', _behavior.keyPress);
      document.removeEventListener('mousedown', _behavior.hide);
      document.removeEventListener('scroll', _behavior.hide);
      document.removeEventListener('keydown', _behavior.hide);
    },

    init: function() {
      const container = document.createElement('div');
      container.setAttribute('class', elemName);
      container.style.display = 'none';
      container.style.border = `${size}px ${type} ${color}`;
      container.style.outline = `${size}px ${type} ${outline_color}`;
      document.body.append(container);
    },

    hide: function(e) {
      const container = document.querySelector(`.${elemName}`);
      switch (e.which) {
        case 1:
        case 3:
        case undefined:
          container.style.display = 'none';
      }
    },

    show: function(e) {
      const container = document.querySelector(`.${elemName}`);
      container.style.display = 'block';
    },

    keyUp: function(e) {
      if (e.which === 9 || e.keyCode === 'Tab') {
        Drupal.behaviors.a11y_keyboard.onTabulate();
      }
    },

    keyPress: function(e) {
      if (e.which === 9 || e.keyCode === 'Tab') {
        Drupal.behaviors.a11y_keyboard.onTabulate();
      }
    },

    onTabulate: function() {
      let _behavior = this;
      _behavior.show;

      const container = document.querySelector(`.${elemName}`);
      const active = document.activeElement;
      let clientRect = active.getBoundingClientRect();

      // Needed to iterate over elements.
      let childrenElement = document.activeElement;
      let parentElement = document.activeElement;
      let hasChildren = true;

      // Get dimensions of the current element.
      let width = active.offsetWidth ? active.offsetWidth : 0;
      let height = active.offsetHeight ? active.offsetHeight : 0;

      // Maybe the current element has no dimensions, then iterate over his children to find dimensions.
      // In case that children has not dimensions, iterate over his parents until find dimensions of the
      // current selected element.
      while (width === 0 || height === 0) {
        if (childrenElement.hasChildNodes() && hasChildren === true) {
          childrenElement = childrenElement.childNodes[0];
          if (childrenElement.tagName) {
            clientRect = childrenElement.getBoundingClientRect();
          }
          width = childrenElement.offsetWidth ? childrenElement.offsetWidth : 0;
          height = childrenElement.offsetHeight ? childrenElement.offsetHeight : 0;
        }
        else {
          hasChildren = false;
          parentElement = parentElement.parentElement;
          if (parentElement.tagName) {
            clientRect = parentElement.getBoundingClientRect();
          }
          width = parentElement.offsetWidth ? parentElement.offsetWidth : 0;
          height = parentElement.offsetHeight ? parentElement.offsetHeight : 0;
        }
      }

      // Get the position of the selected element.
      const left = clientRect.left ? clientRect.left : 0;
      const top = clientRect.top ? clientRect.top : 0;

      container.style.left = `${left - (box_size/4)}px`;
      container.style.top = `${top - (box_size/4)}px`;
      container.style.width = `${(width + (box_size/2))}px`;
      container.style.height = `${(height + (box_size/2))}px`;

    },
  }

})(Drupal, drupalSettings);
