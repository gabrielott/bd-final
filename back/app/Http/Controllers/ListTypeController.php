<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListType;
use App\Models\ListOfValues;
use App\Models\Question;
use App\Models\QuestionGroupForm;
use App\Models\CrfForm;


class ListTypeController extends Controller
{
    public function createListType(Request $request){
        $list_type = new ListType;
		$list_type->createListType($request);
        if($request->list_of_values){
            $values =  (object)[];
            foreach($request->list_of_values as $value){
                $value = (object)$value;
                $values->list_type_id = $list_type->id;
                $values->description = $value->description;
                $list_of_values = new ListOfValues;
                $list_of_values->createListOfValues($values);
    
            }
        }
        return response()->json($list_type);
    }

    public function cloneListType($id){
        $list_type = ListType::Find($id);
        $list_type_new = new ListType;
        if($list_type){
            $request->description = $list_type->description;
            $list_type_new->createListType($request);
            if($list_type->listOfValues){
                $list_of_values = $list_type->listOfValues;
                foreach($list_of_values as $value){
                    $newValue = new ListOfValues;
                    $value->list_type_id = $list_type_new->id;
                    $newValue->createListOfValues($value);
                }
            }
            return response()->json($list_type_new);
        }
        return response()->json('Falha controlada: Lista não existe.', 500);
    }

    public function updateListType(Request $request){
        $list_type->updateListType($request);
        return response()->json($list_type);
    }

    public function listListType(){
        $lists = ListType::with('listOfValues')->get();
        return response()->json($lists, 200);
    }

    public function editItems(Request $request, $id){
        $list_type = ListType::find($id);
        $questions_id = Question::where('list_type_id', $list_type->id)->get()->pluck('id')->toArray();
        $modules_id = QuestionGroupForm::whereIn('question_id', $questions_id)->get()->pluck('crf_form_id')->toArray();
        $questionnairesIds = CrfForm::whereIn('id', $modules_id)->get()->pluck('questionnaire_id')->toArray();
        if(!empty($questionnairesIds))
            return response()->json('Falha controlada: Lista já em uso.', 401);
        foreach($request->list_of_values as $values){
            $values = (Object) $values;
            $value = ListOfValues::find($values->id);
            if($value->description != $values->description)
                $value->updateListOfValues($values);
        }
        return response()->json($list_type, 200);
    }

    public function showListType($id){
        $list = ListType::find($id);
        $list->listOfValues;
        return response()->json($list, 200);
    }

    public function deleteListType($id){
        $list_type = ListType::find($id);
        $questions_id = Question::where('list_type_id', $list_type->id)->get()->pluck('id')->toArray();
        $modules_id = QuestionGroupForm::whereIn('question_id', $questions_id)->get()->pluck('crf_form_id')->toArray();
        $questionnairesIds = CrfForm::whereIn('id', $modules_id)->get()->pluck('questionnaire_id')->toArray();
        if(!empty($questionnairesIds))
            return response()->json('Falha controlada: Lista já em uso.', 401);
        $list_type = ListType::Find($id);
        if($list_type){
            ListType::destroy($id);
            return response()->json('Tipo de lista deletada.', 200);
        }
        return response()->json('Tipo de lista não pode ser deletada', 500);
    }
}
