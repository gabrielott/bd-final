<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListOfValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('list_of_values', function (Blueprint $table) {
            $table->id();
			$table->foreignId('list_type_id');
            $table->string('description');
            $table->timestamps();
        });

        Schema::table('list_of_values', function (Blueprint $table) {
            $table->foreign('list_type_id')->references('id')->on('list_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('list_of_values');
    }
}
