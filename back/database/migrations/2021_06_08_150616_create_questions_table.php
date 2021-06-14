<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
			$table->string('description');
			$table->foreignId('question_type_id')->nullable();
			$table->foreignId('list_type_id')->nullable();
			$table->foreignId('question_group_id')->nullable();
			$table->foreignId('subordinate_to')->nullable();
			$table->foreignId('is_about')->nullable();
            $table->timestamps();
        });

		Schema::table('questions', function (Blueprint $table) {
            $table->foreign('question_type_id')->references('id')->on('question_types')->onDelete('set null');
			$table->foreign('list_type_id')->references('id')->on('list_types')->onDelete('set null');
            $table->foreign('question_group_id')->references('id')->on('question_groups')->onDelete('set null');
            $table->foreign('subordinate_to')->references('id')->on('questions')->onDelete('set null');
			$table->foreign('is_about')->references('id')->on('questions')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
