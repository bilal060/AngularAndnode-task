<?php
   // connect to mongodb
   $m = new MongoClient();
	
   $db = $m->testing;

   $collection=$db->mycollection;
   $collection->remove();


    $document1 = array( 
      "title" => "MongoDB", 
      "description" => "database", 
      "likes" => 100,
      "url" => "http://www.google.com/mongodb/",
      "by", "tutorials"
   );
    $document2 = array( 
      "title" => "AngularJS", 
      "description" => "database", 
      "likes" => 100,
      "url" => "http://www.google.com/angularJS/",
      "by", "tutorials"
   );
    $document3 = array( 
      "title" => "NodeJS", 
      "description" => "database", 
      "likes" => 100,
      "url" => "http://www.google.com/NodeJS/",
      "by", "tutorials"
   );
	
   $collection->insert($document1);
   $collection->insert($document2);
   $collection->insert($document3);

   $arr=array();
   $response=array();

   $cursor = $collection->find();
    foreach ($cursor as $document) {
      $arr['title']=$document["title"];
      $arr['likes']=$document["likes"];
      $arr['url']=$document["url"];
     // $arr['by']=$document["by"];
      $response[]=$arr;
   }
   $arr= json_encode($response);
print_r($arr);