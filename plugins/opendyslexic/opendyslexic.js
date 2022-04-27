/**
 * @file
 * Attaches next behavior for dyslexic functionality.
 */

(function (Drupal, drupalSettings) {

  let init = false;

  Drupal.behaviors.a11y_dyslexic = {
    attach: function (context, settings) {
      let b = this;

      if (!init) {
        init = true;

        b.init();

        let input = document.querySelector('.a11y-dyslexic-control');
        input.addEventListener('click', (e) => {
          b.dispatcher(e, b);
        });
      }
    },

    init: function () {
      let input = document.querySelector('.a11y-dyslexic-control');
      let body  = document.querySelector('body');

      if (Cookies.get('a11y_opendyslexic') === 'true') {
        body.classList.add('a11y-opendyslexic');
        input.classList.add('is-active');
      }
      else {
        body.classList.remove('a11y_opendyslexic');
        input.classList.remove('is-active');
      }
    },

    dispatcher: function (context, b) {
      let input = context.currentTarget;
      let body  = document.querySelector('body');
      let value = null;

      if (input.classList.contains('is-active')) {
        input.classList.remove('is-active');
        body.classList.remove('a11y-opendyslexic');
        value = false;
      }
      else {
        input.classList.add('is-active');
        body.classList.add('a11y-opendyslexic');
        value = true;
      }

      Cookies.set('a11y_opendyslexic', value, {path: '/'});
    },

  }

})(Drupal, drupalSettings);
