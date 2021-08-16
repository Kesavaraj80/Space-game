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
}
function drawEnemies() {
    document.querySelector("#enemies").innerHTML=``;
    enemies.forEach((enemy) => {
        document.querySelector("#enemies").innerHTML += `
        <div class=enemy style="left:${enemy.left}; top:${enemy.top}">`;
    });
}
function updateEnemypos(){
    enemies = enemies.map((pos)=>({left:pos.left, top:pos.top+0.25}));
}
 function drawMisiles(){
     document.querySelector("#missiles").innerHTML=``;
 }
setInterval(()=>{
    updateEnemypos();
    drawEnemies();
},1000/2);