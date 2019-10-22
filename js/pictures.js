'use strict';

(function () {
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var pictureChooser = document.querySelector('.ad-form__upload input[type=file]');
  var picturePreview = document.querySelector('.ad-form__photo img');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var setPicture = function (fileChooser, preview) {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    }
  };

  avatarChooser.addEventListener('change', function () {
    setPicture(avatarChooser, avatarPreview);
  });

  pictureChooser.addEventListener('change', function () {
    setPicture(pictureChooser, picturePreview);
  });

})();
