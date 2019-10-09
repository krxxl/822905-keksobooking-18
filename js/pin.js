'use strict';

(function () {

  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var templateError = document.querySelector('#error').content.querySelector('.error');

  var renderElement = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var element = templatePin.cloneNode(true);
      var img = element.querySelector('img');
      element.setAttribute('style', 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;');
      img.setAttribute('src', array[i].author.avatar);
      img.setAttribute('alt', array[i].offer.title);
      fragment.appendChild(element);
    }
    window.bookingData.mapPins.appendChild(fragment);
  };

  window.onSucces = function (pins) {
    renderElement(pins);
    window.setEventPin(pins);
  };

  window.onError = function () {
    var error = templateError.cloneNode(true);
    document.querySelector('body').prepend(error);

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

})();
