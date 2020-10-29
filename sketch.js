var trex1;
var trex_running;
var trex_collide;
var ground1;
var ground2;
var iground;
var cloud1;
var cloud2;
var cloud_group;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstacle_group;
var count=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameover;
var gameover_1;
var restart;
var restart_1;
localStorage["highest score"]=0;

function preload()
{
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collide=loadAnimation("trex_collided.png");
  
  ground1=loadImage("ground2.png");
  
  cloud1=loadImage("cloud.png");
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
  gameover_1=loadImage("gameOver.png");
  restart_1=loadImage("restart.png");
  
}

function setup() 
{
  createCanvas(600,200);
  trex=createSprite(200,125,10,10);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collide);
  trex.scale=0.5;
  
  ground=createSprite(300,150,600,20);
  ground.addImage(ground1);
  
  iground=createSprite(300,160,600,5);
  iground.visible=false;
  
  cloud_group=createGroup();
  obstacle_group=createGroup();
  
  gameover=createSprite(300,100,10,10);
  gameover.addImage(gameover_1);
  gameover.scale=0.5;
  gameover.visible=false;
  restart=createSprite(300,130,10,10);
  restart.addImage(restart_1);
  restart.scale=0.5;
  restart.visible=false;
}

function draw() 
{
  background(168);
  trex.collide(iground);
  if(gameState===PLAY)
  {
   count=count+Math.round(getFrameRate()/60);   
   
  ground.velocityX=-4;
  console.log(trex.y);
  trex.velocityY=trex.velocityY+0.5;
  
  if(keyDown("space")&&trex.y>=134)
    {
      trex.velocityY=-5;
      
    }
  if(ground.x<0)
    {
      ground.x=ground.width/2;
    }
  clouds();
  obstacles();
    if(obstacle_group.isTouching(trex))
      {
        gameState=END;
      }
  }
  
  if(gameState===END)
    {
      ground.velocityX=0;
      trex.changeAnimation("collided",trex_collide);
      obstacle_group.setVelocityXEach(0);
      cloud_group.setVelocityXEach(0);
      obstacle_group.setLifetimeEach(-1);
      cloud_group.setLifetimeEach(-1);  
      
      gameover.visible=true;
      restart.visible=true;
      
  }
  if(mousePressedOver(restart))
    {
      reset();
    }
  textSize(18);
  fill("black");
  text("Score:"+count,500,50);
  
  
  drawSprites();
}

function clouds()
{
  if(World.frameCount%60===0)
 {
  cloud=createSprite(600,random(50,100),10,10);
  cloud.addImage(cloud1);
  cloud.velocityX=-4;
  cloud.scale=0.5;
  cloud.lifetime=150;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
   
   cloud_group.add(cloud)
 }
}

function obstacles()
{
  if(World.frameCount%60===0)
 {
  obstacle=createSprite(600,140,10,10);
  //cloud.addImage(cloud1);//
   var r=Math.round(random(1,6));
   switch(r)
{
  case 1:obstacle.addImage(obstacle1);
    break;
    case 2:obstacle.addImage(obstacle2);
    break;
    case 3:obstacle.addImage(obstacle3);
    break;
    case 4:obstacle.addImage(obstacle4);
    break;
    case 5:obstacle.addImage(obstacle5);
    break;
    case 6:obstacle.addImage(obstacle6);
    break;
    default:break;
}
  obstacle.velocityX=-4;
  obstacle.scale=0.5;
  obstacle.lifetime=150;
  
   
   obstacle_group.add(obstacle)
 }
}

function reset()
{
  gameState=PLAY;
  count=0;
  
  obstacle_group.destroyEach();
  cloud_group.destroyEach();
  
  gameover.visible=false;
  restart.visible=false;
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["highest score"]<count)
    {
      localStorage["highest score"]=count;
      }
    console.log(localStorage["highest score"]);
}