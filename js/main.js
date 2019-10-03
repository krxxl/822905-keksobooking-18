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
      'rooms': randomNumber(1, 3),
      'guests': randomNumber(1, 3),
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
// map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

var renderElement = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var element = templatePin.cloneNode(true);
    var img = element.querySelector('img');
    element.setAttribute('style', 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;');
    img.setAttribute('src', array[i].autor.avatar);
    img.setAttribute('alt', array[i].offer.title);
    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
};

var templateCard = document.querySelector('#card').content.querySelector('.map__card');

var renderCard = function (elem) {
  var fragment = document.createDocumentFragment();

  var element = templateCard.cloneNode(true);
  element.querySelector('.popup__title').textContent = elem.offer.title;
  element.querySelector('.popup__text--address').textContent = elem.offer.address;
  element.querySelector('.popup__text--price').textContent = elem.offer.price + '₽/ночь';
  element.querySelector('.popup__type').textContent = translateType(elem.offer.type);
  element.querySelector('.popup__text--capacity').textContent = elem.offer.rooms + ' комнаты для ' + elem.offer.guests + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + elem.offer.checkin + ', выезд до ' + elem.offer.checkout;
  // заполняем фичерзы
  var featuresBlock = element.querySelector('.popup__features');
  var templateFeature = featuresBlock.querySelector('.popup__feature');
  var curFeatures = elem.offer.features;
  featuresBlock.innerHTML = '';
  renderFeatures(featuresBlock, templateFeature, curFeatures);
  // заполняем фоточки
  element.querySelector('.popup__description').textContent = elem.offer.description;
  var photosBlock = element.querySelector('.popup__photos');
  var templatePhoto = photosBlock.querySelector('.popup__photo');
  var curPhotos = elem.offer.photos;
  photosBlock.innerHTML = '';
  renderPhotos(photosBlock, templatePhoto, curPhotos);
  element.querySelector('.popup__avatar').src = elem.autor.avatar;

  fragment.appendChild(element);
  mapPins.appendChild(fragment);
};


// renderElement(arr);
// renderCard(arr);

// отключаем инпуты и селекторы и проверяем классы

if (!map.classList.contains('map--faded')) {
  map.classList.add('map--faded');
}

var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var fieldsetAdForm = adForm.querySelectorAll('fieldset');
// var selectsAdForm = adForm.querySelectorAll('select');
var inputsMapFilters = mapFilters.querySelectorAll('input');
var selectsMapFilters = mapFilters.querySelectorAll('select');
var addressInp = adForm.querySelector('#address');
var mapPin = document.querySelector('.map__pin--main');
var PIN_WIDTH = mapPin.offsetWidth / 2;
var PIN_HEIGHT = mapPin.offsetHeight / 2;

// вставляем в инпут координаты начальной точки
addressInp.value = (mapPins.offsetWidth / 2 + PIN_WIDTH) + ' ' + (mapPins.offsetHeight / 2 + PIN_HEIGHT);

if (!adForm.classList.contains('ad-form--disabled')) {
  adForm.classList.add('ad-form--disabled');
}

var setAttrDisabled = function (col) {
  for (var i = 0; i < col.length; i++) {
    col[i].setAttribute('disabled', 'disabled');
  }
};

var delAttrDisabled = function (col) {
  for (var i = 0; i < col.length; i++) {
    col[i].removeAttribute('disabled');
  }
};

var setCoord = function () {
  var x = mapPin.getBoundingClientRect().x;
  var y = mapPin.getBoundingClientRect().y;
  addressInp.value = (x + PIN_WIDTH) + ' ' + (y + PIN_HEIGHT + 22);
};

setAttrDisabled(fieldsetAdForm);
setAttrDisabled(inputsMapFilters);
setAttrDisabled(selectsMapFilters);

var activateForms = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  delAttrDisabled(fieldsetAdForm);
  delAttrDisabled(inputsMapFilters);
  delAttrDisabled(selectsMapFilters);
  // add pins and events on it
  renderElement(arr);
  setEventPin();
};

// для проверки нажатия Пина
var isActive = false;

mapPin.addEventListener('mousedown', function () {
  if (!isActive) {
    activateForms();
    // вставляем в инпут координаты текущей точки
    setCoord();
    isActive = true;
  }
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13 && !isActive) {
    activateForms();
    // вставляем в инпут координаты текущей точки
    setCoord();
    isActive = true;
  }
});

// валидация селектов

var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var options = capacity.querySelectorAll('option');

var setMessage = function () {
  if (options[capacity.selectedIndex].hasAttribute('disabled')) {
    capacity.setCustomValidity('Заполните верно количество людей');
  }
};

var disabledOptions = function (opt) {
  // удаляем атрибуты у всех option количества людей
  delAttrDisabled(options);
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
    setAttrDisabled(options);
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

// // вызов карточек
var closePopup = function () {
  var cardPopup = document.querySelector('.map__card.popup');
  if (cardPopup) {
    cardPopup.remove();
  }
};

var onPinClick = function (pin, idx) {
  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      evt.peventDefault();
      closePopup();
      renderCard(arr[idx]);
      // вешаем события на крестик
      setEventClose();
    }
  });
  pin.addEventListener('click', function () {
    closePopup();
    renderCard(arr[idx]);
    // вешаем события на крестик
    setEventClose();
  });

};

var setEventPin = function () {
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


