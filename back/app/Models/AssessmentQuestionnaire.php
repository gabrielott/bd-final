<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentQuestionnaire extends Model
{
    use HasFactory;

    public function participant() {
        return $this->belongsTo('App\Models\Participant');
    }
    public function hospital() {
        return $this->belongsTo('App\Models\HospitalUnit');
    }
    public function questionnaire() {
        return $this->belongsTo('App\Models\Questionnaire');
    }
    public function formRecords() {
        return $this->hasMany('App\Models\FormRecord');
    }
}
