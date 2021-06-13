<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;

class QuestionController extends Controller
{
	public function index() {
		return response()->json(Question::all());
	}
	
	public function show($id) {
		return response()->json(Question::find($id));
	}

    public function createQuestion(Request $request) {
        $question = new Question;
		$question->createQuestion($request);
        return response()->json($question);
    }

    public function updateQuestion(Request $request) {
        $question->updateQuestion($request);
        return response()->json($question);
    }
    
    public function deleteQuestion($id){
        $question = Question::Find($id);
        if($question){
            Questionnaire::destroy($id);
            return response()->json('Questão deletada.', 200);
        }
        return response()->json('Questão não existe.', 500);
    }
}
