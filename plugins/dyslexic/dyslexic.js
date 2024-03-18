/* globals Drupal */

Drupal.behaviors.a11yDyslexic = {
  "attach": function (context, settings) {
    const $body = jQuery("body", context);

    // Add the dyslexic font function to the settings
    settings.a11y.dyslexic = function (el) {
      const $el = jQuery(el)[0];
      const font = $el.value;

      if (font.length) {
        if (!$body.hasClass("a11y-dyslexic")) {
          $body.addClass("a11y-dyslexic");
          $body.append(jQuery(`<link id="a11y-dyslexic-styles" rel="stylesheet" href="${settings.a11y.path}plugins/dyslexic/dyslexic.css" type="text/css" media="screen" />`));
        }

        switch (font) {
          case settings.a11y.constants.opendyslexic:
            $body.removeClass(`${settings.a11y.constants.comic_sans} ${settings.a11y.constants.readable}`).addClass(settings.a11y.constants.opendyslexic);
            break;
          case settings.a11y.constants.comic_sans:
            $body.removeClass(`${settings.a11y.constants.opendyslexic} ${settings.a11y.constants.readable}`).addClass(settings.a11y.constants.comic_sans);
            break;
          case settings.a11y.constants.readable:
            $body.removeClass(`${settings.a11y.constants.opendyslexic} ${settings.a11y.constants.comic_sans}`).addClass(settings.a11y.constants.readable);
            break;
          case settings.a11y.constants.default_font:
          default:
            jQuery("#a11y-dyslexic-styles", context).remove();
            $body.removeClass(`a11y-dyslexic ${settings.a11y.constants.opendyslexic} ${settings.a11y.constants.comic_sans} ${settings.a11y.constants.readable}`);
        }
      }

      Drupal.behaviors.a11y.cookie("a11y_dyslexic", font);
    };

    jQuery(".form-item-dyslexic", context).on("click", function () {
      settings.a11y.dyslexic(jQuery(this).children()[0]);
    });

    if (jQuery.cookie("a11y_dyslexic") === settings.a11y.constants.opendyslexic) {
      jQuery("#a11y-dyslexic-opendyslexic", context).click();
    }
    else if (jQuery.cookie("a11y_dyslexic") === settings.a11y.constants.comic_sans) {
      jQuery("#a11y-dyslexic-comic-sans", context).click();
    }
    else if (jQuery.cookie("a11y_dyslexic") === settings.a11y.constants.readable) {
      jQuery("#a11y-dyslexic-readable", context).click();
    }
    else if (jQuery.cookie("a11y_dyslexic") === settings.a11y.constants.default_font) {
      jQuery("#a11y-dyslexic-default", context).click();
    }
  }
};
