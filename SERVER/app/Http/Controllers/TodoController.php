<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Todoup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\ValidationException;

class TodoController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate(Config::get("todo.validation"));
        } catch (ValidationException $ex) {
            return response(['status' => 'error', 'errors' => $ex->errors()], 422);
        }

        Todoup::create($validated);

        return response([]);
    }

    public function index()
    {
        $todos = Todoup::all();
        return response()->json($todos);
    }

    public function destroy($id)
    {
        try {
            $todo = Todoup::findOrFail($id);

            $todo->delete();

            return response()->json(['message' => 'Sikeres törlés'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Sikertelen törlés'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $todo = Todoup::find($id);

        if (!$todo) {
            return response()->json(['message' => 'Teendő nem található'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required',
            'priority' => 'required|in:normal,urgent,extraUrgent',
            'date' => 'required|date',
            'message' => 'required',
        ]);

        $todo->update($validatedData);

        return response()->json(['message' => 'Sikeres módosítás']);
    }
}
