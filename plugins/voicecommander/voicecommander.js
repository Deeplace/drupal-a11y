/* globals Drupal */

Drupal.behaviors.a11yVoiceCommander = {
  "attach": function (context, settings) {
    // voicecommander functionality
    settings.a11y.voiceCommander = function(voicecommander) {
      Drupal.behaviors.a11y.cookie("a11y_voicecommander", voicecommander);
      // set the cookie then reload
      location.reload();
    };

    jQuery("#a11y-voicecommander-checkbox", context).click(function() {
      settings.a11y.voiceCommander(this.checked);
    });
    // test for cookie being set
    if (jQuery.cookie("a11y_voicecommander") === "true") {
      settings.a11y.voiceCommander.continuous = true;
    }
    // default checkbox on if we should
    if (typeof settings.a11y.voiceCommander !== "undefined" && settings.a11y.voiceCommander.continuous === true) {
      jQuery("#a11y-voicecommander-checkbox").checked = true;
      jQuery("#a11y-voicecommander-checkbox").attr("checked", "checked");
    }
  }
};
