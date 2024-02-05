<?php 
use Illuminate\Support\Facades\Route;



Route::post('/graphql', function (\Illuminate\Http\Request $request) {
        return app('graphql')->executeQuery(
            $request->input('query'),
            $request->input('variables', []),
            $request->input('operationName')
        );
    });