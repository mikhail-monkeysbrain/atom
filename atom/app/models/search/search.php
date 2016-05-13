<?php

	namespace app\models\search;
	use app\models\generic\generic;

	/**
	 * Search
	 */
	class search extends generic{
		public function search($fields = array(), $condition = array(), $sort = array(), $limit = 0, $skip = 0){
			$condition['$text'] = array('$search' => null);
			if(isset($condition['$query'])){
				$condition = array_merge($condition, array('$text' => array('$search' => (string)$condition['$query'])));
				unset($condition['$query']);
				$condition['$options'] = array('_score' => array('$meta' => 'textScore'));
				$sort = array_merge($condition['$options'], $sort);
			}
			if(isset($condition['ref_entity'])){
				$condition['ref_entity'] = new \MongoCode($condition['ref_entity']);
			}
			return $this->load($fields, $condition, $sort, $limit, $skip);
		}
	}