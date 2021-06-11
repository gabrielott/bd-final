<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Questionnaire;
use App\Models\CRFForm;

class QuestionnaireController extends Controller
{
    public function createQuestionnaire(Request $request){
        $questionnaire = new Questionnaire;
        $questionnaire->createQuestionnaire($request);
        foreach($request->module as $module){
            $module->questionnaire_id = $questionnaire->id;
            $moduleBd = new CRFForm;
            $moduleBd->createCRFForm($module);
            if(is_empty($module->group)) continue;
            foreach($module->group as $group){
                foreach($group->questions as $question){
                    $questionBd = new Question;
                    $questionBd->createQuestion($question);
                    $group->crf_form_id = $moduleBd->id;
                    $group->question_id = $questionBd->id;
                    $group = new Group;
                }
            }
        }
        return response()->json($questionnaire);
    }

    public function updateCRFForm(Request $request){
        $questionnaire->updateQuestionnaire($request);
        return response()->json($questionnaire);
    }

    public function deleteQuestionnaire($id){
        $questionnaire = Questionnaire::Find($id);
        if($questionnaire){
            if($questionnaire->is_published == 0){
                Questionnaire::destroy($id);
                return response()->json('Questionario deletado.', 200);
            }
        }
        return response()->json('Questionario não pode ser deletado: Não existe ou está publicado.', 500);
    }
}
