/* globals Drupal */

Drupal.behaviors.a11yOversizedWidget = {
  "attach": function attach(context, settings) {
    const $widget = jQuery("#a11y-widget", context);

    // Add the widget function to the settings
    settings.a11y.oversizedWidget = function (checked) {
      if (checked === true) {
        $widget.addClass("oversized");
      }
      else {
        $widget.removeClass("oversized");
      }

      Drupal.behaviors.a11y.cookie("a11y_oversized_widget", checked);
    };

    const $checkbox = jQuery("#a11y-oversized-widget", context);
    $checkbox.on("click", function () {
      settings.a11y.oversizedWidget(jQuery(this).prop("checked"));
    });

    if (jQuery.cookie("a11y_oversized_widget") === "true") {
      $checkbox.prop("checked", true);
      settings.a11y.oversizedWidget(true);
    }
    else {
      $checkbox.prop("checked", false);
      settings.a11y.oversizedWidget(false);
    }
  }
};
