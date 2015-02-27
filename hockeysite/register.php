
<!DOCTYPE html PUBLIC>

<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Variables for website management and display -->

    <title>Vancouver Canucks Fantasy League</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/grid.css">

  </head>
  
  <body>

    <header id="top">

      <nav class="grid">

        <!-- navigation bar -->

        <div class="col-3">     
            <a href="index.php#members" class="josh">Members</a>
        </div>  
        <div class="col-3">
            <a href="index.php#players" class="josh">Players</a>
        </div>
        <div class="col-3">
            <a href="index.php#stats" class="josh">Stats</a>
        </div>
          <!-- redirect to home page -->

            <div class="col-3">
            <a href="index.php" class="josh">Home</a>
        </div> 
        
            <div class="col-3">
            
        </div> 

        
            
                     
                   
                     


        
        
      </nav>

    </header>

    <div class="grid">
    
        <div class="col-2">

            <article id="players">

              <h2>Sign up</h2>

<form action="register.php" method="POST">


<!-- sign up form -->
<table cellspacing='5'>
   <tr><td><label for="username">Username:</label></td><td> <input id="username" name="field1" type="text" /></td></tr>
   <tr><td><label for="email">Email:</label></td><td><input name="field2" type="text" /></td></tr>
   <tr><td><label for="fteam">Favotite Team:</label></td><td><input id="title" name="field3" type="text" /></td></tr>
   <tr><td><label for="fplayer">Favorite Player:</label></td><td><input name="field4" type="text" />
            <br/><input name="field5" type="text" />
            <br/><input name="field6" type="text" />
            <br/><input name="field7" type="text" />
            <br/><input name="field8" type="text" />
            <br/><input name="field9" type="text" />
            <br/><input name="field10" type="text" />
            <br/><input name="field11" type="text" />
            <br/><input name="field12" type="text" />
            </td>
    

   </tr>
</table>   
    <!-- submit data -->
    <input type="submit" name="submit" value="Save Data">
</form>
    <!-- save data to members.txt in order 1-4 -->
<?php
if(isset($_POST['field1']) && isset($_POST['field2'])) {
    $data = $_POST['field1'] . '|' . $_POST['field2'] . '|' . $_POST['field3']. '|'. $_POST['field4'] . '<br/>' . $_POST['field5']. '<br/>' . $_POST['field6']. '<br/>' . $_POST['field7'].'<br/>' . $_POST['field8'].'<br/>' . $_POST['field9'].'<br/>' . $_POST['field10'].'<br/>' . $_POST['field11'].'<br/>' . $_POST['field12']."\n";
    $ret = file_put_contents('members.txt', $data, FILE_APPEND | LOCK_EX);
    if($ret === false) {
        die('There was an error writing this file');
    }
    else {
      //return home
        echo "user created <a href='index.php'>click here</a> to continue";

    }
}
else {
   die('');
}
?>


            </article>

        </div>  

    
            
    </div>
    
  </body>
  
</html>
