<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/contact', function(Request $request){

    try {
        $validated = $request->validate([
            'name' => 'required|min:4|max:40',
            'email' => 'required|email',
            'phone' => 'required|min:9|max:20',
            'subject' => 'required|min:4|max:40',
            'message' => 'required|min:10|max:600',
        ]);
    } catch ( ValidationException $ex){
        return response(['status'=>'error', 'errors'=>$ex->errors()], 422);
    }
    
    //Mail::to('istvan751108@gmail.com')->send( new ContactMail($validated) );
    return response([]);

});