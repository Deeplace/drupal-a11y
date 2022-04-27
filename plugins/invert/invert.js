/**
 * @file
 * Attaches next behavior for invert functionality.
 */

(function (Drupal, drupalSettings) {

  let init = false;

  Drupal.behaviors.a11y_invert = {
    attach: function (context, settings) {
      let b = this;

      if (!init) {
        init = true;

        b.init(b);

        let input = document.querySelector('.a11y-invert-control');
        input.addEventListener('click', (e) => {
          b.dispatcher(e, b);
        });
      }
    },

    init: function (b) {
      let input = document.querySelector('.a11y-invert-control');
      let body  = document.querySelector('body');

      if (Cookies.get('a11y_invert') === 'true') {
        b.bodyAlter(body, true);
        body.classList.add('a11y-invert');
        input.classList.add('is-active');
      }
      else {
        b.bodyAlter(body, false);
        body.classList.remove('a11y-invert');
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
        body.classList.remove('a11y-invert');
        b.bodyAlter(body, value);
      }
      else {
        value = true;
        input.classList.add('is-active');
        body.classList.add('a11y-invert');
        b.bodyAlter(body, value);
      }

      Cookies.set('a11y_invert', value, {path: '/'});
    },

    bodyAlter: function(body, mode) {
      let props = body.style.filter.split(' ');

      if (mode) {
        props.push('invert(1)');
        body.style.filter = props.join(' ');
      }
      else {
        props = props.filter(prop => prop !== 'invert(1)');
        body.style.filter = props.join(' ');
      }
    }

  }

})(Drupal, drupalSettings);
