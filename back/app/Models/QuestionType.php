<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionType extends Model
{
    use HasFactory;

    public function createQuestionType($request) {
        $this->description = $request->description;
        $this->save();
    }

    public function updateQuestionType($request){
        if($request->description){
            $this->description = $request->description;
        }
        $this->save();
    }
    public function questions(){
        return $this->hasMany('App\Models\Question');
    }
}
