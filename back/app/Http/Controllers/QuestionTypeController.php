<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuestionType;

class QuestionTypeController extends Controller
{
    public function createQuestionType(Request $request){
        $question_type = new QuestionType;
		$question_type->createQuestionType($request);
        return response()->json($question_type);
    }

    public function updateQuestionType(Request $request){
        $question_type->updateQuestionType($request);
        return response()->json($question_type);
    }
}
