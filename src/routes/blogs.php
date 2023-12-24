<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
//use Slim\Factory\AppFactory;
$config = ['settings' => ['displayErrorDetails' => true]]; 
$app = new \Slim\App($config);


//get all blogs


$app->get('/api/blogs', function (Request $request, Response $response) {
   // echo 'blogs';
    
    $sql= "SELECT * from blogs";
    try{
$db=new db();
$db=$db->connect();
$stmt = $db->query($sql);
$blogs =$stmt->fetchAll(PDO::FETCH_OBJ);
$db=null;
echo json_encode($blogs);
    }
   catch (PDOException $e){
        echo '{"error": {"text": '.$e.getMessage().'}';
       echo $e.getMessage();
    }




});


// get single blog


$app->get('/api/blog/{id}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('id');
     $sql= "SELECT * from blogs where id = $id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $blog =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 echo json_encode($blog);
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });



 // add single blog


$app->post('/api/blog/add', function (Request $request, Response $response) {
    // echo 'blogs';
    // $id=$request->getAttribute('id');

    //$id=$request->getParam('id');
    $title=$request->getParam('title');
    $content=$request->getParam('content');
    $auth_date=$request->getParam('auth_date');
    $email=$request->getParam('email');




     $sql= " INSERT into blogs (title,content,auth_date, email) values (:title,:content,:auth_date,:email)";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 //$stmt->bindParam(':id', $id);
 $stmt->bindParam(':title', $title);
 $stmt->bindParam(':content', $content);
 $stmt->bindParam(':auth_date', $auth_date);
 $stmt->bindParam(':email', $email);
 $stmt->execute();
 echo '{"notice": "Blog added"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });
 


  // update single blog


$app->put('/api/blog/update/{id}', function (Request $request, Response $response) {
    // echo 'blogs';
    // $id=$request->getAttribute('id');
    $id=$request->getAttribute('id');
    
    $title=$request->getParam('title');
    $content=$request->getParam('content');
    $auth_date=$request->getParam('auth_date');




     $sql= " UPDATE blogs set 
     title=:title,content=:content,auth_date=:auth_date
      where id=$id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 
 $stmt->bindParam(':title', $title);
 $stmt->bindParam(':content', $content);
 $stmt->bindParam(':auth_date', $auth_date);
 $stmt->execute();
 echo '{"notice": "Blog Updated"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });


 // delete blog

 

$app->delete('/api/blog/delete/{id}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('id');
     $sql= "DELETE  from blogs where id = $id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 $stmt->execute();

 $db=null;
 echo '{"notice": "Blog Deleted"}';

     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });

 //user signup
 $app->post('/api/user/signup', function (Request $request, Response $response) {
    // echo 'blogs';
    // $id=$request->getAttribute('id');

    //$id=$request->getParam('id');
    /*
    $title=$request->getParam('title');
    $content=$request->getParam('content');
    $auth_date=$request->getParam('auth_date');


*/
$email=$request->getParam('email');
$passwords=$request->getParam('password');


     $sql= " INSERT into users (email,passwords) values (:email,:passwords)";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 //$stmt->bindParam(':id', $id);
 $stmt->bindParam(':email', $email);
 $stmt->bindParam(':passwords', $passwords);

 $stmt->execute();
 echo '{"notice": "User added"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });
 

 // user login
 $app->get('/api/user/login', function (Request $request, Response $response) {
    // echo 'blogs';
    // $id=$request->getAttribute('email');
     $sql= "SELECT * from users";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $obj =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 echo json_encode($obj);
     }
    catch (PDOException $e){
       
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });


// get moderator email

$app->get('/api/moderator/{email}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('email');
     $sql= "SELECT * from moderator where email = '$id'";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $blog =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 echo json_encode($blog);
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });


//post moderator
 $app->post('/api/moderator/add', function (Request $request, Response $response) {
    // echo 'blogs';
   
  //   $email=$request->getParam('email');

 //   $bid=$request->getParam('bid');
    $email=$request->getParam('email');
    $upvote=$request->getParam('upvote');
 //   $content=$request->getParam('content');
 //   $auth_date=$request->getParam('auth_date');




     $sql= "INSERT into moderator (email,upvote) values (:email,:upvote)";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 
 $stmt->bindParam(':email', $email);
 $stmt->bindParam(':upvote', $upvote);
 $stmt->execute();
 echo '{"notice": "moderator added"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });


 // update moderator


 
$app->put('/api/moderator/update', function (Request $request, Response $response) {
    
    $email=$request->getParam('email');
    $upvote=$request->getParam('upvote');
 


     $sql= "UPDATE moderator set upvote=$upvote where email = '$email'";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);

 $stmt->execute();
 echo '{"notice": "moderator update"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });






 // get comments
 $app->get('/api/comments/{bid}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('bid');
     $sql= "SELECT * from comments where bid = $id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $blog =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 echo json_encode($blog);
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });




//get comment id

// "http://slim/api/comments/"+user+"/"+id+'/'+formdata.timenow

$app->get('/api/commentsg/{id}/{timenow}', function (Request $request, Response $response) {
  
     $id=$request->getAttribute('id');
     
     $timenow=$request->getAttribute('timenow');
     
     $sql= "SELECT * from comments where bid = $id ";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $blog =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 
 echo json_encode($blog);
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });


 /*
 const adder={comment:getter, count:0};
              const newpush=await axios.post("http://slim/api/comment/add", adder);

 */



// add comments

$app->post('/api/commentss/add', function (Request $request, Response $response) {
    // echo 'blogs';
   
  //   $email=$request->getParam('email');

 //   $bid=$request->getParam('bid');
    $comment=$request->getParam('comment');
    $count=$request->getParam('count');
 //   $content=$request->getParam('content');
 //   $auth_date=$request->getParam('auth_date');




     $sql= "INSERT into counttrack (comment,count) values (:comment,:count)";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 
 $stmt->bindParam(':comment', $comment);
 $stmt->bindParam(':count', $count);
 $stmt->execute();
 echo '{"notice": "Commentssss added"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });


//







$app->put('/api/commentss/update', function (Request $request, Response $response) {
    // echo 'blogs';
   
  //   $email=$request->getParam('email');

 //   $bid=$request->getParam('bid');
    $comment=$request->getParam('comment');
    $count=$request->getParam('count');
 //   $content=$request->getParam('content');
 //   $auth_date=$request->getParam('auth_date');


 /*



     $sql= " UPDATE blogs set 
     title=:title,content=:content,auth_date=:auth_date
      where id=$id";
 */



     $sql= "UPDATE counttrack set count=$count where comment=$comment";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 //$stmt->bindParam(':id', $id);

 //$stmt->bindParam(':bid', $bid);
// $stmt->bindParam(':email', $email);
//$stmt->bindParam(':comment', $comment);
// $stmt->bindParam(':count', $count);
 $stmt->execute();
 echo '{"notice": "Comment added"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });



 ///  fetch status


//const enq=await fetch("http://slim/api/comment/"+props.obj.id);




$app->get('/api/commentss/{id}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('id');
     
     $sql= "SELECT * from counttrack where comment = $id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $blog =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 echo json_encode($blog);
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });




 // add comments

 $app->post('/api/comments/add', function (Request $request, Response $response) {
    // echo 'blogs';
   
     $email=$request->getParam('email');

    $bid=$request->getParam('bid');
    $comment=$request->getParam('comment');
    $timenow=$request->getParam('timenow');
 //   $content=$request->getParam('content');
 //   $auth_date=$request->getParam('auth_date');




     $sql= " INSERT into comments (bid,email,comment,timenow) values (:bid,:email,:comment,:timenow)";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 //$stmt->bindParam(':id', $id);

 $stmt->bindParam(':bid', $bid);
 $stmt->bindParam(':email', $email);
 $stmt->bindParam(':comment', $comment);
 $stmt->bindParam(':timenow', $timenow);
 $stmt->execute();
 echo '{"notice": "Comment added"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });



 // add with parent
 // add comments

 $app->post('/api/comments/addp', function (Request $request, Response $response) {
    // echo 'blogs';
   
     $email=$request->getParam('email');

    $bid=$request->getParam('bid');
    $comment=$request->getParam('comment');
    $timenow=$request->getParam('timenow');
    $parent=$request->getParam('parent');
 //   $auth_date=$request->getParam('auth_date');




     $sql= " INSERT into comments (bid,email,comment,timenow, parent) values (:bid,:email,:comment,:timenow,:parent)";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 //$stmt->bindParam(':id', $id);

 $stmt->bindParam(':bid', $bid);
 $stmt->bindParam(':email', $email);
 $stmt->bindParam(':comment', $comment);
 $stmt->bindParam(':timenow', $timenow);
 $stmt->bindParam(':parent', $parent);
 $stmt->execute();
 echo '{"notice": "Comment added"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });








 // update comment
 $app->put('/api/comments/update/{id}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('id');
     /*
    $email=$request->getParam('email');

    $bid=$request->getParam('bid');*/
    $comment=$request->getParam('comment');
   




     $sql= "UPDATE comments set 
     comment=:comment
      where id=$id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 /*
 $stmt->bindParam(':email', $title);
 $stmt->bindParam(':bid', $content);*/
 $stmt->bindParam(':comment', $comment);
 $stmt->execute();
 echo '{"notice": "Comment Updated"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });


  // delete comments

 

$app->delete('/api/comments/delete/{id}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('id');
     $sql= "DELETE  from comments where id = $id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 $stmt->execute();

 $db=null;
 echo '{"notice": "Comment Deleted"}';

     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });



 // api/comments/update/downvotes/
 $app->put('/api/comments/update/downvotes/{id}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('id');
     /*
    $email=$request->getParam('email');

    $bid=$request->getParam('bid');*/
    $downvotes=$request->getParam('downvotes');
   




     $sql= "UPDATE comments set 
     downvotes=:downvotes
      where id=$id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 /*
 $stmt->bindParam(':email', $title);
 $stmt->bindParam(':bid', $content);*/
 $stmt->bindParam(':downvotes', $downvotes);
 $stmt->execute();
 echo '{"notice": "Downvotes Updated"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });





 //



 $app->put('/api/comments/update/upvotes/{id}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('id');
     /*
    $email=$request->getParam('email');

    $bid=$request->getParam('bid');*/
    $upvotes=$request->getParam('upvotes');
   




     $sql= "UPDATE comments set 
     upvotes=:upvotes
      where id=$id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 /*
 $stmt->bindParam(':email', $title);
 $stmt->bindParam(':bid', $content);*/
 $stmt->bindParam(':upvotes', $upvotes);
 $stmt->execute();
 echo '{"notice": "Upvotes Updated"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });


 ///



 $app->put('/api/comments/update/reports/{id}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('id');
     /*
    $email=$request->getParam('email');

    $bid=$request->getParam('bid');*/
    $reports=$request->getParam('reports');
   




     $sql= "UPDATE comments set 
     reports=:reports
      where id=$id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 /*
 $stmt->bindParam(':email', $title);
 $stmt->bindParam(':bid', $content);*/
 $stmt->bindParam(':reports', $reports);
 $stmt->execute();

 echo '{"notice": "Reports Updated rep"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });

//api/comments/upvotes/




$app->get('/api/comments/upvotes/{bid}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('bid');
     $sql= "SELECT upvotes from comments where id = $id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $blog =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 echo json_encode($blog);
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });




 //


 $app->get('/api/comments/downvotes/{bid}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('bid');
     $sql= "SELECT downvotes from comments where id = $id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $blog =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 echo json_encode($blog);
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });


 ///

 $app->get('/api/comments/reports/{bid}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('bid');
     $sql= "SELECT reports from comments where id = $id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $blog =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 echo json_encode($blog);
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });



 // /api/commentrecords/up/id/user




 $app->get('/api/commentrecords/up/{id}/{user}', function (Request $request, Response $response, $args) {
    // echo 'blogs';
     $id=$request->getAttribute('id');
     $user=$request->getAttribute('user');
   //  $user=$request->getParam('user');
  
   
   echo $id;
   echo $user;

     $sql= "SELECT upvote from commentrecords where email = '$user'  and comment_id = $id";
     try{ 
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $blog =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 echo json_encode($blog);
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });

 $app->get('/api/commentrecords/{id}/{user}', function (Request $request, Response $response, $args) {
    // echo 'blogs';
     $id=$request->getAttribute('id');
     $user=$request->getAttribute('user');
   //  $user=$request->getParam('user');
  
   

     $sql= "SELECT * from commentrecords where email = '$user'  and comment_id = $id";
     try{ 
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $blog =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 echo json_encode($blog);
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });



 $app->get('/api/commentrecords/{id}', function (Request $request, Response $response) {
    // echo 'blogs';
     $id=$request->getAttribute('id');
  
   //  $user=$request->getParam('user');
     $sql= "SELECT * from commentrecords where comment_id = $id";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->query($sql);
 $blog =$stmt->fetchAll(PDO::FETCH_OBJ);
 $db=null;
 echo json_encode($blog);
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
    //    echo $e.getMessage();
     }
 
 
 
 
 });

 
 $app->put('/api/commentrecords/update', function (Request $request, Response $response) {
    // echo 'blogs';
     
     /*
$email=$request->getParam('email');

 $bid=$request->getParam('bid');*/
 /*
 $email=$request->getParam('email');
 $comment_id=$request->getParam('comment_id');*/
 $id=$request->getParam('id');
 $email=$request->getParam('email');
 $upvote=$request->getParam('upvote');
 $downvote=$request->getParam('downvote');




     $sql= "UPDATE commentrecords set 
     upvote=:upvote, downvote=:downvote
      where email = '$email' and  comment_id=$id";



     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 /*
 $stmt->bindParam(':email', $title);
 $stmt->bindParam(':bid', $content);
 */
 $stmt->bindParam(':upvote', $upvote);
 $stmt->bindParam(':downvote', $downvote);

 $stmt->execute();
 echo '{"notice": "Updated"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
       // echo $e.getMessage();
     }
 
 
 
 
 });




//////
$app->put('/api/commentrecords/update/rep', function (Request $request, Response $response) {
    // echo 'blogs';
     
     /*
$email=$request->getParam('email');

 $bid=$request->getParam('bid');*/
 /*
 $email=$request->getParam('email');
 $comment_id=$request->getParam('comment_id');*/
 $id=$request->getParam('id');
 $email=$request->getParam('email');
 $report=$request->getParam('report');





     $sql= "UPDATE commentrecords set 
     report=:report
      where email = '$email' and  comment_id=$id";



     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 /*
 $stmt->bindParam(':email', $title);
 $stmt->bindParam(':bid', $content);
 */
 $stmt->bindParam(':report', $report);
 
 $stmt->execute();
 echo '{"notice": "Updated rep"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
       // echo $e.getMessage();
     }
 
 
 
 
 });





/////

$app->post('/api/commentrecords/add/rep', function (Request $request, Response $response) {
    // echo 'blogs';
     
     /*
$email=$request->getParam('email');

 $bid=$request->getParam('bid');*/
 /*
 $email=$request->getParam('email');
 $comment_id=$request->getParam('comment_id');*/
 $id=$request->getParam('id');
 $email=$request->getParam('email');
 $report=$request->getParam('report');




 $sql= "INSERT into commentrecords (email,comment_id,report)
  values (:email,:comment_id,:report)";
  


     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 /*
 $stmt->bindParam(':email', $title);
 $stmt->bindParam(':bid', $content);
 */
 $stmt->bindParam(':report', $report);
 $stmt->bindParam(':email', $email);
 $stmt->bindParam(':comment_id', $id);
 
 $stmt->execute();
 echo '{"notice": "Updated"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
       // echo $e.getMessage();
     }
 
 
 
 
 });









 // add
 $app->post('/api/commentrecords/add', function (Request $request, Response $response) {
    // echo 'blogs';
   
    
 $comment_id=$request->getParam('id');
 $email=$request->getParam('email');
 $upvote=$request->getParam('upvote');
 $downvote=$request->getParam('downvote');
 //   $content=$request->getParam('content');
 //   $auth_date=$request->getParam('auth_date');




     $sql= "INSERT into commentrecords (email,comment_id,upvote, downvote) values (:email,:comment_id,:upvote,:downvote)";
     try{
 $db=new db();
 $db=$db->connect();
 $stmt = $db->prepare($sql);
 
 $stmt->bindParam(':email', $email);
 $stmt->bindParam(':comment_id', $comment_id);
 $stmt->bindParam(':upvote', $upvote);
 $stmt->bindParam(':downvote', $downvote);
 $stmt->execute();
 echo '{"notice": "Added"}';
     }
    catch (PDOException $e){
         echo '{"error": {"text": '.$e.getMessage().'}';
        echo $e.getMessage();
     }
 
 
 
 
 });
