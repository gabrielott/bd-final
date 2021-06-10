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

    public function updateListType(Request $request){
        $list_type->updateListType($request);
        return response()->json($list_type);
    }
}
