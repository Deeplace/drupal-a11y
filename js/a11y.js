/* jshint esversion: 6 */
/* globals Drupal */

Drupal.behaviors.a11y = {
  "cookie": function cookie(name, value) {
    return jQuery.cookie(name, value, { path: "/", domain: Drupal.settings.a11y.domain });
  },
  "attach": function attach(context, settings) {
    settings.a11y = settings.a11y || { functions: {} };
    settings.a11y.constants = settings.a11y.constants || {};
    settings.a11y.constants.disable_animation = "disable-animation";
    settings.a11y.constants.enable_animation = "enable-animation";
    settings.a11y.constants.low_contrast = "low-contrast";
    settings.a11y.constants.high_contrast = "high-contrast";
    settings.a11y.constants.default_contrast = "default-contrast";
    settings.a11y.constants.partial_invert = "partial-invert";
    settings.a11y.constants.full_invert = "full-invert";
    settings.a11y.constants.default_invert = "default-invert";
    settings.a11y.constants.large_cursor = "large-cursor";
    settings.a11y.constants.medium_cursor = "medium-cursor";
    settings.a11y.constants.small_cursor = "small-cursor";
    settings.a11y.constants.default_cursor = "default-cursor";
    settings.a11y.constants.opendyslexic = "opendyslexic";
    settings.a11y.constants.comic_sans = "comic-sans";
    settings.a11y.constants.readable = "readable";
    settings.a11y.constants.default_font = "default-font";

    // Reset all settings
    jQuery("#a11y-reset-all", context).click(function () {
      const $body = jQuery("body");
      const $globalContainer = jQuery("#global-container");
      const $oversizedWidgetCheckbox = jQuery("#a11y-oversized-widget", context);

      // Reset widget size
      $oversizedWidgetCheckbox.prop("checked", false);
      jQuery("#a11y-widget").removeClass("oversized");

      // Enable animations
      jQuery.fx.off = false;

      // Text size
      settings.a11y.factor = 1;
      $globalContainer.css({ "zoom": "", "-moz-transform": "" });

      // Delete data
      jQuery("#a11y-textsize-styles, #a11y-contrast-styles, #a11y-invert-styles, #a11y-dyslexic-styles, #a11y-animation-styles, #a11y-cursor-styles").remove();
      $body.removeClass(`a11y-textsize a11y-invert a11y-contrast a11y-animation a11y-dyslexic a11y-cursor ${settings.a11y.constants.low_contrast} ${settings.a11y.constants.high_contrast} ${settings.a11y.constants.partial_invert} ${settings.a11y.constants.full_invert} ${settings.a11y.constants.disable_animation} ${settings.a11y.constants.enable_animation} ${settings.a11y.constants.opendyslexic} ${settings.a11y.constants.comic_sans} ${settings.a11y.constants.readable} ${settings.a11y.constants.large_cursor} ${settings.a11y.constants.medium_cursor} ${settings.a11y.constants.small_cursor}`);
      Drupal.behaviors.a11y.cookie("a11y_factor", 1);
      Drupal.behaviors.a11y.cookie("a11y_contrast", null);
      Drupal.behaviors.a11y.cookie("a11y_invert", null);
      Drupal.behaviors.a11y.cookie("a11y_animation", null);
      Drupal.behaviors.a11y.cookie("a11y_dyslexic", null);
      Drupal.behaviors.a11y.cookie("a11y_cursor", null);
      Drupal.behaviors.a11y.cookie("a11y_oversized_widget", false);
    });
  }
};
