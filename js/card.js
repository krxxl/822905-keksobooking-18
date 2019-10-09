'use strict';

(function () {

  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

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

  window.renderCard = function (elem) {
    var fragment = document.createDocumentFragment();

    var element = templateCard.cloneNode(true);
    element.querySelector('.popup__title').textContent = elem.offer.title;
    element.querySelector('.popup__text--address').textContent = elem.offer.address;
    element.querySelector('.popup__text--price').textContent = elem.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = window.bookingData.translateType(elem.offer.type);
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
    element.querySelector('.popup__avatar').src = elem.author.avatar;

    fragment.appendChild(element);
    window.bookingData.mapPins.appendChild(fragment);
  };

})();
