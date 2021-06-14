<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListType extends Model
{
    use HasFactory;

    public function createListType($request) {
        $this->description = $request->description;
        $this->save();
    }

    public function updateListType($request){
        if($request->description){
            $this->description = $request->description;
        }
        $this->save();
    }
    public function questions(){
        return $this->hasMany('App\Models\Question');
    }
    public function listOfValues(){
        return $this->hasMany('App\Models\ListOfValues');
    }
    
}
