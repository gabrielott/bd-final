<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questionnaire extends Model
{
    use HasFactory;

    public function createQuestionnaire($request) {
        $this->description = $request->description;
        $this->save();
    }

    public function updateQuestionnaire($request){
        if($request->description){
            $this->description = $request->description;
        }
        $this->save();
    }
    public function assessmentQuestionnaires(){
        return $this->hasMany('App\Models\AssessmentQuestionnaire');
    }
    public function crfForms(){
        return $this->hasMany('App\Models\CRFForm');
    }
}
