  /* globals Drupal */

  Drupal.behaviors.a11yCursor = {
  "attach": function attach(context, settings) {
    const $body = jQuery("body", context);

    // Add cursor function to the settings
    settings.a11y.cursorSize = function (el) {
      const $el = jQuery(el)[0];
      const cursor = $el.value;

      if (cursor.length) {
        if (!$body.hasClass("a11y-cursor")) {
          $body.addClass("a11y-cursor");
          $body.append(jQuery(`<link id="a11y-cursor-styles" rel="stylesheet" href="${settings.a11y.path}plugins/cursor/cursor.css" type="text/css" media="screen" />`));
        }

        switch (cursor) {
          case settings.a11y.constants.large_cursor:
            $body.removeClass(`${settings.a11y.constants.medium_cursor} ${settings.a11y.constants.small_cursor}`).addClass(settings.a11y.constants.large_cursor);
            break;
          case settings.a11y.constants.medium_cursor:
            $body.removeClass(`${settings.a11y.constants.large_cursor} ${settings.a11y.constants.small_cursor}`).addClass(settings.a11y.constants.medium_cursor);
            break;
          case settings.a11y.constants.small_cursor:
            $body.removeClass(`${settings.a11y.constants.large_cursor} ${settings.a11y.constants.medium_cursor}`).addClass(settings.a11y.constants.small_cursor);
            break;
          case settings.a11y.constants.default_cursor:
          default:
            jQuery("#a11y-cursor-styles", context).remove();
            $body.removeClass(`a11y-cursor ${settings.a11y.constants.large_cursor} ${settings.a11y.constants.medium_cursor} ${settings.a11y.constants.small_cursor}`);
        }
      }

      Drupal.behaviors.a11y.cookie("a11y_cursor", cursor);
    };

    jQuery(".form-item-cursor", context).on("click", function () {
      settings.a11y.cursorSize(jQuery(this).children()[0]);
    });

    if (jQuery.cookie("a11y_cursor") === settings.a11y.constants.large_cursor) {
      jQuery("#a11y-cursor-large", context).click();
    }
    else if (jQuery.cookie("a11y_cursor") === settings.a11y.constants.medium_cursor) {
      jQuery("#a11y-cursor-medium", context).click();
    }
    else if (jQuery.cookie("a11y_cursor") === settings.a11y.constants.small_cursor) {
      jQuery("#a11y-cursor-small", context).click();
    }
    else if (jQuery.cookie("a11y_cursor") === settings.a11y.constants.default_cursor) {
      jQuery("#a11y-cursor-default", context).click();
    }
  }
};
