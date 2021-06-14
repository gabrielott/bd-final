<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuestionGroupController extends Controller
{
    public function createQuestionGroup(Request $request){
        $question_group = new QuestionGroup;
		$question_group->createQuestionGroup($request);
        return response()->json($question_group);
    }

    public function updateQuestionGroup(Request $request){
        $question_group->updateQuestionGroup($request);
        return response()->json($question_group);
    }
}
