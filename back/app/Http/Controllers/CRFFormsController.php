<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CRFForm;

class CRFFormsController extends Controller
{
    public function createCRFForm(Request $request){
        $crf_form = new CRFForm;
		$crf_form->createCRFForm($request);
        return response()->json($crf_form);
    }

    public function updateCRFForm(Request $request){
        $crf_form->updateCRFForm($request);
        return response()->json($crf_form);
    }
}
