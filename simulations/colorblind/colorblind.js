/* globals Drupal */
Drupal.behaviors.colorblind = {
  "attach": function (context, settings) {
    // colorblind functionality
    settings.a11y.simulateColorBlindness = function (colorblind) {
      const $globalContainer = jQuery("#global-container");
      $globalContainer.removeClass("protanopia protanomaly deuteranopia deuteranomaly tritanopia tritanomaly achromatopsia achromatomaly");
      switch (colorblind) {
        case "":
          break;
        default:
          $globalContainer.addClass(colorblind);
          break;
      }
    };

    // on select list change simulate field loss when the state changes
    jQuery("#a11y-sim-colorblind-select").change(function () {
      settings.a11y.simulateColorBlindness(this.value);
    });
  }
};
