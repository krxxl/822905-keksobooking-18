'use strict';

(function () {
  // для проверки нажатия Пина
  window.isActive = false;

  window.addEvents = function (node, events, callback) {
    events.forEach(function (event) {
      if (event === 'keydown') {
        node.addEventListener(event, function (evt) {
          if (evt.keyCode === 13) {
            evt.preventDefault();
            callback();
          } else if (evt.keyCode === 27) {
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
    if (!window.isActive) {
      window.activateForms();
      // вставляем в инпут координаты текущей точки
      // window.setCoord();
      window.isActive = true;
    }
  };

  var onMainPinMove = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var curCoordX = window.bookingData.mainPin.offsetLeft - shift.x;
      var curCoordY = window.bookingData.mainPin.offsetTop - shift.y;

      if (curCoordX >= 0 && curCoordX <= (1200 - 65) && curCoordY >= 130 && curCoordY <= 630) {

        window.bookingData.mainPin.style.top = curCoordY + 'px';
        window.bookingData.mainPin.style.left = curCoordX + 'px';

        window.setCoord();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.setCoord();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          window.bookingData.mainPin.removeEventListener('click', onClickPreventDefault);
        };
        window.bookingData.mainPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.addEvents(window.bookingData.mainPin, ['mousedown', 'keydown'], onMainPin);

  // вешаем обрабочик события
  window.bookingData.mainPin.addEventListener('mousedown', onMainPinMove);

  // // вызов карточек
  window.closePopup = function () {
    var cardPopup = document.querySelector('.map__card.popup');
    if (cardPopup) {
      cardPopup.remove();
    }
  };

  var onPinClick = function (pin, elem) {
    var pinCallback = function () {
      window.closePopup();
      window.renderCard(elem);
      // вешаем события на крестик
      setEventClose();
    };
    window.addEvents(pin, ['mousedown', 'keydown'], pinCallback);
  };

  window.setEventPin = function (arr) {
    var pins = document.querySelectorAll('.map__pin--rendered');

    for (var i = 0; i < pins.length; i++) {
      onPinClick(pins[i], arr[i]);
    }
  };

  // // // закрытие карточек
  var setEventClose = function () {
    var popupClose = document.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      window.closePopup();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        window.closePopup();
      }
    });
  };

})();
