'use strict';

(function () {

  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  window.renderElement = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var element = templatePin.cloneNode(true);
      var img = element.querySelector('img');
      element.setAttribute('style', 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;');
      img.setAttribute('src', array[i].autor.avatar);
      img.setAttribute('alt', array[i].offer.title);
      fragment.appendChild(element);
    }
    window.bookingData.mapPins.appendChild(fragment);
  };
})();
