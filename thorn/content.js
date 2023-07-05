(function() {
  'use strict';

  // Define the text to be replaced and the replacement text
  const searchValue = /hi/gi;
  const replaceValue = 'Þ';

  // Function to replace text within an element
  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const newText = node.nodeValue.replace(searchValue, replaceValue);
      if (newText !== node.nodeValue) {
        node.nodeValue = newText;
      }
    }
  }

  // Function to traverse and replace text within all elements
  function traverseAndReplace(node) {
    replaceText(node);
    const childNodes = node.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      traverseAndReplace(childNodes[i]);
    }
  }

  // Replace text on initial page load
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
