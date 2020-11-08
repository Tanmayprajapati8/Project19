var man,manImage,manJumpImage,groundImage1,ground1;
var groundImage,ground;
var manCollide;
var invisibleGround;
var obstacle,obstacleImage1,obstacleImage22,obstacleImage3,obstacleImage4,obstacleImage5,obstacleImage6,obstacleGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gameOverImage;
var restart,restartImage;
var score=0;



function preload(){
  //adding Images here
  groundImage=loadImage("background.jpg");
  groundImage1=loadImage("background1.jpg");

  manImage=loadAnimation("sprite_0.png","sprite_1.png");
  manJumpImage=loadAnimation("sprite_0.png");
  obstacleImage1=loadImage("Imported piskel-1.gif");
  obstaclesImage22=loadImage("stone.png");
  obstacleImage3=loadImage("Imported piskel (3).gif");
  obstacleImage4=loadImage("Imported piskel (1).gif");
  obstacleImage5=loadImage("Imported piskel (4).gif");
 gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  obstacleImage6=loadImage("bee Image0.png");
  
  
  
}
function setup(){
  
  createCanvas(500,400);

  //making ground
  ground=createSprite(300,168,20,20);
  ground.addImage(groundImage);
  
  //making man sprite
  man=createSprite(60,200,20,20);
  man.addAnimation("man",manImage);
  
  //making gameover sprite
  gameOver=createSprite(240,180,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.visible=false;
  
  //making restart sprite
  restart=createSprite(240,220,20,20);
  restart.addImage(restartImage);
  restart.scale=0.5;
  restart.visible=false;
  
  //making invisibleGround sprite
  invisibleGround = createSprite(80,322,600,10);
  invisibleGround.visible = false;
  
  //making ground to move left and giving its size
  ground.scale=1; 
  ground.velocityX=-4;
  man.scale=0.6;
  obstaclesImage22.scale=0.01;
  
  //creating new group
  obstacleGroup=new Group();
  
}
function draw() {
  //making gameState=Play
  if(gameState===PLAY){
    score=score+Math.round(random(getFrameRate()/48))


  //making infinite ground
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  //if we press space man will jump
  if(keyDown("space") && man.y>=290){
    man.changeAnimation("man",manJumpImage);
    man.velocityY=-15;
  }
    
    //making if man touch obstacle then game over
    if(man.isTouching(obstacleGroup)){
      man.velocityX=0;
      man.velocityY=0;
      gameState=END;

    }
    //adding gravity
  man.velocityY=man.velocityY+0.8;
  
  //man will did not bounce.
  man.collide(invisibleGround);
  
  //creating edges
  createEdgeSprites();
    
  //making man to bounceoff invisibleground;
  man.bounceOff(invisibleGround);
  
  //calling the function that I made;
  spawnObstacle();
  }

  
  if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    obstacleGroup.destroyEach();
    
    //man will did not bounce.
    man.collide(invisibleGround);
    
    if(mousePressedOver(restart)){
      reset();
    }

  }
  drawSprites();
  textSize(20);
  text("Score:"+score,400,28);
  
  
}
function spawnObstacle(){
  if(frameCount %80===0){
    obstacle=createSprite(600,282,20,20);
    obstacle.velocityX=-5;
    obstacle.scale=0.2;
    obstacle.lifetime=140;
    obstacleGroup.add(obstacle);
    var rand=Math.round(random(1,6));
    switch (rand){
        case 1:obstacle.addImage(obstacleImage1);
        obstacle.scale=0.3;
        break;
        case 2:obstacle.addImage(obstaclesImage22);
        break;
        case 3:obstacle.addImage(obstacleImage3);
        obstacle.scale=0.5;
        break;
        case 4:obstacle.addImage(obstacleImage4);
        obstacle.scale=0.6;
        break;
        case 5:obstacle.addImage(obstacleImage5);
        obstacle.scale=0.8;
        break;
        case 6:obstacle.addImage(obstacleImage6);
        obstacle.scale=0.8;
        break;
        default:break;
    }

}
 
}
function reset(){
  gameState=PLAY;
  ground.velocityX=-4;
  gameOver.visible=false;
  restart.visible=false;
  obstacleGroup.destroyEach();
  score=0;

}
