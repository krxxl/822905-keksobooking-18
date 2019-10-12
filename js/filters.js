'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var type = form.querySelector('#housing-type');
  var price = form.querySelector('#housing-price');
  var rooms = form.querySelector('#housing-rooms');
  var guests = form.querySelector('#housing-guests');
  var features = form.querySelector('#housing-features');
  var wifi = features.querySelector('#filter-wifi');
  var dishwasher = features.querySelector('#filter-dishwasher');
  var parking = features.querySelector('#filter-parking');
  var washer = features.querySelector('#filter-washer');
  var elevator = features.querySelector('#filter-elevator');
  var conditioner = features.querySelector('#filter-conditioner');
  var templateError = document.querySelector('#error').content.querySelector('.error');

  var filterByType = function (pin) {
    if (typeApp === 'any') {
      return pin;
    }
    return pin.offer.type === typeApp;
  };

  var filterByPrice = function (pin) {
    if (priceApp === 'any') {
      return pin;
    } else if (priceApp === 'low') {
      return pin.offer.price < 10000;
    } else if (priceApp === 'high') {
      return pin.offer.price > 50000;
    } else if (priceApp === 'middle') {
      return pin.offer.price >= 10000 && pin.offer.price <= 50000;
    }
  };

  var filterByRooms = function (pin) {
    if (roomsApp === 'any') {
      return pin;
    } else if (+roomsApp === 1) {
      return pin.offer.rooms === +roomsApp;
    } else if (+roomsApp === 2) {
      return pin.offer.rooms === +roomsApp;
    } else if (+roomsApp === 3) {
      return pin.offer.rooms === +roomsApp;
    }
  };

  var filterByQuest = function (pin) {
    if (guestsApp === 'any') {
      return pin;
    } else if (+guestsApp === 2) {
      return pin.offer.guests === +guestsApp;
    } else if (+guestsApp === 1) {
      return pin.offer.guests === +guestsApp;
    } else if (+guestsApp === 0) {
      return false;
    }
  };

  var filterByFeature = function (pin, feature) {
    if (feature.checked) {
      return pin.offer.features.includes(feature.value);
    } else {
      return pin;
    }
  };

  var filteredPins = function () {
    var filter = pins.filter(function (pin) {
      return filterByType(pin)
              && filterByPrice(pin)
              && filterByRooms(pin)
              && filterByQuest(pin)
              && filterByFeature(pin, wifi)
              && filterByFeature(pin, dishwasher)
              && filterByFeature(pin, parking)
              && filterByFeature(pin, washer)
              && filterByFeature(pin, elevator)
              && filterByFeature(pin, conditioner);
    });

    if (filter.length > 5) {
      filter.length = 5;
    }
    return filter;
  };

  window.updatePins = function () {
    window.renderElement(filteredPins());
  };

  var pins = [];

  window.onSucces = function (data) {
    pins = data;
    window.renderElement(pins);
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

  var typeApp = 'any';
  var priceApp = 'any';
  var roomsApp = 'any';
  var guestsApp = 'any';

  var onfilterChange = function () {
    removePins();
    window.updatePins();
  };

  type.addEventListener('change', function () {
    typeApp = type.options[type.selectedIndex].value;
    onfilterChange();
  });
  price.addEventListener('change', function () {
    priceApp = price.options[price.selectedIndex].value;
    onfilterChange();
  });
  rooms.addEventListener('change', function () {
    roomsApp = rooms.options[rooms.selectedIndex].value;
    onfilterChange();
  });
  guests.addEventListener('change', function () {
    guestsApp = guests.options[guests.selectedIndex].value;
    onfilterChange();
  });
  wifi.addEventListener('change', function () {
    onfilterChange();
  });
  dishwasher.addEventListener('change', function () {
    onfilterChange();
  });
  parking.addEventListener('change', function () {
    onfilterChange();
  });
  washer.addEventListener('change', function () {
    onfilterChange();
  });
  elevator.addEventListener('change', function () {
    onfilterChange();
  });
  conditioner.addEventListener('change', function () {
    onfilterChange();
  });

  // type.addEventListener('change', onTypeChange);
  // price.addEventListener('change', onPriceChange);
  // rooms.addEventListener('change', onRoomsChange);
  // guests.addEventListener('change', onQuestsChange);
  // wifi.addEventListener('change', onWifiChange);
  // dishwasher.addEventListener('change', onDishwasherChange);
  // parking.addEventListener('change', onParkingChange);
  // washer.addEventListener('change', onWasherChange);
  // elevator.addEventListener('change', onElevatorChange);
  // conditioner.addEventListener('change', onConditionerChange);
})();

