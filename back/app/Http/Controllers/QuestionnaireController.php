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
        $questionnaire->createQuestionnaire((Object) $request->questionnaire);
        QuestionnaireController::createAllInformation($request, $questionnaire->id);
        return response()->json($questionnaire, 200);
    }

    private static function createAllInformation($request, $questionnaire_id){
        foreach($request->modules as $module){
            $module = (Object) $module;
            $module->questionnaire_id = $questionnaire_id;
            $moduleBd = new CrfForm;
            $moduleBd->createCRFForm($module);
            foreach($request->module_questions as $group){
                $count = 1;
                $group = (Object) $group;
                if($group->crf_form_id != $module->id) continue;
                $group->crf_form_id = $moduleBd->id;
                $group->question_order = $count;
                $groupBd = new QuestionGroupForm;
                $groupBd->saveQuestionGroupForm($group);
                $count++;
            }
        }
        return;
    }

    public function updateQuestionnaire(Request $request, $id){
        $questionnaire = Questionnaire::find($id);
        if(!$questionnaire)
            return response()->json('Nada encontrado', 404);
        if($questionnaire->last_version_id != NULL)
            return response()->json('Não pode atualizar sem ser a ultima versao', 405);
        $newQuestionnaire = new Questionnaire;
        $newQuestionnaire->createQuestionnaire((Object)$request->questionnaire);
        $questionnaire->last_version_id = $newQuestionnaire->id;
        $questionnaire->save();
        Questionnaire::where('last_version_id', $id)
            ->update(['last_version_id' => $newQuestionnaire->id]);
        $idsModules = [];
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
	public function getAllLastVersion(){
        return response()->json(Questionnaire::whereNull('last_version_id')->get(), 200);
    }
}
