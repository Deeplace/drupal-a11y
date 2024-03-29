/**
 * @file
 * Attaches next behavior for contrast functionality.
 */

(function (Drupal, drupalSettings) {

  let init = false;

  Drupal.behaviors.a11y_contrast = {
    attach: function (context, settings) {
      let b = this;

      if (!init) {
        init = true;

        b.init(b);

        let input = document.querySelector('.a11y-contrast-control');
        input.addEventListener('click', (e) => {
          b.dispatcher(e, b);
        });
      }
    },

    init: function (b) {
      let input = document.querySelector('.a11y-contrast-control');
      let body  = document.querySelector('body');

      if (Cookies.get('a11y_contrast') === 'true') {
        b.bodyAlter(body, true);
        input.classList.add('is-active');
      }
      else {
        b.bodyAlter(body, false);
        input.classList.remove('is-active');
      }
    },

    dispatcher: function (context, b) {
      let input = context.currentTarget;
      let body  = document.querySelector('body');
      let value = null;

      if (input.classList.contains('is-active')) {
        value = false;
        input.classList.remove('is-active');
        b.bodyAlter(body, value);
      }
      else {
        value = true;
        input.classList.add('is-active');
        b.bodyAlter(body, value);
      }

      Cookies.set('a11y_contrast', value, {path: '/'});
    },

    bodyAlter: function(body, mode) {
      let props = body.style.filter.split(' ');

      if (mode) {
        props.push('contrast(2)');
        body.style.filter = props.join(' ');
      }
      else {
        props = props.filter(prop => prop !== 'contrast(2)');
        body.style.filter = props.join(' ');
      }
    }

  }

})(Drupal, drupalSettings);
