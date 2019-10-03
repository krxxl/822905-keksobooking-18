'use strict';

(function () {

  var map = document.querySelector('.map');

  var mapFilters = document.querySelector('.map__filters');
  var fieldsetAdForm = window.bookingData.adForm.querySelectorAll('fieldset');
  var inputsMapFilters = mapFilters.querySelectorAll('input');
  var selectsMapFilters = mapFilters.querySelectorAll('select');
  var addressInp = window.bookingData.adForm.querySelector('#address');

  var PIN_WIDTH = window.bookingData.mainPin.offsetWidth / 2;
  var PIN_HEIGHT = window.bookingData.mainPin.offsetHeight / 2;

  // вставляем в инпут координаты начальной точки
  addressInp.value = (window.bookingData.mapPins.offsetWidth / 2 + PIN_WIDTH) + ' ' + (window.bookingData.mapPins.offsetHeight / 2 + PIN_HEIGHT);

  // отключаем инпуты и селекторы и проверяем классы

  if (!map.classList.contains('map--faded')) {
    map.classList.add('map--faded');
  }

  if (!window.bookingData.adForm.classList.contains('ad-form--disabled')) {
    window.bookingData.adForm.classList.add('ad-form--disabled');
  }

  window.setAttrDisabled(fieldsetAdForm);
  window.setAttrDisabled(inputsMapFilters);
  window.setAttrDisabled(selectsMapFilters);


  // вставка координат в инпут
  window.setCoord = function () {
    var x = window.bookingData.mainPin.getBoundingClientRect().x;
    var y = window.bookingData.mainPin.getBoundingClientRect().y;
    addressInp.value = (x + PIN_WIDTH) + ' ' + (y + PIN_HEIGHT + 22);
  };

  window.activateForms = function () {
    map.classList.remove('map--faded');
    window.bookingData.adForm.classList.remove('ad-form--disabled');
    window.delAttrDisabled(fieldsetAdForm);
    window.delAttrDisabled(inputsMapFilters);
    window.delAttrDisabled(selectsMapFilters);
    // add pins and events on it
    window.renderElement(window.bookingData.arr);
    window.setEventPin();
  };


})();
