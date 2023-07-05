(function() {
  'use strict';

  // Define the text to be replaced and the replacement text
  const searchValue = /th/gi;
  const replaceValue = 'Þ';

  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const newText = node.nodeValue.replace(searchValue, replaceValue);
      if (newText !== node.nodeValue) {
        node.nodeValue = newText;
      }
    }
  }

  function traverseAndReplace(node) {
    replaceText(node);
    const childNodes = node.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      traverseAndReplace(childNodes[i]);
    }
  }

  traverseAndReplace(document.body);

  // Observe and replace text for future DOM changes
  const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
      traverseAndReplace(mutation.target);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
