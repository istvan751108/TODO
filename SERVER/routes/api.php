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


Route::post('/todoup', function(Request $request){

    try {
        $validated = $request->validate([
            'name' => 'required|min:4|max:20',
            'priority' => 'required',
            'date' => 'required',
            'message' => 'required|min:10|max:300',
        ]);
    } catch ( ValidationException $ex){
        return response(['status'=>'error', 'errors'=>$ex->errors()], 422);
    }
    
    return response([]);

});