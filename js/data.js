'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var mapPin = document.querySelector('.map__pin--main');

  window.bookingData = {
    arr: [],
    translateType: function (type) {
      var translateName;
      switch (type) {
        case 'palace':
          translateName = 'Дворец';
          break;
        case 'flat':
          translateName = 'Квартира';
          break;
        case 'house':
          translateName = 'Дом';
          break;
        case 'bungalo':
          translateName = 'Бунгало';
          break;
      }
      return translateName;
    },
    mapPins: mapPins,
    adForm: adForm,
    mainPin: mapPin,
  };

  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checks = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var getFeatures = function () {
    var newFetures = [];
    var count = window.getRandomNumber(0, features.length - 1);
    for (var i = 0; i < count; i++) {
      newFetures[i] = features[i];
    }
    return newFetures;
  };

  var getPhotos = function (min, max) {
    var photos = [];
    var count = window.getRandomNumber(min, max);
    for (var i = 0; i < count; i++) {
      photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
    }
    return photos;
  };

  var createArray = function (quantity) {

    for (var i = 0; i < quantity; i++) {
      var obj = {};
      obj.autor = {avatar: 'img/avatars/user0' + (i + 1) + '.png'};
      obj.offer = {
        'title': 'Title N' + (i + 1),
        'address': window.getRandomNumber(100, 10000) + ', ' + window.getRandomNumber(100, 10000),
        'price': window.getRandomNumber(100, 10000),
        'type': types[window.getRandomNumber(0, 3)],
        'rooms': window.getRandomNumber(1, 3),
        'guests': window.getRandomNumber(1, 3),
        'checkin': checks[window.getRandomNumber(0, 2)],
        'checkout': checks[window.getRandomNumber(0, 2)],
        'features': getFeatures(),
        'description': 'Some description',
        'photos': getPhotos(1, 3),
      };
      obj.location = {
        x: window.getRandomNumber(0, window.innerWidth),
        y: window.getRandomNumber(130, 630)
      };
      window.bookingData.arr[i] = obj;
    }
  };

  createArray(8);

})();
