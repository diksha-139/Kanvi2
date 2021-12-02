/* 
My own game
******

*/
var bgImg,roboImg, roboCollided,robot;
var bg;
var invisibleGround;
var life= 5;
var score=0;
var obstacles
var obImg,bugImg;
var InputBox;
var t;
var number;
const PLAY =1;
const END = 0;
const ASK =2;
var gameState = PLAY;
var ob1, ob2, ob3, ob4, ob5
function preload(){
bgImg= loadImage("images/bg.jpg");
roboImg= loadAnimation("images/robo1.png","images/robo2.png","images/robo3.png","images/robo4.png","images/robo5.png","images/robo6.png","images/robo7.png");
roboCollided= loadAnimation("images/col2.png","images/col3.png");
obImg= loadImage("images/drone.png");
bugImg= loadAnimation("images/b1.png","images/b2.png","images/b3.png","images/b4.png")
bugStopImg=loadAnimation("images/b1.png");
number=loadImage("images/back.gif");
robotStopImg= loadAnimation("images/robo1.png");
ob1=loadImage("images/fb.png");
ob2=loadImage("images/whatsapp.png");
ob3=loadImage("images/qrcode.png");
ob4=loadImage("images/tiktok.png");
}


function setup() {
  createCanvas(1300,550);

  bg = createSprite(750,175,1500,850);
  bg.addImage("background",number);
  bg.scale=4;
  bg.velocityX = -3;


  invisibleGround= createSprite(650,540,1500,20);
  invisibleGround.visible = false;


  robot = createSprite(50,height-100, 50, 50);
  robot.addAnimation("running",roboImg);
  robot.addAnimation("collided",roboCollided);
  robot.addAnimation("stopped",robotStopImg);

  obstacles= new Group();


 
}

function draw() {
  background(0);
  drawSprites();






if(gameState=== PLAY){
bg.velocityX=-3;

if(bg.x<width/3){
  bg.x=width/2;
}

if(keyWentDown("space")){

  robot.velocityY=-20
}
//to  add gravity

robot.velocityY = robot.velocityY + 0.8;

spawnObstacles();

if(obstacles.isTouching(robot)){
gameState = ASK
}
if(gameState === ASK){

  background("cyan");

  
  drawSprites();
 
  InputBox= createInput("").attribute("placeholder","type your answer")
  InputBox.position(400,380);
  InputBox.class("input");

  robot.destroy();
  obstacles.destroyEach();
  obstacles.setVelocityXEach(0);
  bg.velocityX=0
  

title = createElement("h1");
title.html("QUIZ TIME!!!");
title.class("title")
title.position(400,50);

 Question=createElement("h2");
 Question.html("What function is used to clear the screen? ")
  Question.position(200,150);
Question.class("question");

  Option1=createElement("h3");
  Option1.html("A.  clear()");
  Option1.position(300,180);
Option1.class("question");

 Option2=createElement("h3");
  Option2.html("B.  invisible()");
  Option2.position(300,210);
Option2.class("question");

  Option3=createElement("h3");
  Option3.html("C.  disappear()");
  Option3.position(300,240);
Option3.class("question");

  Info=createElement("h3");
  Info.html("Type your option here");
  Info.position(300,270);
  Info.class("question");
  
  
  

  button =createButton("Submit");
  button.position(400,450);
  button.class("button");

  button.mousePressed(()=>{
    answer= InputBox.value();
    button.hide();
    InputBox.hide();
    Question.hide();
    Option1.hide();
    Option2.hide();
    Option3.hide();
    Info.hide();
    result=createElement("h1");
    

    correctAnswer = 'A';
    if(answer === correctAnswer){
      score +=10;
      console.log(score)
      result.html("your answer is correct")

    }else{
      life -=1;
      result.html("Ops! your answer is incorrect")
    }
  })

}

}

 

  robot.collide(invisibleGround);
  displayScore = createElement("h1");
  displayScore.html("Score: "+score);
  
  
  displayScore.position(500,520);
  
  displayLife= createElement("h1");
  displayLife.html("Life : "+life);
  displayLife.position(300,520);
  




}
function spawnObstacles(){
  if(frameCount% 20 ===0){
    obstacle= createSprite(width,height-100,10,10);
   
    obstacle.y= Math.round(random(height-100,500));
    var rand=Math.round(random(1,5));
    switch(rand){
      case 1: obstacle.addImage(ob1);
      obstacle.scale=0.01
      break; 
      case 2: obstacle.addImage(ob2);
      obstacle.scale=0.4
      break; 
      case 3: obstacle.addImage(ob3);
      obstacle.scale=0.6
      break;
      case 4: obstacle.addImage(ob4);
      obstacle.scale=0.5
      break; 
     
      deafult:break;

    }
    obstacle.scale=0.5
    obstacle.velocityX=-17

     obstacle.depth = robot.depth
    robot.depth +=1 
obstacles.add(obstacle)
  }
 
}
