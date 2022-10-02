var matrix = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var score = 0;
addTile();
addTile();
update();

function update(){
var i;
var j;
for(i = 0; i < 4; i++){
    for(j = 0; j < 4; j++){
        var x = getField("MATRIX." + i + "." + j);
        x.value = matrix[i][j];
        x.fillColor = getFillColor(x.value);
        if(x.value == 0){
        x.value = "";
        }
     

    }
}
y = getField('Score');
y.value = "Score: " + score;
}


function getFillColor(val){
if(val == 0){
return ["RGB", 0.8, 0.75, 0.70];}
if(val == 2){
return ["RGB", 0.93, 0.89, 0.85];}
if(val == 4){
return ["RGB", 0.93, 0.88, 0.79];
}
if(val == 8){
return ["RGB", 0.95, 0.70, 0.48];
}
if(val == 16){
return ["RGB", 0.96, 0.59, 0.39];
}
if(val == 32){
return ["RGB", 0.96, 0.48, 0.37];
}
if(val == 64){
return ["RGB", 0.96, 0.39, 0.23];
}
if(val == 128){
return ["RGB", 0.93, 0.81, 0.45];
}
if(val == 256){
return ["RGB", 0.93, 0.80, 0.38];
}
if(val == 512){
return ["RGB", 0.93, 0.79, 0.31];
}
if(val == 1024){
return ["RGB", 0.93, 0.77, 0.25];
}
if(val == 2048){
return ["RGB", 0.93, 0.76, 0.18];
}
var k = (-11 + Math.log(val)/Math.log(2))/100;
return ["RGB", 0.93, 0.76 - k, 0.18 - 3*k];

}






function addTile() {
if(cellsFull()){
return;
}

var row = Math.floor(Math.random()*4);
var col = Math.floor(Math.random()*4);
var isFour = Math.floor(Math.random()*10) == 9;
var val = isFour ? 4 : 2;
while(matrix[row][col] != 0){
    var row = Math.floor(Math.random()*4);
    var col = Math.floor(Math.random()*4);
}
matrix[row][col] = val;

update();
}


function isGameOver(){
if(cellsFull()){
    var matrixCopy = createMatrixCopy(matrix);
    var dictX = {"up": [0,1,2,3],"left": [3,3,3,3], "right": [0,0,0,0], "down":[0,1,2,3]};
    var dictY = {"up": [3,3,3,3],"left": [0,1,2,3], "right": [0,1,2,3], "down":[0,0,0,0]};
    var dirs = ["up", "down", "left", "right"];
    combinesDone = [];
    var i;
    var j;
    for(i = 0; i < 4; i++){
      for(j=0; j < 4; j++){
        moveCell(dirs[i], dictX[dirs[i]][j], dictY[dirs[i]][j]);
}
}

    if(matrix.toString() == matrixCopy.toString()){
    return true;
}
matrix = matrixCopy;
}
return false;
}



function move(dir){
if(isGameOver()){
app.alert("Game Over! Your score was: " + score);
return;
}
var dictX = {"up": [0,1,2,3],"left": [3,3,3,3], "right": [0,0,0,0], "down":[0,1,2,3]};
var dictY = {"up": [3,3,3,3],"left": [0,1,2,3], "right": [0,1,2,3], "down":[0,0,0,0]};
combinesDone = [];
var stringMatrix = matrix.toString();
var i;
for(i = 0; i < 4; i++){
    moveCell(dir, dictX[dir][i], dictY[dir][i]);
}
if(stringMatrix != matrix.toString()){
    addTile();
}
}


function moveCell(dir, x, y){
var dict = {"up": [0, -1], "left": [-1, 0], "right": [1, 0], "down": [0, 1]};
if(x + dict[dir][0] < 0 || x + dict[dir][0] > 3 || y + dict[dir][1] < 0 || y + dict[dir][1] > 3){
    return;
}
moveCell(dir, (x + dict[dir][0]), (y + dict[dir][1]));
if(matrix[y][x] == 0){
    return;
}
if(matrix[y + dict[dir][1]][x + dict[dir][0]] == 0){
    matrix[y + dict[dir][1]][x + dict[dir][0]] = matrix[y][x];
    matrix[y][x] = 0;
    moveCell(dir, (x + dict[dir][0]), (y + dict[dir][1]));
    return;
}

if(matrix[y + dict[dir][1]][x + dict[dir][0]] == matrix[y][x] && matrix[y][x] != undefined){
    var i;
    for(i = 0; i < combinesDone.length; i++){
    var combineX = combinesDone[i][0];
    var combineY = combinesDone[i][1];
    if((y + dict[dir][1] == combineY && x + dict[dir][0] == combineX) || (y == combineY && x == combineX)){
    return;
}
}
    matrix[y + dict[dir][1]][x + dict[dir][0]] = 2*matrix[y][x];
    score += 2*matrix[y][x];
    matrix[y][x] = 0;
    combinesDone.push([x + dict[dir][0], y + dict[dir][1]]);
    console.println(combinesDone);

}
}

function createMatrixCopy(matrix){
var i;
var copyMatrix = [];
for(i = 0; i < 4; i++){
 copyMatrix.push(matrix[i].slice());
}
return copyMatrix;
}


function cellsFull(){
var i;
var j;
var prod = 1;
for(i = 0; i < 4; i++){
    for(j = 0; j < 4; j++){
        prod *= matrix[i][j];


    }
}
if(prod != 0){
return true;
}
return false;

}