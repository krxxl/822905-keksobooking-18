'use strict';

(function () {

  var map = document.querySelector('.map');

  var mapFilters = document.querySelector('.map__filters');
  var fieldsetAdForm = window.bookingData.adForm.querySelectorAll('fieldset');
  var inputsMapFilters = mapFilters.querySelectorAll('input');
  var selectsMapFilters = mapFilters.querySelectorAll('select');
  var addressInp = window.bookingData.adForm.querySelector('#address');
  var PIN_WIDTH = window.bookingData.mainPin.offsetWidth / 2;
  var PIN_HEIGHT = window.bookingData.mainPin.offsetHeight;
  var PIN_ARROW = 22;

  // вставляем в инпут координаты начальной точки
  window.firstPosition = function () {
    addressInp.value = (window.bookingData.mapPins.offsetWidth / 2 + PIN_WIDTH) + ' ' + (window.bookingData.mapPins.offsetHeight / 2 + PIN_HEIGHT);
  };

  window.firstPosition();
  // отключаем инпуты и селекторы и проверяем классы

  window.deactivateForms = function () {
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded');
    }

    if (!window.bookingData.adForm.classList.contains('ad-form--disabled')) {
      window.bookingData.adForm.classList.add('ad-form--disabled');
    }

    window.setAttrDisabled(fieldsetAdForm);
    window.setAttrDisabled(inputsMapFilters);
    window.setAttrDisabled(selectsMapFilters);
  };

  window.deactivateForms();

  // вставка координат в инпут
  window.setCoord = function () {
    var x = window.bookingData.mainPin.offsetLeft;
    var y = window.bookingData.mainPin.offsetTop;
    addressInp.value = (x + PIN_WIDTH) + ' ' + (y + PIN_HEIGHT + PIN_ARROW);
  };

  window.activateForms = function () {
    map.classList.remove('map--faded');
    window.bookingData.adForm.classList.remove('ad-form--disabled');
    window.delAttrDisabled(fieldsetAdForm);
    window.delAttrDisabled(inputsMapFilters);
    window.delAttrDisabled(selectsMapFilters);
    // add pins and events on it
    // window.renderElement(window.bookingData.arr); //////////////////////////////////////////////////
    window.backend.load(window.onSucces, window.onError);
    // window.setEventPin();
  };


})();
