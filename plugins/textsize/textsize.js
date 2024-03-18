/* globals Drupal */

const TEXTSIZE = 1.4;

Drupal.behaviors.a11yTextsize = {
  "attach": function (_context, settings) {
    // Add the "text size" function to the settings
    settings.a11y.textSize = function (scale) {
      if (scale === 0) {
        return;
      }
      else if ((scale === 1 && settings.a11y.factor >= TEXTSIZE) || (settings.a11y.factor === null && scale === 0)) {
        settings.a11y.factor = 1;
      }
      else if (scale === 1 && settings.a11y.factor < TEXTSIZE) {
        settings.a11y.factor = parseFloat(settings.a11y.factor) + 0.2;
      }

      const $body = jQuery("body");
      const $globalContainer = jQuery("#global-container");

      if (parseFloat(settings.a11y.factor) === 1) {
        $body.removeClass("a11y-textsize");
        $globalContainer.css({ "zoom": "", "-moz-transform": "" });
        jQuery("#a11y-textsize-styles").remove();
      }
      else {
        if (!$body.hasClass("a11y-textsize")) {
          $body.addClass("a11y-textsize");
          $body.append(jQuery(`<link id="a11y-textsize-styles" rel="stylesheet" href="${settings.a11y.path}plugins/textsize/textsize.css" type="text/css" media="screen" />`));
        }

        $globalContainer.css({ "zoom": settings.a11y.factor, "-moz-transform": `scale(${settings.a11y.factor})` });
      }

      // Resizing the jQuery(window) to prevent other plugin bugs
      jQuery(window).resize();
      Drupal.behaviors.a11y.cookie("a11y_factor", settings.a11y.factor);
    };

    if (jQuery.cookie("a11y_factor") !== null) {
      const factor = jQuery.cookie("a11y_factor");
      settings.a11y.factor = factor;
      settings.a11y.textSize(factor);
    } else {
      settings.a11y.textSize(0);
    }
  }
};
