<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CrfForm;

class CRFFormsController extends Controller
{
    public function createCRFForm(Request $request){
        $crf_form = new CrfForm;
		$crf_form->createCRFForm($request);
        return response()->json($crf_form);
    }

    public function updateCRFForm(Request $request){
        $crf_form->updateCRFForm($request);
        return response()->json($crf_form);
    }
}
