'use strict';

var arr = [];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checks = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


var randomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getFeatures = function () {
  var newFetures = [];
  var count = randomNumber(0, features.length - 1);
  for (var i = 0; i < count; i++) {
    newFetures[i] = features[i];
  }

  return newFetures;
};

var getPhotos = function (min, max) {
  var photos = [];
  var count = randomNumber(min, max);
  for (var i = 0; i < count; i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }
  return photos;
};

var translateType = function (type) {
  if (type === 'palace') {
    return 'Дворец';
  } else if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'house') {
    return 'Дом';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  } else {
    return 'Не известный тип жилья';
  }
};

var renderFeatures = function (featuresBlock, templateFeature, curFeatures) {
  for (var i = 0; i < curFeatures.length; i++) {
    var feature = templateFeature.cloneNode();
    feature.className = 'popup__feature popup__feature--' + curFeatures[i];
    featuresBlock.appendChild(feature);
  }
};

var renderPhotos = function (photosBlock, templatePhoto, curPhotos) {
  for (var j = 0; j < curPhotos.length; j++) {
    var photo = templatePhoto.cloneNode();
    photo.setAttribute('src', curPhotos[j]);
    photosBlock.appendChild(photo);
    templatePhoto.remove();
  }
};

var createArray = function (quantity) {

  for (var i = 0; i < quantity; i++) {
    var obj = {};
    obj.autor = {avatar: 'img/avatars/user0' + (i + 1) + '.png'};
    obj.offer = {
      'title': 'Title N' + (i + 1),
      'address': randomNumber(100, 10000) + ', ' + randomNumber(100, 10000),
      'price': randomNumber(100, 10000),
      'type': types[randomNumber(0, 3)],
      'rooms': randomNumber(1, 5),
      'guests': randomNumber(1, 5),
      'checkin': checks[randomNumber(0, 2)],
      'checkout': checks[randomNumber(0, 2)],
      'features': getFeatures(),
      'description': 'Some description',
      'photos': getPhotos(1, 3),
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
    var img = element.querySelector('img');
    element.setAttribute('style', 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;');
    img.setAttribute('src', array[i].autor.avatar);
    img.setAttribute('alt', array[i].offer.title);
    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
};


var renderCard = function (array) {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var element = template.cloneNode(true);
    element.querySelector('.popup__title').textContent = array[i].offer.title;
    element.querySelector('.popup__text--address').textContent = array[i].offer.address;
    element.querySelector('.popup__text--price').textContent = array[i].offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = translateType(array[i].offer.type);
    element.querySelector('.popup__text--capacity').textContent = array[i].offer.rooms + ' комнаты для ' + array[i].offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + array[i].offer.checkin + ', выезд до ' + array[i].offer.checkout;
    // заполняем фичерзы
    var featuresBlock = element.querySelector('.popup__features');
    var templateFeature = featuresBlock.querySelector('.popup__feature');
    var curFeatures = array[i].offer.features;
    featuresBlock.innerHTML = '';
    renderFeatures(featuresBlock, templateFeature, curFeatures);
    // заполняем фоточки
    element.querySelector('.popup__description').textContent = array[i].offer.description;
    var photosBlock = element.querySelector('.popup__photos');
    var templatePhoto = photosBlock.querySelector('.popup__photo');
    var curPhotos = array[i].offer.photos;
    photosBlock.innerHTML = '';
    renderPhotos(photosBlock, templatePhoto, curPhotos);

    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
};

renderElement(arr);
renderCard(arr);

