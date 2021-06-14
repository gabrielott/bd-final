<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListOfValues extends Model
{
    use HasFactory;
    
    public function createListOfValues($request){
        $this->list_type_id = $request->list_type_id;
        $this->description = $request->description;
        $this->save();
    }

    public function updateListOfValues($request){
        if($request->description){
            $this->description = $request->description;
        }
        $this->save();
    }
    public function questionGroupFromRecords(){
        return $this->hasMany('App\Models\QuestionGroupFromRecords');
    }
    public function listType(){
        return $this->belongsTo('App\Models\ListType');
    }
}
