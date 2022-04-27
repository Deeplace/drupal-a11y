/**
 * @file
 * Attaches next behavior for textsize functionality.
 */

(function (Drupal, drupalSettings) {

  let init = false;

  Drupal.behaviors.a11y_textsize = {
    attach: function (context, settings) {
      let b = this;

      if (!init) {
        init = true;

        b.init();

        let inputs = document.querySelectorAll('.a11y-textsize-control') || [];
        inputs.forEach(function(input) {
          input.addEventListener('click', (e) => {
            b.dispatcher(e, b);
          });
        })
      }
    },

    init: function () {
      let b = this;
      let body  = document.querySelector('body');
      let factor = Cookies.get('a11y_textsize');

      if (factor !== undefined) {
        body.style.zoom = factor;
      }
      else {
        body.style.zoom = 1;
      }
    },

    dispatcher: function (context, b) {
      let input = context.currentTarget;
      let body  = document.querySelector('body');
      let factor = parseFloat(Cookies.get('a11y_textsize'));

      if (isNaN(factor)) {
        factor = 1;
      }

      if (b.getAttr(input) === 'decrease') {
        factor -= 0.025;
      }
      else if (b.getAttr(input) === 'reset') {
        factor = 1;
      }
      else if (b.getAttr(input) === 'increase') {
        factor += 0.025;
      }
      else {
        factor = 1;
      }

      body.style.zoom = factor;

      Cookies.set(`a11y_textsize`, factor, {path: '/'});
    },

    getAttr: function(input) {
      return input.getAttribute('data-a11y-action');
    }

  }

})(Drupal, drupalSettings);
