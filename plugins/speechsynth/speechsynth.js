/* globals Drupal */
/* globals SpeechSynthesisUtterance */

Drupal.behaviors.a11ySpeechSynth = {
  "attach": function (context, settings) {
    // speechSynth functionality
    settings.a11y.speechSynth = function(speechSynth) {
      const text = jQuery(settings.a11y.speechSynthSelector).text();
      settings.a11y.say(text);
      settings.behaviors.a11y.cookie("a11y_speechsynth", speechSynth);
    };

    // say something to the user if asked
    settings.a11y.say = function(text, pitch, rate) {
      // talk to me
      if (typeof window.speechSynthesis !== "undefined") {
        settings.a11y.synth = window.speechSynthesis;
        settings.a11y.voices = settings.a11y.synth.getVoices();
        settings.a11y.utter = new SpeechSynthesisUtterance(text);
        // nothing crazy so we can understand our robot
        if (typeof pitch === "undefined") {
          settings.a11y.utter.pitch = 1;
        }
        else {
          settings.a11y.utter.pitch = pitch;
        }
        if (typeof rate === "undefined") {
          settings.a11y.utter.rate = 1;
        }
        else {
          settings.a11y.utter.rate = rate;
        }
        settings.a11y.utter.lang = "en-US";
        settings.a11y.utter.voice = settings.a11y.defaultVoice;
        // THOU SPEAKITH
        settings.a11y.synth.speak(settings.a11y.utter);
      }
    };

    jQuery("#a11y-speechsynth-checkbox", context).click(function () {
      settings.a11y.speechSynth(this.checked);
    });
    // @todo make a setting for automatically going to the next page
    // to basically keep reading along with you
    // @todo ability to underline word it is saying as well as scroll the page for it to be in view
    // test for cookie being set
    //if ($.cookie("a11y_speechsynth") == "true") {
    //  jQuery("#a11y_speechsynth_checkbox").click();
    //}
  }
};
