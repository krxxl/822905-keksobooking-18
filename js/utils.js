'use strict';

// util
(function () {
  window.getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.setAttrDisabled = function (col) {
    for (var i = 0; i < col.length; i++) {
      col[i].setAttribute('disabled', 'disabled');
    }
  };

  window.delAttrDisabled = function (col) {
    for (var i = 0; i < col.length; i++) {
      col[i].removeAttribute('disabled');
    }
  };
})();
