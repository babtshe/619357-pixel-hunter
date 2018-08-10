const util = {
  getElementFromString: (value) => {
    return document.createRange().createContextualFragment(value);
  },
  clearElement: (elem) => {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  },
};

export default util; // util;
