'use strict';

var arr = [];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checks = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var newFetures = [];
var photos = [];


var randomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getFeatures = function () {
  var count = randomNumber(0, features.length);
  for (var i = 0; i < count; i++) {
    newFetures[i] = features[i];
  }

  return newFetures;
};

var getPhotos = function (min, max) {
  var count = randomNumber(min, max);
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
      'address': location.x,
      'price': randomNumber(100, 10000),
      'type': types[randomNumber(0, 3)],
      'rooms': randomNumber(1, 5),
      'guests': randomNumber(1, 5),
      'checkin': checks[randomNumber(0, 2)],
      'checkout': checks[randomNumber(0, 2)],
      'features': getFeatures(),
      'description': 'Some description',
      'photos': getPhotos(0, 3),
    };
    obj.location = {
      x: randomNumber(0, window.innerWidth),
      y: randomNumber(130, 630)
    };
    arr[i] = obj;
  }
};

createArray(8);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');

var renderElement = function (array) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var element = template.cloneNode(true);
    var img = element.firstChild;
    element.setAttribute('style', 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;');
    img.setAttribute('src', array[i].autor.avatar);
    img.setAttribute('alt', array[i].offer.title);
    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
};

renderElement(arr);

