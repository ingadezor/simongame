var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];   //sequence of red, blue, green, or yellow
var userClickedPattern = [];

var started = false;
var level = 0;


//1. Adding colours to userClickedPattern and sounds
$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");   //attribute of a button that was clicked (that is the colour that was clicked)
    userClickedPattern.push(userChosenColour);   //adding clicked colours to user pattern
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //every time a button is clicked - will check each new (last in the array) button clicked by user against pc pattern
    checkAnswer(userClickedPattern.length-1);  //index of last color entered by user

})


//2. STARTING the game when any key is pressed:
$(document).on("keydown", function(){
   if(!started){
        started = true;
        $("#level-title").text("Level "+level);  //changing title to Level 0 
        nextSequence();  //pc will save and show sequence
   }
})




//FUNCTIONS:
//function to choose a random colour, add to pattern, fadeOut, and make sound
function nextSequence(){
    level++; 
    $("#level-title").text("Level "+level); //updating level title every time nextSequence() is called


    var randomNumber = Math.floor(Math.random()*4); //rand num 0-3

    //chosing a random colour 
    var randomChosenColour = buttonColours[randomNumber];
    //adding random colour to patter array to remember the pattern to be produced
    gamePattern.push(randomChosenColour);

    
    //showing sequence of buttons in the pattern to be rpoduced for a user:
    $("#"+randomChosenColour).fadeOut(150).fadeIn(150);  //animation for a button in the pattern
    playSound(randomChosenColour); //press and unpress animation for a colour 
}


function playSound(colourName){
    var audio = new Audio("sounds/" + colourName + ".mp3");
    audio.play();
}


//press and unpress animation for a colour 
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
    
}


function checkAnswer(currentLevel){   //current lvl = index of last color entered by user
    //check if last color chosen by user is same as game's last color
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){  //if last color chosen by user is same as game's last color
        if(userClickedPattern.length == gamePattern.length){  //and if user entered the whole sequence correctly
            setTimeout(function(){
                userClickedPattern.length = 0;    //empty an array of user inputs to check for next entered sequence
                nextSequence();         //pc will show new sequence for a user with delay
                
            }, 200);
        }
           
            
    } //otherwise GAME OVER:
    else {
        playSound("wrong");
        $("#level-title").text("Wrong sequence, press any key to start");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 120)

        startGameOver();
    }
}


function startGameOver(){
    //empty all arrays for a new game
    userClickedPattern.length = 0; 
    gamePattern.length =0;
    level=0;
    started = false;
}

