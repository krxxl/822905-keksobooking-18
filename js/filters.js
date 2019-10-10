'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var type = form.querySelector('#housing-type');
  var templateError = document.querySelector('#error').content.querySelector('.error');


  // var getRank = function (pin) {
  //   var rank = 0;

  //   if (pin.offer.type === window.typeApp) {
  //     rank += 1;
  //   }

  //   return rank;
  // };


  // window.updatePins = function () {
  //   window.renderElement(pins.sort(function (left, right) {
  //     var rankDiff = getRank(right) - getRank(left);

  //     return rankDiff;
  //   }), 5);
  // };

  window.updatePins = function () {
    window.renderElement(pins.filter(function (pin) {
      if (window.typeApp === 'any') {
        return pin;
      }
      return pin.offer.type === window.typeApp;
    }));
  };

  var pins = [];
  window.onSucces = function (data) {
    pins = data;
    // window.renderElement(pins);
    window.updatePins();
    window.setEventPin(pins);
  };

  window.onError = function () {
    var error = templateError.cloneNode(true);
    document.querySelector('main').prepend(error);

    var onBtnErrorClick = function () {
      document.querySelector('.error').remove();
      btnError.removeEventListener('click', onBtnErrorClick);
      window.deactivateForms();
      window.prepareForm();
      window.isActive = false;
    };
    var btnError = document.querySelector('.error__button');
    btnError.addEventListener('click', onBtnErrorClick);
    window.addEvents(document, ['click', 'keydown'], onBtnErrorClick);
  };

  var removePins = function () {
    var pinsRendered = document.querySelectorAll('.map__pin--rendered');
    pinsRendered.forEach(function (pin) {
      pin.remove();
    });
  };

  window.typeApp = 'any';
  var onTypeChange = function () {
    window.typeApp = type.options[type.selectedIndex].value;
    // console.log(window.typeApp);
    removePins();
    window.updatePins();
    window.setEventPin(pins);
  };

  type.addEventListener('change', onTypeChange);
})();
