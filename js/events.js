'use strict';

(function () {
  // для проверки нажатия Пина

  var isActive = false;

  var addEvents = function (node, events, callback) {
    events.forEach(function (event) {
      if (event === 'keydown') {
        node.addEventListener(event, function (evt) {
          if (evt.keyCode === 13) {
            evt.preventDefault();
            callback();
          }
        });
      } else {
        node.addEventListener(event, callback);
      }
    });
  };

  var onMainPin = function () {
    if (!isActive) {
      window.activateForms();
      // вставляем в инпут координаты текущей точки
      window.setCoord();
      isActive = true;
    }
  };

  addEvents(window.bookingData.mainPin, ['mousedown', 'keydown'], onMainPin);

  // window.bookingData.mainPin.addEventListener('mousedown', function () {
  //   if (!isActive) {
  //     window.activateForms();
  //     // вставляем в инпут координаты текущей точки
  //     window.setCoord();
  //     isActive = true;
  //   }
  // });

  // window.bookingData.mainPin.addEventListener('keydown', function (evt) {
  //   if (evt.keyCode === 13 && !isActive) {
  //     window.activateForms();
  //     // вставляем в инпут координаты текущей точки
  //     window.setCoord();
  //     isActive = true;
  //   }
  // });

  // // вызов карточек
  var closePopup = function () {
    var cardPopup = document.querySelector('.map__card.popup');
    if (cardPopup) {
      cardPopup.remove();
    }
  };

  var onPinClick = function (pin, idx) {
    var pinCallback = function () {
      closePopup();
      window.renderCard(window.bookingData.arr[idx]);
      // вешаем события на крестик
      setEventClose();
    };
    addEvents(pin, ['mousedown', 'keydown'], pinCallback);
    // pin.addEventListener('keydown', function (evt) {
    //   if (evt.keyCode === 13) {
    //     evt.preventDefault();
    //     closePopup();
    //     window.renderCard(window.bookingData.arr[idx]);
    //     // вешаем события на крестик
    //     setEventClose();
    //   }
    // });
    // pin.addEventListener('click', function () {
    //   closePopup();
    //   window.renderCard(window.bookingData.arr[idx]);
    //   // вешаем события на крестик
    //   setEventClose();
    // });

  };

  window.setEventPin = function () {
    var pins = document.querySelectorAll('.map__pin');

    for (var i = 1; i < pins.length; i++) {
      onPinClick(pins[i], i - 1);
    }
  };

  // // // закрытие карточек
  var setEventClose = function () {
    var popupClose = document.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        closePopup();
      }
    });
  };

})();
