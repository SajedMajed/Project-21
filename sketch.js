var skyImg, sky;
var asteroidImg, asteroid, asteroidsGroup;
var gliderImg, glider, glidersGroup;
var rocket, rocektImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";


function preload(){
   skyImg = loadImage("sky.png");
   rocketImg = loadImage("RocketPlace.png");
   asteroidImg = loadImage("asteroid.png");
   spaceSound = loadSound("SpaceSound.mp3");
}  

function setup() {
  createCanvas(600,600);
  spaceSound.loop();
  sky = createSprite(300,300);
  sky.addImage("sky",skyImg);
  sky.velocityY = 1;
  asteroidsGroup = new Group();
  glidersGroup = new Group();
  invisibleBlockGroup = new Group();

  rocket = createSprite(200,200,50,50);
  rocket.scale = 0.3;
  rocket.addImage("rocket", rocketImg);
}

function draw() {
  background("200");
  if(sky.y > 400){
       sky.y = 300;
     } 
   
   if (gameState === "play") {
     
     if(keyDown("left_arrow")){
         rocket.x = rocket.x - 3;
 
     }
     if(keyDown("right_arrow")){
   
           rocket.x = rocket.x + 3;
 
       
     }
     if(keyDown("space")){
  
      rocket.velocityY = -10;

 }

rocket.velocityY = rocket.velocityY + 0.8;
 
   spawnAsteroids();


  if(glidersGroup.isTouching(rocket)){
   rocket.velocityY = 0;
 }
 if(invisibleBlockGroup.isTouching(rocket) || rocket.y > 600){
   rocket.destroy();
   gameState = "End";
 }

 drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(60);
    text("Game Over", 230,250);
  }
}
function spawnAsteroids()
 {
  if (frameCount % 200 === 0) {
    var asteroid = createSprite(200, -50);
    var glider = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = glider.width;
    invisibleBlock.height = 2;

    asteroid.x=Math.round(random(120,400));
    glider.x=asteroid.x;
    invisibleBlock.x=asteroid.x;

    asteroid.addImage(asteroidImg);
    glider.addImage(gliderImg);
    asteroid.velocityY = 1;
    glider.velocityY = 1;
    invisibleBlock.velocityY = 1;

    rocket.depth = asteroid.depth;
    rocket.depth = rocket.depth + 1;
    asteroid.lifetime = 800;
    glider.lifetime = 800;
    invisible.lifetime = 800;
    
     asteroidsGroup.add(asteroid);
    invisibleBlock.debug = true; 
    glidersGroup.add(asteroid);
    invisibleBlockGroup.add(asteroid);
  }
}