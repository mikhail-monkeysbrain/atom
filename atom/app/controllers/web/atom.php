<?php

	namespace app\controllers\web;
	use Silex\Application,
		Symfony\Component\HttpFoundation\Request,
		Symfony\Component\Yaml\Yaml,
		app\controllers\web\generic,
		app\models\helper;
		
	class atom extends generic {
		public static function entities(Request $request, Application $app){
			$entities = array();
			$template = $app['config']->get('paths')->get('atom').'/app/models/%s.yml';
			$pattern = sprintf($template, '*');
			if (@$request->get('condition')['name']){
				$condition = $request->get('condition')['name'];
				if (isset($condition['$in'])){
					$pattern = array();
					foreach($request->get('condition')['name']['$in'] as $entity){
						$pattern[] = sprintf($template, $entity);
					}
				} else {
					$pattern = sprintf($template, $condition);
				}
			}
			$entitiesSchemes = (new helper\helper)->glob($pattern);
			foreach($entitiesSchemes as $scheme){
				$modelName = '\app\models\\'.pathinfo($scheme, PATHINFO_FILENAME).'\\'.pathinfo($scheme, PATHINFO_FILENAME);
				$model = new $modelName;
				$scheme = $model->getScheme()->get();
				$routes = $model->getRoutes()->get();
				foreach($scheme as $field => $properties){
					foreach($properties as $property => $value){
						if (is_string($value) && strstr($value, '<?')){
							$scheme[$field][$property] = eval('return '.substr($value, 2).';');
						}
					}
				}
				foreach($routes as $routeName => $routeProperties){
					if (!$app['user']->hasAccess($routeName)){
						unset($routes[$routeName]);
					}
				}
				if (count($routes) == 0){
					continue;
				}
				$entities[$model->getEntityName()] = array(
					'title'		=> $model->getEntityTitle(),
					'routes'	=> $routes,
					'scheme'	=> $scheme
				);
			}
			return $app['page']->set($entities);
		}
		
		public static function properties(Request $request, Application $app){
			if (!$app['user']->isAdmin()){
				return $app->abort(403, $app['translator']->trans('403'));
			}
			$file  = $app['config']->get('paths')->get('atom').'/properties.yml';
			return $app['page']->set(Yaml::parse(file_get_contents($file)));
		}
		
		public static function filemanager(Request $request, Application $app){
			if (!$app['user']->isAdmin()){
				return $app->abort(403, $app['translator']->trans('403'));
			}
			return require_once $app['config']->get('paths')->get('root').'/themes/backend/filemanager/'.$request->get('query');
		}
	}