<?php
echo '<div id="content">';
if(isset($_GET['page']) && $_GET['page']){
    $page_path = PAGE_PATH.$_GET['page'].'.php';

    if(file_exists($page_path)){
        include_once($page_path);
    }else{
        echo '<h1 class="text-center">404: page not found</h1>';
    }
}else{
    include_once(PAGE_PATH.'home.php');
}
echo '</div>';
?>
