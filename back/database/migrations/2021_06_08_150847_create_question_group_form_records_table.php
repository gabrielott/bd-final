<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionGroupFormRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question_group_form_records', function (Blueprint $table) {
            $table->id();
			$table->foreignId('form_record_id')->constrained();
			$table->foreignId('question_group_form_id')->constrained();
			$table->foreignId('list_of_value_id')->nullable()->constrained()->onDelete('set null');
			$table->string('answer')->nullable();
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
        Schema::dropIfExists('question_group_form_records');
    }
}
