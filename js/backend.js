'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var url = 'https://js.dump.academy/keksobooking/data';
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
    save: function (data, onLoad, onError) {
      var url = 'https://js.dump.academy/keksobooking';
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

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
