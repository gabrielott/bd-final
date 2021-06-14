<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionGroup extends Model
{
    use HasFactory;

    public function createQuestionGroup($request) {
        $this->description = $request->description;
        $this->comment = $request->comment;
        $this->save();
    }

    public function updateQuestionGroup($request){
        if($request->description){
            $this->description = $request->description;
        }
        if($request->comment){
            $this->comment = $request->comment;
        }
        $this->save();
    }
    public function questions(){
        return $this->hasMany('App\Models\Question');
    } 
}
