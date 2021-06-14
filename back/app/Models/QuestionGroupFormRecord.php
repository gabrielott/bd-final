<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionGroupFormRecord extends Model
{
    use HasFactory;
    public function listOfValues(){
        return $this->belongsTo('App\Models\ListOfValues');
    }

    public function formRecord(){
        return $this->belongsTo('App\Models\FormRecord');
    }
    public function question(){
        return $this->belongsTo('App\Models\Question');
    }
}
