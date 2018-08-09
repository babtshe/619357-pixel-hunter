const util = {
  getElementFromString: (value) => {
    return document.createRange().createContextualFragment(value);
  }
};

export default util; // util;
