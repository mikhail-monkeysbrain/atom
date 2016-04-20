<?php

	namespace app\controllers\web;
	use app\controllers\web\generic,
		app\models\search\search as model;
		
	class search extends generic {
		public static function model(){
			return new model();
		}
	}