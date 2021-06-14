<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('form_records', function (Blueprint $table) {
            $table->id();
			$table->foreignId('assessment_questionnaire_id');
			$table->foreignId('crf_form_id');
			$table->timestamp('dt_registro_form');
            $table->timestamps();
        });

        Schema::table('form_records', function (Blueprint $table) {
            $table->foreign('crf_form_id')->references('id')->on('crf_forms')->onDelete('cascade');
            $table->foreign('assessment_questionnaire_id')->references('id')->on('assessment_questionnaires')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('form_records');
    }
}
