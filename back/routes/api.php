<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\ListTypeController;

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
Route::post('createQuestionnaire', [QuestionnaireController::class, 'createQuestionnaire']);
Route::get('listQuestionnaires', [QuestionnaireController::class, 'index']);
Route::get('showQuestionnaire/{id}', [QuestionnaireController::class, 'show']);
Route::get('getVersions/{id}', [QuestionnaireController::class, 'getVersions']);
Route::put('updateQuestionnaire/{id}', [QuestionnaireController::class, 'updateQuestionnaire']);
Route::delete('deleteQuestionnaire/{id}', [QuestionnaireController::class, 'deleteQuestionnaire']);

// ListType
Route::post('createListType', [ListTypeController::class, 'createListType']);
Route::get('listListType', [ListTypeController::class, 'listListType']);
Route::get('showListType/{id}', [ListTypeController::class, 'showListType']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
