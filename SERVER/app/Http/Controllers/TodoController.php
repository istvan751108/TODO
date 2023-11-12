<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Todoup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\ValidationException;

class TodoController extends Controller
{
    public function store(Request $request) {
        try {
            $validated = $request->validate(Config::get("todo.validation"));
        } catch(ValidationException $ex) {
            return response(['status'=>'error', 'errors'=>$ex->errors()], 422);
        }

        Todoup::create( $validated );

        return response([]);
    }

    public function index() {
    $todos = Todoup::all();
    return response()->json($todos);
}
}
