<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CrfForm;

class CRFFormsController extends Controller
{
    public function createCrfForm(Request $request){
        $crf_form = new CrfForm;
		$crf_form->createCrfForm($request);
        return response()->json($crf_form);
    }

    public function updateCrfForm(Request $request){
        $crf_form->updateCrfForm($request);
        return response()->json($crf_form);
    }

    public function listCrfForms(){
        $crf_forms = CrfForm::all();
        return response()->json($crf_forms, 200);
    }

    public function showCrfForm($id){
        $crf_form = CrfForm::find($id);
        return response()->json($crf_form, 200);
    }
}
