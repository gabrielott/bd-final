<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuestionGroupForm;

class QuestionGroupFormController extends Controller
{
    public function createQuestionGroupForm(Request $request) {
        $question_group_form = new QuestionGroupForm;
		$question_group_form->saveQuestionGroupForm($request);
        return response()->json($question_group_form);
    }

    public function updateQuestionGroupForm(Request $request){
        $question_group_form->updateQuestionGroupForm($request);
        return response()->json($question_group_form);
    }

    public function listQuestionGroupForms(){
        $question_group_forms = QuestionGroupForm::all();
        return response()->json($question_group_forms, 200);
    }

    public function showQuestionGroupForm($id){
        $question_group_form = QuestionGroupForm::find($id);
        return response()->json($question_group_form, 200);
    }
}
