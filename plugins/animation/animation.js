/**
 * @file
 * Attaches next behavior for animation functionality.
 */

(function (Drupal, drupalSettings) {

  let init = false;

  Drupal.behaviors.a11y_animation = {
    attach: function (context, settings) {
      let b = this;

      if (!init) {
        init = true;

        b.init();

        let input = document.querySelector('.a11y-animation-control');
        input.addEventListener('click', (e) => {
          b.dispatcher(e, b);
        });
      }
    },

    init: function () {
      let input = document.querySelector('.a11y-animation-control');
      let body  = document.querySelector('body');

      if (Cookies.get('a11y_animation') === 'true') {
        body.classList.add('a11y-animation');
        input.classList.add('is-active');
      }
      else {
        body.classList.remove('a11y_animation');
        input.classList.remove('is-active');
      }
    },

    dispatcher: function (context, b) {
      let input = context.currentTarget;
      let body  = document.querySelector('body');
      let value = null;

      if (input.classList.contains('is-active')) {
        input.classList.remove('is-active');
        body.classList.remove('a11y-animation');
        value = false;
      }
      else {
        input.classList.add('is-active');
        body.classList.add('a11y-animation');
        value = true;
      }

      Cookies.set('a11y_animation', value, {path: '/'});
    },

  }

})(Drupal, drupalSettings);
