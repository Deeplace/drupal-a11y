/* globals Drupal */

Drupal.behaviors.a11yContrast = {
  "attach": function attach(context, settings) {
    const $body = jQuery("body", context);

    // contrast functionality
    settings.a11y.contrast = function (el) {
      const $el = jQuery(el)[0];
      const contrast = $el.value;

      if (contrast.length) {
        if (!$body.hasClass("a11y-contrast")) {
          $body.addClass("a11y-contrast");
          $body.append(jQuery(`<link id="a11y-contrast-styles" rel="stylesheet" href="${settings.a11y.path}plugins/contrast/contrast.css" type="text/css" media="screen" />`));
        }

        switch (contrast) {
          case settings.a11y.constants.low_contrast:
            $body.removeClass(settings.a11y.constants.high_contrast).addClass(settings.a11y.constants.low_contrast);
            break;
          case settings.a11y.constants.high_contrast:
            $body.removeClass(settings.a11y.constants.low_contrast).addClass(settings.a11y.constants.high_contrast);
            break;
          case settings.a11y.constants.default_contrast:
          default:
            jQuery("#a11y-contrast-styles", context).remove();
            $body.removeClass(`a11y-contrast ${settings.a11y.constants.low_contrast} ${settings.a11y.constants.high_contrast}`);
        }
      }

      Drupal.behaviors.a11y.cookie("a11y_contrast", contrast);
    };

    // invert functionality
    settings.a11y.invert = function (el) {
      const $el = jQuery(el)[0];
      const invert = $el.value;

      if (invert.length) {
        if (!$body.hasClass("a11y-invert")) {
          $body.addClass("a11y-invert");
          $body.append(jQuery(`<link id="a11y-invert-styles" rel="stylesheet" href="${settings.a11y.path}plugins/contrast/invert.css" type="text/css" media="screen" />`));
        }

        switch (invert) {
          case settings.a11y.constants.partial_invert:
            $body.removeClass(settings.a11y.constants.full_invert).addClass(settings.a11y.constants.partial_invert);
            break;
          case settings.a11y.constants.full_invert:
            $body.removeClass(settings.a11y.constants.partial_invert).addClass(settings.a11y.constants.full_invert);
            break;
          case settings.a11y.constants.default_invert:
          default:
            jQuery("#a11y-invert-styles", context).remove();
            $body.removeClass(`a11y-invert ${settings.a11y.constants.partial_invert} ${settings.a11y.constants.full_invert}`);
        }
      }

      Drupal.behaviors.a11y.cookie("a11y_invert", invert);
    };

    jQuery(".form-item-contrast", context).on("click", function () {
      settings.a11y.contrast(jQuery(this).children()[0]);
    });
    if (jQuery.cookie("a11y_contrast") === settings.a11y.constants.low_contrast) {
      jQuery("#a11y-contrast-low", context).click();
    }
    else if (jQuery.cookie("a11y_contrast") === settings.a11y.constants.high_contrast) {
      jQuery("#a11y-contrast-high", context).click();
    }
    else if (jQuery.cookie("a11y_contrast") === settings.a11y.constants.default_contrast) {
      jQuery("#a11y-contrast-default", context).click();
    }

    jQuery(".form-item-invert", context).on("click", function () {
      settings.a11y.invert(jQuery(this).children()[0]);
    });
    if (jQuery.cookie("a11y_invert") === settings.a11y.constants.partial_invert) {
      jQuery("#a11y-invert-partial", context).click();
    }
    else if (jQuery.cookie("a11y_invert") === settings.a11y.constants.full_invert) {
      jQuery("#a11y-invert-full", context).click();
    }
    else if (jQuery.cookie("a11y_invert") === settings.a11y.constants.default_invert) {
      jQuery("#a11y-invert-default", context).click();
    }
  }
};
