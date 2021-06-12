<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionGroupForm extends Model
{
    use HasFactory;

    public function saveQuestionGroupForm($request) {
        if($request->question_id)
            $this->crf_form_id = $request->crf_form_id;
        if($request->question_id)
            $this->question_id = $request->question_id;
        if($request->question_order)
            $this->question_order = $request->question_order;
        $this->save();
    }

    public function updateQuestion($request) {
        if($request->question_order){
            $this->question_order = $request->question_order;
        }
        $this->save();
    }
    public function question(){
        return $this->belongsTo('App\Models\Question');
    }

    public function questionGroupFormRecord(){
        return $this->belongsTo('App\Models\QuestionGroupFormRecord');
    }
    public function crfForm(){
        return $this->belongsTo('App\Models\CrfForm');
    }
}
