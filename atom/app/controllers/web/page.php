<?php

	namespace app\controllers\web;
	use app\controllers\web\generic,
		app\models\page\page as model;
		
	class page extends generic {
		public static function model(){
			return new model();
		}
	}