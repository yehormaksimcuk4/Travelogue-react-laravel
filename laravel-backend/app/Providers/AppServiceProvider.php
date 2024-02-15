<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\GraphQL\Resolvers\CollectionResolver;
use Nuwave\Lighthouse\LighthouseServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->register(LighthouseServiceProvider::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
    }
}
