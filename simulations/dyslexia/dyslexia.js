/* globals Drupal */
function messUpMessyPart(messyPart) {
  if (messyPart.length < 3) {
    return messyPart;
  }
  const firstChar = messyPart[0];
  const lastChar = messyPart[messyPart.length - 1];
  const middleChars = messyPart.slice(1, -1).split("");
  middleChars.sort(() => Math.random() - 0.5); // Randomize chars
  return firstChar + middleChars.join("") + lastChar;
}

function messUpWord (word) {
  if (word.length < 3) {
    return word;
  }
  return word[0] + messUpMessyPart(word.slice(1, -1)) + word[word.length - 1];
}

function messUpWords () {
  for (let i = 0; i < Drupal.settings.a11y.textNodes.length; i++) {
    const node = Drupal.settings.a11y.textNodes[i];
    for (let j = 0; j < Drupal.settings.a11y.wordsInTextNodes[i].length; j++) {
      // Only change a tenth of the words each round.
      if (Math.random() > 1/10) {
        continue;
      }
      const wordMeta = Drupal.settings.a11y.wordsInTextNodes[i][j];
      const word = node.textContent.slice(wordMeta.position, wordMeta.position + wordMeta.length);
      const before = node.textContent.slice(0, wordMeta.position);
      const after  = node.textContent.slice(wordMeta.position + wordMeta.length);
      node.textContent = before + messUpWord(word) + after;
    }
  }
}

Drupal.behaviors.a11ySimulateDyslexia = {
  "attach": function attach(context, settings) {
    const $body = jQuery("body", context);

    jQuery("#a11y-sim-dyslexia-checkbox", context).click(function() {
      settings.a11y.simulateDyslexia(this.checked);
    });

    // dyslexia functionality
    settings.a11y.simulateDyslexia = function (dyslexia) {
      if (dyslexia === true) {
        $body.addClass("a11y-simulate-dyslexia");
        const getTextNodesIn = function(el) {
          return jQuery(el).find(":not(iframe,script)").addBack().contents().filter(function() {
            return this.nodeType === 3;
          });
        };

        settings.a11y.textNodes = getTextNodesIn(jQuery("p, h1, h2, h3"));
        settings.a11y.wordsInTextNodes = [];
        for (let i = 0; i < settings.a11y.textNodes.length; i++) {
          const node = settings.a11y.textNodes[i];
          const words = [];
          const re = /\w+/g;
          let match;
          while ((match = re.exec(node.nodeValue)) != null) {
            const word = match[0];
            const position = match.index;
            words.push({
              length: word.length,
              position: position
            });
          }
          settings.a11y.wordsInTextNodes[i] = words;
        }

        setInterval(messUpWords, 50);
      }
      else {
        location.reload();
        $body.removeClass("a11y-simulate-dyslexia");
      }
    };
  }
};
