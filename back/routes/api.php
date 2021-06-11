<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QuestionnaireController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('createUserAdmin', [UserController::class, 'createUserAdmin']);

// Questionnaire
Route::delete('deleteQuestionnaire/{id}', [QuestionnaireController::class, 'deleteQuestionnaire']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
