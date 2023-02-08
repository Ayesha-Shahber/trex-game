var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var gameOverImg ,restartImg
var jumpSound, checkPointSound, dieSound

function preload() {
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
trex_collided = loadImage("trex_collided.png");
groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
checkPointSound = loadSound("checkpoint.mp3");
sun1Animation = loadImage("sun1.png");

}

function setup() {
createCanvas(windowWidth, windowHeight);
sun1 = createSprite(width - 50, 100, 10,10);
sun1.addAnimation("sun1",sun1Animation);
sun1.scale = 0.3

//create a trex sprite
trex = createSprite(50,height - 70,20,50);

trex.addAnimation("running", trex_running);
trex.addAnimation("collided", trex_collided);
trex.setCollider('circle',0,0,350)

trex.scale = 0.5;

//ground = createSprite(200,180,400,20);
//ground.addImage("ground",groundImage);
//ground.x = ground.width /2;
//ground.velocityX = -4;
ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
//gameOver = createSprite(300,100);
//gameOver.addImage(gameOverImg);
//restart = createSprite(300,140);
//restart.addImage(restartImg);
gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg)
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
gameOver.scale = 0.5;
restart.scale = 0.5;
invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;
cloudsGroup = createGroup();
obstaclesGroup = createGroup();

console.log("hello"+5);
trex.setCollider("rectangle",0,0,400,trex.height);
trex.debug = true
score = 0;
//var ran = Math.round(random(10,60));
//console.log(ran);
}

function draw() {

background(180);
textSize(20);
fill("black");
text("Score: "+ score,500,50);

console.log("this is ",gameState);
if(gameState === PLAY) {
       gameOver.visible = false;
       restart.visible = false;
       ground.velocityX = -(4 + 3*score/100)

       score = score + Math.round(frameCount/60);
       
       if (score > 0 && score%100 === 0) {
              checkPointSound.play()
       }
       if (ground.x < 0) {

              ground.x = ground.width / 2;
              }
}
if (touches.length > 0 || keyDown("space") && trex.y >= height - 120) {

       trex.velocityY = -12;
       jumpSound.play();
       touches = [];
       }

       trex.velocityY = trex.velocityY + 0.8
       spawnClouds();
spawnObstacles();
if(obstaclesGroup.isTouching(trex)) {
       trex.velocityY = -12;
       jumpSound.play();
       //gameState = END;
       //dieSound.play();
}
else if(gameState === END) {
       gameOver.visible = true;
       restart.visible = true;
       ground.velocityX = 0;
       trex.velocityY = 0;
       trex.changeAnimation("collided",trex_collided);
       obstaclesGroup.setLifetimeEach(-1);
       cloudsGroup.setLifetimeEach(-1);
       obstaclesGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);
}

//console.log(trex.y);
//jump when the space button is pressed



trex.collide(invisibleGround);

drawSprites();

}

function spawnObstacles() {
if(frameCount % 60 === 0) {
    //var obstacle = createSprite(600,165,10,40);
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(6 + score/100);
var rand = Math.round(random(1,6));
switch(rand) {
    case 1: obstacle.addImage(obstacle1);
    
           break;
    case 2: obstacle.addImage(obstacle2);
           
           break;
    case 3: obstacle.addImage(obstacle3);

           break;
    case 4: obstacle.addImage(obstacle4);

           break;
    case 5: obstacle.addImage(obstacle5);
    
           break;
    case 6: obstacle.addImage(obstacle6);

           break;
    default: break;
}


obstacle.lifetime = 300;
obstaclesGroup.add(obstacle);
}
}

function spawnClouds() {
    if(frameCount % 60 === 0) {
//cloud = createSprite(600,100,40,20);
var cloud = createSprite(width+20,height-300,40,10);
cloud.y = Math.round(random(10,60));
cloud.addImage(cloudImage);
cloud.scale = 0.4;
cloud.velocityX = -3;
cloud.lifetime = 200;

cloud.depth = trex.depth;
trex.depth = trex.depth + 1;
cloudsGroup.add(cloud);
    }

}
