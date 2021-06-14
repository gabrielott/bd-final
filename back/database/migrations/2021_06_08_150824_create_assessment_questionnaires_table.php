<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssessmentQuestionnairesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assessment_questionnaires', function (Blueprint $table) {
            $table->id();
			$table->foreignId('participant_id')->constrained();
			$table->foreignId('hospital_unit_id')->constrained();
			$table->foreignId('questionnaire')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assessment_questionnaires');
    }
}
