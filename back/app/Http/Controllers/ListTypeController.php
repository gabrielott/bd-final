<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListType;

class ListTypeController extends Controller
{
    public function createListType(Request $request){
        $list_type = new ListType;
		$list_type->createListType($request);
        return response()->json($list_type);
    }

    public function cloneListType($id){
        $list_type = ListType::Find($id);
        if($list_type){
            $request->description = $list_type->description;
            $list_type->createListType($request);
            return response()->json();
        }
        return response()->json('Falha controlada: Lista não existe.', 500);
    }

    public function updateListType(Request $request){
        $list_type->updateListType($request);
        return response()->json($list_type);
    }

    public function listListType(){
        $lists = ListType::all();
        return response()->json($lists, 200);
    }

    public function showListType($id){
        $list = ListType::find($id);
        return response()->json($list, 200);
    }
}
