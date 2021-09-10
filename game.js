var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var colors = ["red","green","blue","yellow"];


// You have to press any key to start the game
pressAnyKey();
function pressAnyKey(){
    
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
    jQuery(document).on("keydown", main);
    jQuery(".btn").off("click");
}



// The Game get started
function main(){
    jQuery("body").css("background-color","#011F3F");
    jQuery(".btn").off("click");
    jQuery(document).off("keydown");
    if (gamePattern.length == 0){
        setTimeout(nextSequence, 500)
    }
    else{
        nextSequence();
    }

    // Clear the user click
    userClickedPattern = [];


    // Click the color as the same as the pattern
    jQuery(".btn").on("click",colorClicked);   
    
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = colors[randomNumber];
    var colorSound;

    // Level Up 
    level += 1;
    jQuery("h1").text("Level "+ level);

    // Animate the choosen color
    jQuery("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    colorSound = new Audio("sounds/"+randomChosenColor+".mp3");
    colorSound.play();
    

    // Pushing the pattern
    gamePattern.push(randomChosenColor);
}

function colorClicked(event){
    nameOfColor = event.target.id;
    console.log(event.target.id + " is getting clicked by user");

    // Animating
    $("#"+nameOfColor).addClass("pressed");
    setTimeout(function(){$("#"+nameOfColor).removeClass("pressed");},70);

    // Sounding
    colorSound = new Audio("sounds/" + nameOfColor + ".mp3");
    colorSound.play();

    // Pushing the user pattern
    userClickedPattern.push(nameOfColor);

    // Checking the user input same as the gamePattern
    lastIndex = userClickedPattern.length-1;
    if(userClickedPattern[lastIndex] != gamePattern[lastIndex] ){
        var wrongSound = new Audio("sounds/wrong.mp3");
        jQuery("h1").text("Wrong! Press Any Key to Continue");
        jQuery("body").css("background-color","red");
        wrongSound.play();
        pressAnyKey();
    }
    else if(userClickedPattern.length == level){
        jQuery(".btn").off("click");
        setTimeout(main,1000);
    }
}

