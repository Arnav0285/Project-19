var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var jerry,jerryImage,tom,tomImage;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var score;
var gameOver,restart,gameOverImage,restartImage;
var checkPointSound;

function preload(){
ground_image=loadImage("Background.png");
  jerryImage=loadImage("jerry.png")
  tomImage=loadImage("tom.png")
  obstacle1=loadImage("obstacle1.png");
  gameOverImage=loadImage("gameOver1.png");
  restartImage=loadImage("restart1.png");
  checkPointSound=loadSound("checkpoint.mp3")
  
}

function setup() {
 createCanvas(600,500);
  
ground=createSprite(0,0,0,0);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=1.4;
   ground.velocityX=-1
  
   jerry=createSprite(300,420,600,10);
  jerry.addImage("jerryImage",jerryImage);
  jerry.scale=0.2;
 
  jerry.debug=false;
  jerry.setCollider("rectangle",0,0,jerry.width,jerry.height)
  
  
  tom=createSprite(50,410,600,10);
  tom.addImage("tomImage",tomImage)
  tom.debug=false;
  tom.scale=0.5;
 
  
  invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  obstaclesGroup=new Group();
  
  score=0;

  tom.depth = background.depth 
  tom.depth = tom.depth + 1
}

function draw() {
 background("black");
  
 
  
jerry.velocityY = jerry.velocityY + 0.8;
jerry.collide(invisible_ground); 
  
 
tom.velocityY = tom.velocityY + 0.8;
tom.collide(invisible_ground); 
  
  
   if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
    
   score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
   if (obstaclesGroup.isTouching(tom)){
     tom.velocityY=-12;
   }
 ground.velocityX = -(4 + 3* score/100);
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
 if((keyDown("space")&& jerry.y >= 220)) {
   jerry.velocityY = -12;
  }  
  
  if (jerry.isTouching(obstaclesGroup)){
    gameState=END;
  }
  }
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     jerry.velocityY = 0
     tom.x=jerry.x;
  
      
    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
} 
  
 
  drawSprites();
  fill("lightpink");
  textSize(20);
   text("Score: "+ score, 500,50);
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
  obstaclesGroup.destroyEach();
  score=0;
  tom.x=50;
}

function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,450,10,40);
   obstacle.velocityX = -6 ;
   
    
   var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
   obstacle.scale=0.1;
      obstaclesGroup.add(obstacle);
    obstacle.debug=false;
obstacle.setCollider("circle",0,0,1);
   }
     
}

