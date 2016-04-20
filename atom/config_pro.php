<?php

	return array(
		'mongo' => array(
			'server'	=> 'mongodb://localhost:27017',
			'database'	=> 'atom_pro',
			'options'	=> array(
				'connect'	=> true
			)
		),
		'paths' => array(
			'atom'		=> __DIR__,
			'root'		=> realpath(__DIR__.'/../'),
			'upload'	=> realpath(__DIR__.'/../upload')
		),
		'routes' => array(
			'frontend'	=> '/',
			'backend' 	=> '/atom/',
			'upload'	=> '/upload'
		),
		'hash' => array(
			'salt'	=> 'XJEnXG3Xi0n3eKXNe4xpYf',
			'cost'	=> 1
		),
		'mailer'	=> array(
			'from'	=> array('atom@hismith.ru' => 'AtomMailer'),
			'smtp'	=> array(
				'host'	=> 'smtp.yandex.ru',
				'port'	=> 465,
				'mode'	=> 'ssl',
				'user'	=> 'atom@hismith.ru',
				'pass'	=> ''
			)
		)
);