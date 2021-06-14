<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionGroupFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question_group_forms', function (Blueprint $table) {
            $table->id();
			$table->foreignId('crf_form_id');
			$table->foreignId('question_id');
			$table->integer('question_order');
            $table->timestamps();
        });

        Schema::table('question_group_forms', function (Blueprint $table) {
            $table->foreign('crf_form_id')->references('id')->on('crf_forms')->onDelete('cascade');
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('question_group_forms');
    }
}
