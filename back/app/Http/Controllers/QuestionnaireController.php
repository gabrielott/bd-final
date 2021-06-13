<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Questionnaire;
use App\Models\CrfForm;
use App\Models\Question;
use App\Models\QuestionGroupForm;
use App\Models\ListOfValues;
use App\Models\ListType;


class QuestionnaireController extends Controller
{
    public function createQuestionnaire(Request $request){
        $questionnaire = new Questionnaire;
        $questionnaire->createQuestionnaire($request);
        QuestionnaireController::createAllInformation($request, $questionnaire->id);
        return response()->json($questionnaire, 200);
    }

    private static function createAllInformation($request, $questionnaire_id){
        foreach($request->module as $module){
            $module = (Object) $module;
            $module->questionnaire_id = $questionnaire_id;
            $moduleBd = new CrfForm;
            $moduleBd->createCRFForm($module);
            if(empty($request->module_questions)) continue;
            foreach($request->module_questions as $id => $question){
                $question = (Object) $question;
                $group  = (object)[];
                $group->crf_form_id = $moduleBd->id;
                $groupBd = new QuestionGroupForm;
                $group->question_id = $question;
                $group->question_order = $id;
                $groupBd->saveQuestionGroupForm($group);
            }
        }
        return;
    }

    public function updateQuestionnaire(Request $request, $id){
        $questionnaire = Questionnaire::find($id);
        if(!$questionnaire)
            return response()->json('Nada encontrado', 404);
        if($questionnaire->last_version_id != NULL)
            return response()->json('Não pode atualizar sem ser a ultima versao', 401);
        $newQuestionnaire = new Questionnaire;
        $newQuestionnaire->createQuestionnaire($request);
        $questionnaire->last_version_id = $newQuestionnaire->id;
        $questionnaire->save();
        Questionnaire::where('last_version_id', $id)
            ->update(['last_version_id' => $newQuestionnaire->id]);
        QuestionnaireController::createAllInformation($request, $newQuestionnaire->id);
        return response()->json($newQuestionnaire, 200);
    }

    public function index(){
        return response()->json(Questionnaire::all(), 200);
    }

    public function getVersions($id){
        $questionnaire = Questionnaire::find($id);
        $old_versions = Questionnaire::where('last_version_id', $id)->get();
        $arrayQuestionnaires = [];
        array_push($arrayQuestionnaires, $questionnaire, $old_versions);
        return response()->json($arrayQuestionnaires, 200);
    }

    public function show($id){
        $questionnaire = Questionnaire::find($id);
        $modules = CrfForm::where('questionnaire_id', $questionnaire->id)->get();
        $idsModules = $modules->pluck('id');
        $groups = QuestionGroupForm::whereIn('crf_form_id', $idsModules)->get();
        $idsQuestions = $groups->pluck('question_id');
        $questions = Question::whereIn('id', $idsQuestions)->with('questionType')->get();
        $idsListTypes = $questions->pluck('list_type_id');
        $listTypes = ListType::whereIn('id', $idsListTypes)->with('listOfValues')->get();
        return response()->json(["questionnaire" => $questionnaire,
                                "modules" => $modules,
                                "groups" => $groups,
                                "questions" => $questions,
                                'list_types' => $listTypes], 200);
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
