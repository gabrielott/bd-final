<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification_records', function (Blueprint $table) {
            $table->id();
			$table->foreignId('user_id')->constrained();
			$table->foreignId('group_role_id')->constrained();
			$table->foreignId('hospital_unit_id')->constrained();
			$table->string('table_name');
			$table->integer('row_id');
			$table->timestamp('changed_on');
			$table->string('operation');
			$table->mediumText('log');
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
        Schema::dropIfExists('notification_records');
    }
}
