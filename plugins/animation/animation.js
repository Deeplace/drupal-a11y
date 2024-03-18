/* globals Drupal */

Drupal.behaviors.a11yAnimation = {
  "attach": function attach(context, settings) {
    const $body = jQuery("body", context);

    // Add animation functionality to the settings
    settings.a11y.animation = function (el) {
      const $el = jQuery(el)[0];
      const animation = $el.value;

      if (animation.length) {
        if (!$body.hasClass("a11y-animation")) {
          $body.addClass("a11y-animation");
          $body.append(jQuery(`<link id="a11y-animation-styles" rel="stylesheet" href="${settings.a11y.path}plugins/animation/animation.css" type="text/css" media="screen" />`));
        }

        switch (animation) {
          case settings.a11y.constants.disable_animation:
            jQuery.fx.off = true;
            $body.addClass(settings.a11y.constants.disable_animation);
            break;
          case settings.a11y.constants.enable_animation:
          default:
            jQuery.fx.off = false;
            jQuery("#a11y-animation-styles", context).remove();
            $body.removeClass(`a11y-animation ${settings.a11y.constants.disable_animation}`);
        }
      }

      Drupal.behaviors.a11y.cookie("a11y_animation", animation);
    };

    jQuery(".form-item-animation", context).on("click", function () {
      settings.a11y.animation(jQuery(this).children()[0]);
    });

    if (jQuery.cookie("a11y_animation") === settings.a11y.constants.disable_animation) {
      jQuery("#a11y-animation-disable", context).click();
    }
    else if (jQuery.cookie("a11y_animation") === settings.a11y.constants.enable_animation) {
      jQuery("#a11y-animation-enable", context).click();
    }
  }
};
