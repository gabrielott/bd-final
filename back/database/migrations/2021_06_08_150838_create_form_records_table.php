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
			$table->foreignId('participant_id')->constrained();
			$table->foreignId('hospital_unit_id')->constrained();
			$table->foreignId('questionnaire_id')->constrained();
			$table->foreignId('crf_form_id')->constrained();
			$table->timestamp('dt_registro_form');
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
        Schema::dropIfExists('form_records');
    }
}
