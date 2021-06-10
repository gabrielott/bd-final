<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ListOfValuesController extends Controller
{
    public function createListOfValues(Request $request){
        $list_of_values = new ListOfValues;
		$list_of_values->createListOfValues($request);
        return response()->json($list_of_values);
    }

    public function updateListOfValues(Request $request){
        $list_of_values->updateListOfValues($request);
        return response()->json($list_of_values);
    }
}
