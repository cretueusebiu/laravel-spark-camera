# Profile Photo Camera support for Laravel Spark

This package adds support for capturing images from your computer or phone camera.

[Demo](https://cretu-eusebiu.wistia.com/medias/j4bh66b2ey)

## Installation

- Run `composer require eusebiu/laravel-spark-camera`

- Add `Eusebiu\LaravelSparkCamera\CameraServiceProvider::class` to your `providers` array in `config/app.php`

- Run `php artisan vendor:publish --provider="Eusebiu\LaravelSparkCamera\CameraServiceProvider" --tag=assets`

- Edit `resources/views/vendor/spark/settings/profile/update-profile-photo.blade.php`:
    - Add `@include('camera::camera-modal')` right before closing the last div.
    - Add the Camera button `<button type="button" class="btn btn-primary" :disabled="form.busy" @click="openCamera">Camera</button>`.
    - It should look like [this](http://i.imgur.com/SBZR9Jv.png).

- Edit `resources/assets/js/spark-components/settings/profile/update-profile-photo.js`:
    - Add `var camera = require('./update-profile-photo-camera');` at the top.
    - Change the `mixins` option to `mixins: [base, camera]`.

- Run `npm install --save webcamjs`

- Run `gulp`


## 
> This package uses [WebcamJS](https://github.com/jhuckaby/webcamjs), so if you want to configure it, overide the `configureWebcamjs` method in your `update-profile-photo.js` file.
