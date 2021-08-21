var missileLaunch = new Audio();
missileLaunch.src="music/missile_2.wav";
var victory = new Audio();
victory.src= "music/gamewin.wav";
var over= new Audio();
over.src="music/gameover.wav"
let hero = {
    top: 700,
    left: 575,
};
let enemies = [
    { left: 200, top: 100 },
    { left: 300, top: 100 },
    { left: 400, top: 100 },
    { left: 500, top: 100 },
    { left: 600, top: 100 },
    { left: 700, top: 100 },
    { left: 800, top: 100 },
    { left: 900, top: 100 },
    { left: 200, top: 175 },
    { left: 300, top: 175 },
    { left: 400, top: 175 },
    { left: 500, top: 175 },
    { left: 600, top: 175 },
    { left: 700, top: 175 },
    { left: 800, top: 175 },
    { left: 900, top: 175 },
];
let missiles = [];
document.onkeydown = function movHero(event) {
    const leftarrow = 37;
    const rightarrow = 39;
    const spacebar = 32;
    if (event.keyCode == leftarrow && hero.left >= 20) {
        hero.left = hero.left - 10;
        document.querySelector("#hero").style.left = hero.left;
    }
    if (event.keyCode == rightarrow && hero.left <= 1125) {
        hero.left = hero.left + 10;
        document.querySelector("#hero").style.left = hero.left;
    }
    if (event.keyCode == spacebar){
        missiles.push({left:hero.left+20,top:hero.top-20});
        drawMissiles();
        missileLaunch.play();
    }
}
function drawMissiles() {
    document.querySelector("#missiles").innerHTML=``;
    missiles.forEach((missile) => {
        document.querySelector("#missiles").innerHTML += `
        <div class=missile1 style="left:${missile.left}; top:${missile.top}">`;
    });
}
function updateMissilepos(){
    missiles = missiles.map((pos)=>({left:pos.left, top:pos.top-10}));
}
function drawEnemies() {
    document.querySelector("#enemies").innerHTML=``;
    enemies.forEach((enemy) => {
        document.querySelector("#enemies").innerHTML += `
        <div class=enemy style="left:${enemy.left}; top:${enemy.top}">`;
    });
}
function updateEnemypos(){
    enemies = enemies.map((pos)=>({left:pos.left, top:pos.top+0.5}));
}
function checkCollisions(){
    for(let enemy in enemies){
        for(let missile in missiles){
            if(
                missiles[missile].left >= enemies[enemy].left &&
                missiles[missile].left <= enemies[enemy].left +50 &&
                missiles[missile].top >= enemies[enemy].top &&
                missiles[missile].top <= enemies[enemy].top +50
            ){
                enemies.splice(enemy,1);
                missiles.splice(missile,1);
            }
            
        }
    }
}
function gamewin(){
    if(enemies.length===0){
        victory.play();
        const container =document.querySelector("#background");
        const result = document.createElement("div");
        result.className="result";
        result.innerText="🏆You win🏆";
        container.append(result);
        clearInterval(game);
        stopmove();
    }
}
function stopmove(){
    document.onkeydown = function movHero(event) {
        return false
    }
}
function gameover(){
    for(let enemy in enemies){
        if(enemies[enemy].top===hero.top){
            position = hero.top; 
        }
    }
    console.log(position)
    if(position===hero.top){
        over.play();
        const container =document.querySelector("#background");
        const result = document.createElement("div");
        result.className="result";
        result.innerText="Game Over";
        container.append(result);
        clearInterval(game);
        stopmove();
    } 
}
let game =setInterval(()=>{
    checkCollisions();
    updateEnemypos();
    drawEnemies();
    updateMissilepos();
    drawMissiles();
    gamewin();
    gameover();
},1000/60);
