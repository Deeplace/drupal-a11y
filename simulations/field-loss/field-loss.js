/* globals Drupal */
Drupal.behaviors.a11ySimFieldLoss = {
  "attach": function(context, settings) {
    const $body = jQuery("body", context);

    // FieldLoss functionality
    settings.a11y.simulateFieldLoss = function(fieldloss) {
      $body.removeClass("a11y-sim-field-loss a11y-sim-field-loss-central a11y-sim-field-loss-peripheral");
      switch (fieldloss) {
        case "":
        break;
        case "central":
          $body.addClass("a11y-sim-field-loss a11y-sim-field-loss-central");
        break;
        case "peripheral":
          $body.addClass("a11y-sim-field-loss a11y-sim-field-loss-peripheral");
        break;
      }
    };

    // on select list change simulate field loss when the state changes
    jQuery("#a11y-sim-field-loss-select").change(function() {
      settings.a11y.simulateFieldLoss(this.value);
    });
    // throw these fields onto the front of the body
    $body.prepend(`<a id="a11y-sim-field-loss-close" href="#">${Drupal.t("Disable simulation")}</a><div id="a11y-sim-field-loss-area" class="z-depth-5"></div>`);
    // close the simulation when we are done
    jQuery("#a11y-sim-field-loss-close").click(function() {
      jQuery("#a11y-sim-field-loss-select").val("");
      settings.a11y.simulateFieldLoss("");
    });
  }
};

