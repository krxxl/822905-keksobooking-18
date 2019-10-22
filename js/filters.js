'use strict';

(function () {

  var MAX_QUANTITY = 5;
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
  var typeApp = type.options[type.selectedIndex].value;
  var priceApp = price.options[price.selectedIndex].value;
  var roomsApp = rooms.options[rooms.selectedIndex].value;
  var guestsApp = guests.options[guests.selectedIndex].value;

  var filterByType = function (pin) {
    if (typeApp === 'any') {
      return true;
    }
    return pin.offer.type === typeApp;
  };

  var filterByPrice = function (pin) {
    switch (priceApp) {
      case 'low':
        return pin.offer.price < 10000;
      case 'high':
        return pin.offer.price > 50000;
      case 'middle':
        return pin.offer.price >= 10000 && pin.offer.price <= 50000;
      default:
        return true;
    }
  };

  var filterByRooms = function (pin) {
    if (roomsApp === 'any') {
      return true;
    }
    return pin.offer.rooms === +roomsApp;
  };

  var filterByQuest = function (pin) {
    if (guestsApp === 'any') {
      return true;
    }
    return pin.offer.guests === +guestsApp;
  };

  var filterByFeature = function (pin, feature) {
    if (feature.checked) {
      return pin.offer.features.includes(feature.value);
    }
    return true;
  };


  var getFilteredPins = function () {
    var filteredPins = pins.filter(function (pin) {
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

    if (filteredPins.length > MAX_QUANTITY) {
      filteredPins.length = MAX_QUANTITY;
    }
    return filteredPins;
  };

  window.updatePins = function () {
    window.renderElement(getFilteredPins());
  };

  var pins = [];

  window.onSucces = function (data) {
    pins = data;
    window.updatePins();
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

  var onFilterChange = window.debounce(function () {
    removePins();
    window.updatePins();
    window.closePopup();
  });

  type.addEventListener('change', function () {
    typeApp = type.options[type.selectedIndex].value;
    onFilterChange();
  });
  price.addEventListener('change', function () {
    priceApp = price.options[price.selectedIndex].value;
    onFilterChange();
  });
  rooms.addEventListener('change', function () {
    roomsApp = rooms.options[rooms.selectedIndex].value;
    onFilterChange();
  });
  guests.addEventListener('change', function () {
    guestsApp = guests.options[guests.selectedIndex].value;
    onFilterChange();
  });
  wifi.addEventListener('change', onFilterChange);
  dishwasher.addEventListener('change', onFilterChange);
  parking.addEventListener('change', onFilterChange);
  washer.addEventListener('change', onFilterChange);
  elevator.addEventListener('change', onFilterChange);
  conditioner.addEventListener('change', onFilterChange);
})();

