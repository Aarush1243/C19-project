var invisibleWall1, invisibleWall2;
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostLoseImg;
var gameOver, gameOverImg;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOverImg = loadImage("gameOver.png");

  climbersGroup = new Group();
  doorsGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 20;

  ghost = createSprite(300, 500);
  ghost.scale = 0.5
  ghost.addImage("moving", ghostImg);
  ghost.setCollider("circle", 0, 0, 100)

  gameOver = createSprite(300, 300);
  gameOver.addImage(gameOverImg);


  invisibleWall1 = createSprite(50, 300, 20, 600);

  invisibleWall2 = createSprite(550, 300, 20, 600);


}

function draw() {
  background(200);
  if (gameState == "play") {
    if (tower.y > 400) {
      tower.y = 300
    }
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 20;
    }
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 20;
    }
    if (frameCount % 60 == 0) {
      spawnClimbers();
    }
    if (frameCount % 60 == 0) {
      spawnDoors();
    }
    if (doorsGroup.isTouching(ghost)) {
       gameState = "end";
    }
    if (climbersGroup.isTouching(ghost)) {
       gameState = "end";
    }
    score = score + Math.round(frameCount/60)

    gameOver.visible = false;

  }
  else if (gameState == "end") {
    tower.velocityY = 0;
    climbersGroup.setVelocityYEach(0)
    doorsGroup.setVelocityYEach(0)
    climbersGroup.setLifetimeEach(-1);
    doorsGroup.setLifetimeEach(-1);
    ghost.velocityX = 0;
    gameOver.visible = true;
  }
  invisibleWall1.visible = false;
  invisibleWall2.visible = false;
  ghost.collide(invisibleWall1);
  ghost.collide(invisibleWall2);

  drawSprites();
}

function spawnDoors() {
  door = createSprite(300, 0);
  door.addImage("door", climberImg);
  door.velocityY = 25;
  door.x = Math.round(random(100, 500));
  door.lifetime = 600;
  door.x = climber.x;
  door.y = climber.y + 50;
  doorsGroup.add(door);
}

function spawnClimbers() {
  climber = createSprite(300, 0);
  climber.addImage("climber", doorImg);
  climber.velocityY = 25;
  climber.x = Math.round(random(100, 500));
  climber.lifetime = 600;
  climbersGroup.add(climber);
}
