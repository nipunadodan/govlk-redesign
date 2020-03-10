<?php

define("DOC_ROOT", dirname(realpath(__FILE__))."/");
include_once DOC_ROOT.'env.php';
define("SITE_URL", DOMAIN.SITE_ROOT);
define("ASSETS_PATH", DOC_ROOT."assets/");
define("ASSETS_URL", SITE_URL."assets/");
define("PAGE_PATH", DOC_ROOT."pages/");
define("TEMPLATE", 'default');
define("TEMPLATE_PATH", DOC_ROOT."template/");
define("TEMPLATE_URL", SITE_URL."template/");


define("PRODUCTION", false);

if(!PRODUCTION){
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}
