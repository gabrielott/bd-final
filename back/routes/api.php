<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\ListTypeController;
use App\Http\Controllers\QuestionTypeController;
use App\Http\Controllers\ListOfValuesController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\CRFFormsController;
use App\Http\Controllers\QuestionGroupFormController;

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

//ListType
Route::post('createListType', [ListTypeController::class, 'createListType']);
Route::get('listListType', [ListTypeController::class, 'listListType']);
Route::get('showListType/{id}', [ListTypeController::class, 'showListType']);
Route::put('editItems/{id}', [ListTypeController::class, 'editItems']);
Route::delete('deleteListType/{id}', [ListTypeController::class, 'deleteListType']);

//ListOfValues
Route::put('insertNewValue/{id}', [ListOfValuesController::class, 'insertNewValue']);

// QuestionType
Route::post('createQuestionType', [QuestionTypeController::class, 'createQuestionType']);
Route::get('listQuestionType', [QuestionTypeController::class, 'index']);
Route::get('showQuestionType/{id}', [QuestionTypeController::class, 'show']);

// Question
Route::post('createQuestion', [QuestionController::class, 'createQuestion']);
Route::get('listQuestions', [QuestionController::class, 'index']);
Route::get('showQuestion/{id}', [QuestionController::class, 'show']);
Route::put('updateQuestion', [QuestionController::class, 'updateQuestion']);
Route::delete('deleteQuestion/{id}', [QuestionController::class, 'deleteQuestion']);

// CrfForm
Route::post('createCrfFroms', [CRFFormsController::class, 'createCrfForm']);
Route::put('updateCrfForm', [CRFFormsController::class, 'updateCrfForm']);
Route::get('listCrfForms', [CRFFormsController::class, 'listCrfForms']);
Route::get('showCrfForm/{id}', [CRFFormsController::class, 'showCrfForm']);

// QuestionGroupForm
Route::post('createQuestionGroupForm', [QuestionGroupFormController::class, 'createQuestionGroupForm']);
Route::put('updateQuestionGroupForm', [QuestionGroupFormController::class, 'updateQuestionGroupForm']);
Route::get('listQuestionGroupForms', [QuestionGroupFormController::class, 'listQuestionGroupForms']);
Route::get('showQuestionGroupForm/{id}', [QuestionGroupFormController::class, 'showQuestionGroupForm']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
