<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    public function createQuestion($request) {
        $this->description = $request->description;
        $this->question_type_id = $request->question_type_id;
        $this->list_type_id = $request->list_type_id;
        if($request->question_group_id)
            $this->question_group_id = $request->question_group_id;
        if($request->subordinate_to)
            $this->subordinate_to = $request->subordinate_to;
        if($request->is_about)
            $this->is_about = $request->is_about;
        $this->save();
    }

    public function updateQuestion($request) {
        if($request->description)
            $this->description = $request->description;
        if($request->question_type_id)
            $this->question_type_id = $request->question_type_id;
        if($request->list_type_id)
            $this->list_type_id = $request->list_type_id;
        if($request->question_group_id)
            $this->question_group_id = $request->question_group_id;
        if($request->subordinate_to)
            $this->subordinate_to = $request->subordinate_to;
        if($request->is_about){
            $this->is_about = $request->is_about;
        }
        $this->save();
    }

    public function questionGroupForms() {
        return $this->hasMany('App\Models\QuestionGroupForms');
    }

    public function questionGroup() {
        return $this->hasMany('App\Models\QuestionGroup');
    }

    public function questionType() {
        return $this->belongsTo('App\Models\QuestionType');
    }

    public function listType() {
        return $this->belongsTo('App\Models\ListType');
    }
	
    public function subordinateTo() {
        return $this->belongsTo('App\Models\Question');
    }

    public function isAbout() {
        return $this->belongsTo('App\Models\Question'); 
    }
}
