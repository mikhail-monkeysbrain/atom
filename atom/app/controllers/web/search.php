<?php

	namespace app\controllers\web;
	use Silex\Application,
		Symfony\Component\HttpFoundation\Request,
		app\controllers\web\generic,
		app\models\helper,
		app\models\search\search as model;
		
	class search extends generic {
		public static function model(){
			return new model();
		}
		
		public function search(Request $request, Application $app){
			$fields = static::prepareFields($request->get('fields', array()));
			$condition = static::prepareCondition($request->get('condition', array()));
			$sort = static::prepareSort($request->get('sort', array()));
			$limit = (int)$request->get('limit', 10);
			$skip = ($request->get('skip') ? (int)$request->get('skip', 0) : (int)$request->get('page', 0) * $limit);
			
			$elements = static::model()->search(array(), $condition, $sort, $limit, $skip);
			$response = (new helper\iterator())
				->setTotal($elements->getTotal())
				->setRange($limit)
				->setPart($skip / $limit);
			foreach($elements as $element){
				$modelName = '\app\models\\'.$element->get('ref_entity').'\\'.$element->get('ref_entity');
				$entityElement = (new $modelName)->loadOne($fields, '_id', $element->get('ref_id'));
				$entityElement->set('_score', $element->get('_score'));
				if ($element->get('ref_entity') == 'user'){
					$entityElement->pop('token')->pop('password');
				}
				$response->add($entityElement);
			}
			return $app['page']->set(array(
				'total'	=> $response->getTotal(),
				'data'	=> $response->all()
			))->response()->setStatusCode($response->count() ? 200 : 204);
		}
	}