<?php

	namespace app\controllers\web;
	use Silex\Application,
		Symfony\Component\HttpFoundation\Request,
		app\controllers\web\generic,
		app\models\search\search as model;
		
	class search extends generic {
		public static function model(){
			return new model();
		}
		
		public function search(Request $request, Application $app){
			$condition = static::prepareFields($request->get('fields', array()));
			$condition = static::prepareCondition($request->get('condition', array()));
			$sort = static::prepareSort($request->get('sort', array()));
			$limit = (int)$request->get('limit', 10);
			$skip = ($request->get('skip') ? (int)$request->get('skip', 0) : (int)$request->get('page', 0) * $limit);
			$items = static::model()->search($fields, $condition, $sort, $limit, $skip);
			return $app['page']->set(array(
				'total'	=> $items->getTotal(),
				'data'	=> $items->all()
			))->response()->setStatusCode($items->count() ? 200 : 204);
		}
	}