var PLAY = 1
var END = 0
var gameState = PLAY
var bg, bgImage
var ted, tedImage
var invisibleGround
var obstacle, CoralImage
var obstaclesGroup
var foodGroup, foodImage
var sharkGroup, sharkImage
var score = 0
var foodText, foodTextImage
var GameOver, GameOverImage
var restart, restartImage
function preload(){
  bgImage = loadImage("background.jpeg")
  tedImage = loadImage ("PufferFish.png")
  CoralImage = loadImage ("Coral.png")
  foodImage = loadImage ("FishFood.gif")
  sharkImage = loadImage ("shark.png")
  foodTextImage = loadImage ("FoodImage.png")
  GameOverImage = loadImage ("GameOver.png")
  restartImage = loadImage ("resetButton.png")
}
function setup() {
  createCanvas(windowWidth-200,windowHeight-100);
  bg = createSprite(width/2+50,height/2,width*3/2,height+200);
  bg.addImage(bgImage)
  bg.velocityX = -3
  //bg.x = bg.width/2
  bg.scale = 1.7
  invisibleGround = createSprite(100,windowHeight-100,600,10)
  invisibleGround.visible = false
  ted = createSprite(50,160)
  ted.addImage(tedImage)
  ted.scale = 0.2

  foodText = createSprite(350,30)
  foodText.addImage(foodTextImage)
  foodText.scale = 0.2
  obstaclesGroup = createGroup()
  foodGroup = createGroup()
  sharkGroup = createGroup()

  GameOver = createSprite(350,windowHeight-330)
  GameOver.addImage(GameOverImage)
  GameOver.scale = 0.4
  GameOver.visible = false

  restart = createSprite (350,windowHeight-250)
  restart.addImage(restartImage)
  restart.scale = 0.3
  restart.visible = false
}

function draw() {
  background(0);
  if (gameState === PLAY){
    
    if(bg.x<width/3){
      bg.x = width/2+50
    }
    if(keyDown("space") && ted.y>10){
      ted.velocityY=-5
     
    }
    if(foodGroup.isTouching(ted)){
      score++
      foodGroup[0].destroy()
     if(ted.scale<0.4){
      ted.scale+=0.01
     }

    }
    ted.velocityY=ted.velocityY+0.8
    ted.collide(invisibleGround)
    spawnCorals();
    spawnFood();
    spawnShark();
    
   if(sharkGroup.isTouching(ted)){
     gameState = END
   }
  }
  else if (gameState === END){
    GameOver.visible = true
    restart.visible = true
    sharkGroup.destroyEach()
    ted.visible = false
    bg.visible = false
    obstaclesGroup.destroyEach()
    foodGroup.destroyEach()
    
  }

if(mousePressedOver(restart)){
reset()
}


  


  drawSprites();
  textSize(25)
  fill(254,84,2)
  text(score,300,30)
 
}

function reset() {
  bg.visible = true
  score = 0
  restart.visible = false
  GameOver.visible = false
  ted.visible = true

  gameState = PLAY

}

function spawnCorals() {
  if(frameCount % 60 === 0){
    obstacle = createSprite(650, windowHeight-150)
    obstacle.addImage(CoralImage)
    obstacle.velocityX = -5
    obstacle.scale = 0.2
    obstaclesGroup.add(obstacle)
    

  }

}
function spawnFood() {
  if(frameCount % 30 === 0){
    food = createSprite(650,random(50,windowHeight-200))
    food.addImage(foodImage)
    food.velocityX = -5
    food.scale = 0.2
    foodGroup.add(food)

  }

}
function spawnShark() {
 if (frameCount<1000){
  if(frameCount % 100 === 0){
    shark = createSprite(650, random(50,windowHeight-200))
    shark.debug = false
    shark.setCollider("circle",-70,30,100)
    shark.addImage(sharkImage)
    shark.velocityX = -5
    shark.scale = 0.2
    sharkGroup.add(shark)
  }
 }
   else if(frameCount>1000){
    if(frameCount % 60 === 0){
      shark = createSprite(650, random(50,windowHeight-200))
      shark.setCollider("circle",-70,30,100)
      shark.addImage(sharkImage)
      shark.velocityX = -5
      shark.scale = 0.2
      sharkGroup.add(shark)
  
    }
   }
}