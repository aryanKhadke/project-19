var bricks, bricksImg;
var broom, broomImage, invisiSprite;
var goldScore = 0;

var rockImg, goldImg;

var rockGroup, goldGroup;

var PLAY = 0;
var END = 1;
var gameState = PLAY;


function preload(){
  
  bricksImg = loadAnimation("brickwall.jpg");
  broomImg = loadAnimation("broom.jpg");
  rockImg = loadAnimation("obstacle.png");
  goldImg = loadAnimation("goldcoin.jpg");
  
}

function setup(){
  createCanvas(600,600);
  
  rockGroup = createGroup();
  goldGroup = createGroup();
  
  bricks = createSprite(300,300,50,50);
  bricks.addAnimation("wall", bricksImg);
  bricks.scale = 2.5;
  bricks.velocityY = (2+goldScore/4);
  
  broom = createSprite(300,300,50,50);
  broom.scale = 0.3;
  broom.addAnimation("broom", broomImg);
  
  invisiSprite = createSprite(300,300,40, 80);//this is so that the score only increments when the coin touches the top part of the broom, and that the game is over when ANY part of the broom touches the rock 

  
}

function draw(){
  background("black");
  
  if (gameState === PLAY){
    invisiSprite.x = broom.x;
    invisiSprite.y = broom.y-60
    invisiSprite.visible = false;
    
    
    
    rocks();
    goldCoin();
    if (keyDown("space") && broom.y>25){
      broom.velocityY = -5;
    }
    
    if (invisiSprite.isTouching(goldGroup)){
      goldScore++;
      goldGroup.destroyEach();
    }
    
    if (keyDown("right")){
      broom.x+=5 
    }
    
    if (keyDown("left")){
      broom.x+= -5; 
      
    }
    
  
    broom.velocityY = broom.velocityY+0.8
  
    if (bricks.y > 400){
      bricks.y = 300; 
    }
  
    if (broom.y>600 || broom.isTouching(rockGroup)){
      gameState = END
    }
    
    drawSprites();
    
    textSize(30);
    stroke("black");
    fill("gold");
    text("Coins: "+goldScore,460,570);
  
    textSize(20);
    stroke("white");
    fill("red");
    text("Help the broomstick escape its evil witch!", 110,30);
    textSize(15);
    text(" Make sure to the collect the broomstick's power source, the coins, along the way!", 20,50);
  }
  
  if (gameState === END){
    textSize(70);
    fill("red");
    text("GAME OVER!", 90,320);
  }
  
}

function rocks(){
  if (frameCount%270 === 0){
    
    var rand = round(random(200,400));
    
    var rock = createSprite(rand, -10, 50,50);
    
    rock.scale = 0.3;
    rock.addAnimation("rock", rockImg);
    
    rock.setCollider("circle",0,0, 200);
    
    rock.depth = broom.depth;
    broom.depth++
    
    rock.velocityY = bricks.velocityY;
    rock.lifetime = 600/2.5+50;
    
    rockGroup.add(rock);
    
  }
  
  
}

function goldCoin(){
  if (frameCount%100 === 0){
    var rand = round(random(200,400));
    
    var gold = createSprite(rand,-10,50,50);
    gold.scale = 0.2;
    gold.addAnimation("goldCoin", goldImg);
    
    gold.setCollider("circle",0,0,100);
    
    gold.depth = broom.depth;
    broom.depth++
    
    gold.velocityY = bricks.velocityY;
    gold.lifetime = 600/2.5+50;
    
    goldGroup.add(gold);
    
  }
  
}



