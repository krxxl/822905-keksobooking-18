'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var url = 'https://js.dump.academy/keksobooking/data1';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;

          default:
            onError();
        }
      });

      xhr.open('GET', url);
      xhr.send();
    },
  };
})();
