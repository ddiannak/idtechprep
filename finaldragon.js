//to add difficulty- add a time that increases the number of stalactites.

//Sets the background image. In Brackets, hover your mouse over 
//the string text below to see the image that's being used.
var background = new Raster("images/background.png", [400, 300]);
background.position = view.center;

//Creates a Player object and sets properties
var player = new Raster("images/player.png", [400, 300]);
player.alive = true;
player.visible = true;

var playerSpeed = 5;

//Moves the player
player.onFrame = function (event) {
    if (Key.isDown('left') && player.position.x > 50) {
        player.translate(-playerSpeed, 0);
    }
    if (Key.isDown('right') && player.position.x < 750) {
        player.translate(playerSpeed, 0);
    }
//Add controsl for up and down, literally up and down, and remember to check the y coordinate
    if (Key.isDown('up') && player.position.y > 0) {
        player.translate(0,-playerSpeed);
    }
    if (Key.isDown('down') && player.position.y < 600) {
        player.translate(0, playerSpeed);
    }
};

//change fallspeed to be slower to be easier
var fallSpeed = 4;
    
var score = 0;

//Create a function to create more
//stalactites whenever you want!
//by specifying y position instead of x position
function Stalactite(yPosition) { 
    //add later to introduce random speeds for difficulty- explain the -0.5 is to randomize x direction
    var xspeed = (Math.random() - 0.5) * fallSpeed,
        yspeed = (Math.random()) * fallSpeed;
    
    //Sets the stalctite texture.
    this.stalactite = new Raster("images/fire.png", [Math.random() * 800, yPosition]);
    
    //This function moves the stalactites to a new random x-position when 
    //the function is called.
    this.stalactite.reposition = function () {
//add condition to check what the original yposition was for the funciont call, if over 10, it means it was set to the bottom so have position y set to lower. if not, then it was 10 at the function call
        if (yPosition > 50) {
            this.position.y = Math.random() * (0 + 50) + 600;
            this.position.x = Math.random() * (800);            
        }
        else {
            this.position.y = Math.random() * (0 + 50) - 50;
            this.position.x = Math.random() * (800);            
        }
        score+=1;
    };
    
    //Moves the stalactite down on screen.
    this.stalactite.onFrame = function (event) {
        //this.translate(xspeed, yspeed);
        
        //checks if original yposition was less than 50, means it started out at the top, so then y position moves in the positive direction. else, means its moving up instead
        if (yPosition < 50 ) {
            this.position.y += yspeed;
            this.position.x += xspeed; 
            if (this.position.y > 650) {
                this.reposition();
            }
        }
        else {
            this.position.y -= yspeed;
            this.position.x += xspeed;
            if (this.position.y < 50) {
                this.reposition();
            }
        }
    };
}

var position = 200;
var numberOfStalactites = 5;
var obstacles = [];

//var tempVariable = new Stalactite(position);
for (var i = 0; i < numberOfStalactites; i++) {
    //Creates an initial space over the player.
    //splits the nubmer of obstacles into upwards moving and downwards moving
    if(i<= numberOfStalactites/2){
        position = 10;
    }
    else{
        position = 600;
    }
    var tempVariable = new Stalactite(position);
    obstacles.push(tempVariable);
}




var scoreText = new PointText(new Point(10, 30));
scoreText.fillColor = 'black';
scoreText.fontSize = 24;
scoreText.content = "Score: " + score;

function onFrame(event){
    if(player.alive){
        //Adds to the score and updates the display.
        //lower the score to be more intuitive, or have it update every time you survive a stalactite
        //score += 25;
        scoreText.content = "Score: " + score;
        for(var i = 0; i < obstacles.length; i++){
            //Check if a stalactite hit the player.
            if(obstacles[i].stalactite.bounds.intersects(player.bounds)){
                //End the game.
                gameOver();
                player.alive = false;
            }
        } 
    }
}

//This runs when the game ends.
function gameOver(){
    player.visible = false;
    for(var i = 0; i < obstacles.length; i++){
        obstacles[i].stalactite.visible = false;

    }
}
