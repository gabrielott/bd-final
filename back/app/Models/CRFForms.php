<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CRFForms extends Model
{
    use HasFactory;

    public function createCRFForm($request){
        $this->description = $request->description;
        $this->questionnaire_id = $request->questionnaire_id;
        $this->save();
    }

    public function updateCRFForm($request){
        if($request->description){
            $this->description = $request->description;
        }
        $this->save();
    }

    public function questionnaire(){
        return $this->belongsTo('App\Models\Questionnaire');
    }
    public function formRecords(){
        return $this->hasMany('App\Models\FormRecord');
    }
    public function questionGroupForms(){
        return $this->hasMany('App\Models\QuestionGroupForms');
    }
}
