
<!DOCTYPE html PUBLIC>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Vancouver Canucks Fantasy League</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/grid.css">

  </head>
  
  <body>      

  <!-- navigation bar -->


    <header id="top">

      <nav class="grid">
        <div class="col-3">     
            <a href="index.php#members" class="josh">Members</a>
        </div>    
        <div class="col-3">
            <a href="index.php#players" class="josh">Players</a>
        </div>
        <div class="col-3">
            <a href="index.php#stats" class="josh">Stats</a>
        </div>
        <!-- redirect to register page -->

            <div class="col-3">
     <a href="register.php" class="josh">Register</a>
        </div> 
        
      </nav>

    </header>

            <!-- beginning of data blocks -->

     <div class="col-2">
                 <!-- load array from members.txt -->

            <article id="members">
                <!-- sort data -->

<?
                $array=array();
                $lines=file("members.txt");
                $i=0;
                $field1 = $_GET['field1'];
              //load and sort through data, arrange by user 
                    foreach ($lines as $line)
                    {
                        list($user, $email, $team, $player1, $player2, $player3)=explode("|",$line);
                        $cl= "$user $email $player $team";
                        $array[$i]=$cl;
                        $i++;
                     }
                    asort($array);

                    foreach ($array as $line)
                    {
                    //match to $cl
                    list($user, $email, $player, $team) = explode(" ", $line);
                    //link  =$user name to the rest of its data
                    if ($user == $field1) {
                        echo "$team is due on $user <br/> $player1" ;
                    }

                    echo "

                    ";
                    }

                ?>
            </article>
        </div>
    </body>
</html>
                