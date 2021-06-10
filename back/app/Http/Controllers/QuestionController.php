<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;

class QuestionController extends Controller
{
    public function createQuestion(Request $request) {
        $question = new Question;
		$question->createQuestion($request);
        return response()->json($question);
    }

    public function updateQuestion(Request $request){
        $question->updateQuestion($request);
        return response()->json($question);
    }


}
