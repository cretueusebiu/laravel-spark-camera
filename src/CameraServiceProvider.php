<?php

namespace Eusebiu\LaravelSparkCamera;

use Laravel\Spark\Spark;
use PragmaRX\Google2FA\Google2FA;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class CameraServiceProvider extends ServiceProvider
{
    /**
     * Boot the service provider.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'camera');

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../resources/views' => resource_path('views/vendor/camera'),
            ], 'views');

            $this->publishes([
                __DIR__ . '/../resources/assets/js/update-profile-photo-camera.js' =>
                    resource_path('assets/js/spark-components/settings/profile/update-profile-photo-camera.js')
            ], 'assets');
        }
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
