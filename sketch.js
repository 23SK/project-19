var motorbike, motorbikeImg;
var rock, rock1Img, rock2Img, rocks;
var road, roadImg;
var cone, coneImg;
var gameOver, gameOverImg;
var score, lives;
var gameState = "PLAY";
var ranNum;

function preload() {
    motorbikeImg = loadImage("motorbike.png");
    rock1Img = loadImage("rock1.png");
    rock2Img = loadImage("rock2.png");
    roadImg = loadImage("road.png");
    coneImg = loadImage("cone.png");
    gameOverImg = loadImage("gameover.png");
}

function setup() {
    createCanvas(1000, 300);

    road = createSprite(1000, 225);
    road.addImage("road", roadImg);
    road.scale = 3;

    invGround = createSprite(400, 300, 700, 10);
    invGround.visible = false;

    motorbike = createSprite(50, 275, 25, 25);
    motorbike.addImage("motorbike", motorbikeImg);
    motorbike.scale = 0.075

    rocks = new Group();
    cones = new Group();

    gameOver = createSprite(500, 112);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5
}

function draw() {

    if (gameState == "PLAY") {


        motorbike.debug = true;
        motorbike.setCollider("rectangle", 0, 0, 100, motorbike.height);

        text("score" + score, width - 125, 20);

        gameOver.visible = false;

        score = score + Math.round(frameCount / 60)
        road.velocityX = -3;
        if (road.x < 0) {
            road.x = road.width / 8;
        }

        if (keyDown(UP_ARROW)) {
            motorbike.y -= 3;
        }

        if (keyDown(DOWN_ARROW)) {
            motorbike.y += 3;
        }

        if (frameCount % 200 == 0) {
            spawnRocks();
        }

        if (frameCount % 200 == 0) {
            spawnCones();
        }

        if(motorbike.isTouching(rocks) || motorbike.isTouching(cones)){
           console.log("hi")
            gameState = "END";
        }

    }
    if (gameState == "END") {
        road.velocityX = 0;
        rocks.setVelocityXEach(0);
        cones.setVelocityXEach(0);
        rocks.setLifetimeEach(0);
        cones.setLifetimeEach(0);
        gameOver.visible = true;
    }
    drawSprites();
}

function spawnCones() {
    cone = createSprite(375,Math.round(random(290,10)));
    cone.addImage(coneImg);
    cone.scale = 0.175;
    cone.velocityX = -2;
    cone.lifetime = 200;
    cones.add(cone);
}

function spawnRocks() {
    rock = createSprite(375,Math.round(random(290,10)));
    rock.velocityX = -2;
    rock.lifetime = 200;
    rocks.add(rock);

    switch(ranNum){
        case 1: bottle.addImage(bottleImg);
        break;

        case 2: bottle.addImage(bottle2Img);
        break;
    }
}