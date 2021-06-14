<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormRecord extends Model
{
    use HasFactory;

    public function assessmentQuestionnaire(){
        return $this->belongsTo('App\Models\AssessmentQuestionnaire')
    }
    public function crfForm(){
        return $this->belongsTo('App\Models\CrfForm');
    }
    public function questionGroupFormRecord(){
        return $this->belongsTo('App\Models\QuestionGroupFormRecord');
    }
}
