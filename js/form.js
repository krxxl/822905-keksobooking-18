'use strict';

(function () {
  // валидация селектов

  var roomNumber = window.bookingData.adForm.querySelector('#room_number');
  var capacity = window.bookingData.adForm.querySelector('#capacity');
  var options = capacity.querySelectorAll('option');

  var setMessage = function () {
    if (options[capacity.selectedIndex].hasAttribute('disabled')) {
      capacity.setCustomValidity('Заполните верно количество людей');
    }
  };

  var disabledOptions = function (opt) {
    // удаляем атрибуты у всех option количества людей
    window.delAttrDisabled(options);
    // отчищаем сообщение
    capacity.setCustomValidity('');
    // если выбраны количество комнат от 1 - 3
    if (opt >= 0 && opt <= 2) {
      // дизаблим последний пункт
      options[options.length - 1].setAttribute('disabled', 'disabled');
      // дизаблим не нужные
      for (var i = 0; i < opt; i++) {
        options[i].setAttribute('disabled', 'disabled');
      }
    } else if (opt === 3) {
      // если выбрано 100 комнат дизаблим все кроме последнего пункта
      window.setAttrDisabled(options);
      options[options.length - 1].removeAttribute('disabled');
    }
    // устанавливаем сообщение
    setMessage();
  };

  capacity.addEventListener('change', function () {
    capacity.setCustomValidity('');
  });

  roomNumber.addEventListener('change', function () {
    switch (roomNumber.value) {
      case '1':
        disabledOptions(2);
        break;
      case '2':
        disabledOptions(1);
        break;
      case '3':
        disabledOptions(0);
        break;
      case '100':
        disabledOptions(3);
        break;
    }
  });

  // // валидация стоимости от типа жилья

  var typeAppartments = document.querySelector('#type');
  var price = document.querySelector('#price');

  var changeMinPrice = function (min) {
    price.setAttribute('minlength', min);
    price.setAttribute('placeholder', min);
  };

  typeAppartments.addEventListener('change', function () {
    switch (typeAppartments.value) {
      case 'bungalo':
        changeMinPrice(0);
        break;
      case 'flat':
        changeMinPrice(1000);
        break;
      case 'house':
        changeMinPrice(5000);
        break;
      case 'palace':
        changeMinPrice(10000);
        break;
    }
  });

  // валидация заезда выезда

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var synchronizeTime = function (firstSelect, secondSelect) {
    switch (firstSelect.value) {
      case '12:00':
        secondSelect.value = '12:00';
        break;
      case '13:00':
        secondSelect.value = '13:00';
        break;
      case '14:00':
        secondSelect.value = '14:00';
        break;
    }
  };

  timeIn.addEventListener('change', function () {
    synchronizeTime(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    synchronizeTime(timeOut, timeIn);
  });

  var removePins = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  window.prepareForm = function () {
    var pins = document.querySelectorAll('.map__pin--rendered');
    removePins(pins);
    window.closePopup();
    form.reset();
    window.bookingData.mainPin.style.top = '375px';
    window.bookingData.mainPin.style.left = '570px';
    window.firstPosition();
  };

  var form = document.querySelector('.ad-form');
  var templateSucces = document.querySelector('#success').content.querySelector('.success');

  var onSubmitSucces = function () {
    window.deactivateForms();

    window.prepareForm();

    var succes = templateSucces.cloneNode(true);
    window.bookingData.main.prepend(succes);

    var succesElem = window.bookingData.main.querySelector('.success');

    var removeSucces = function () {
      succesElem.remove();
    };

    window.addEvents(document, ['keydown', 'click'], removeSucces);

    window.isActive = false;
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSubmitSucces, window.onError);
  });

})();
