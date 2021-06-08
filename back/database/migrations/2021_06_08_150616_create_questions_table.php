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
			$table->foreignId('question_type_id')->nullable()->constrained();
			$table->foreignId('list_type_id')->nullable()->constrained();
			$table->foreignId('question_group_id')->nullable()->constrained();
			$table->unsignedBigInteger('subordinate_to')->nullable();
			$table->unsignedBigInteger('is_about')->nullable();
            $table->timestamps();
        });

		Schema::table('questions', function (Blueprint $table) {
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
