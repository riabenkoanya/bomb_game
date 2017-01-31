var playing = false;
var score;
var trialsLeft;
var step;
var action; //set interbal function
var bombs = ["bomb1", "bomb2", "bomb3", "bomb4","bomb5","bomb6","bomb7","bomb8"];
$(function(){
    
//click on start reset button
$("#startreset").click(function(){

    //we are playing?
    if(playing){

        //reload page
        location.reload();

    }else{

        //we are not playing
        playing = true; //game initiated

        //set score to 0
        score = 0;
        $("#scorevalue").html(score);

        //show trials left
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        //hide gameover box
        $("#gameOver").hide();

        //change button text to reset game
        $("#startreset").html("Reset Game");

        //start sending bombs
        startAction();
    }
});

$("#bomb1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
    
    //document.getElementById("explodesound").play();
    $("#explodesound")[0].play();//play sound
    
    //stop bomb
    clearInterval(action);
    
    //hide the bomb
    $("#bomb1").hide("explode", 500);
    
    //send new bomb
    setTimeout(startAction, 500);  
});
//explode a bomb
    //play sound
    //explode bomb


//functions

function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i< trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/hearts.png" class="life">');
    }
}

//start sending bombs
function startAction(){
    
    //generate fruit
    $("#bomb1").show();
    chooseBomb(); //choose randome bomb
    $("#bomb1").css({'left' : Math.round(550*Math.random()), 'top': -100});
    //random position
    
    // generate a random step
    step = 1 + Math.round(5*Math.random()); //change step
    
    //Move bomb down by one step every 10ms
    action = setInterval(function(){
       
        //move fruit by one step;
        $("#bomb1").css('top', $("#bomb1").position().top + step); 
        
        //check the bomb is too low
        if($("#bomb1").position().top > $('#bombsContainer').height()){
            //check if we have trials left
            if (trialsLeft > 1){
                //generate fruit
                $("#bomb1").show();
                chooseBomb(); //choose randome bomb
                $("#bomb1").css({'left' : Math.round(550*Math.random()), 'top': -100});
                //random position

                // generate a random step
                step = 1 + Math.round(5*Math.random()); //change step
                
                //reduce trials by one
                trialsLeft --;
                
                //populate trialsLeft box
                addHearts();
 
            }else {//gameover
                playing= false; //we are nor playing anymore
                $("#startreset").html("Start Game"); //change button to Start Game
                
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                
                $("#trialsLeft").hide();
                stopAction();
                
            }
        }
    }, 10);
}

//generate a random bomb
function chooseBomb(){
    $("#bomb1").attr('src','images/' + bombs[Math.round(8*Math.random())]+ '.png');
}

//stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#bomb1").hide();
    
}
});
