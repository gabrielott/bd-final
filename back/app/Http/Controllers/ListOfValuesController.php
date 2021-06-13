<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListOfValues;

class ListOfValuesController extends Controller
{
    public function createListOfValues(Request $request){
        $list_of_values = new ListOfValues;
		$list_of_values->createListOfValues($request);
        return response()->json($list_of_values);
    }
    public function insertNewValue(Request $request, $id){
        foreach($request->values  as $value){
            $value = (object) $value;
            $list_of_values = new ListOfValues;
            $value->list_type_id = $id;
            $list_of_values->createListOfValues($value);
        }
        
        return response()->json($list_of_values);
    }
   
    public function updateListOfValues(Request $request){
        $list_of_values->updateListOfValues($request);
        return response()->json($list_of_values);
    }
}
