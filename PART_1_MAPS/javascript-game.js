//PART 3
//Tree
var pixel_tree = new Image();
pixel_tree.src = "./tree_pics/tree.png";

var pixel_treetop = new Image();
pixel_treetop.src = "./tree_pics/treetop.png";

var pixel_treeleft = new Image();
pixel_treeleft.src = "./tree_pics/treeleft.png";

var pixel_treelefttop = new Image();
pixel_treelefttop.src = "./tree_pics/treelefttop.png";

var pixel_treelefttop = new Image();
pixel_treelefttop.src = "./tree_pics/treelefttop.png";

var pixel_treerighttop = new Image();
pixel_treerighttop.src = "./tree_pics/treerighttop.png";

var pixel_treeright = new Image();
pixel_treeright.src = "./tree_pics/treeright.png";

var pixel_trunk = new Image();
pixel_trunk.src = "./tree_pics/trunk.png";
	
	
//PART 2
class Point {
	
  constructor(access, type, action, name, item) {
	this.access = access;
	this.type = type;
	this.action = action;
	this.name = name;
	this.item = item;

  }
}



let grass = new Point(1,1,'none','grass','none');
let water = new Point(0,0,'none','water','none');

//Tree Points
let trunk = new Point(0,0,'trunk','trunk','none');
let treetop = new Point(0,0,'treetop','treetop','none');
let treelefttop = new Point(0,0,'treelefttop','treelefttop','none');
let treerighttop = new Point(0,0,'treerighttop','treerighttop','none');
let treeright = new Point(0,0,'treeright','treeright','none');
let treeleft = new Point(0,0,'treeleft','treeleft','none');
let tree = new Point(0,0,'tree','tree','none');
   
let arr_i = [];
let arr_n = [];

//MAP OPTIONS | Making a Matrix 
let map1 = [];
for (var i = 0; i < 30; i++) { 
map1[i] = [grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass];
}

let map2 = [];
let map2_temp = [];
for (var i = 0; i < 30; i++) { 
for (var j = 0; j < 30; j++) {
	map2_temp[j] = grass;
}
	map2[i] = map2_temp;
}

var xtree = 12;
var ytree = 18;

map1[xtree][ytree] = treelefttop;map1[xtree][1+ytree] = treetop;map1[xtree][2+ytree] = treerighttop;
map1[1+xtree][ytree] = treeleft;map1[1+xtree][1+ytree] = tree;map1[1+xtree][2+ytree] = treeright;
map1[2+xtree][ytree] = treeleft;map1[2+xtree][1+ytree] = tree;map1[2+xtree][2+ytree] = treeright;
						map1[3+xtree][1+ytree] = trunk;

//VARIABLES FOR MAP POSITIONS
//USER INTERFACE ADJUSTMENTS
const Y_GAP = 25;
var X_Gap = 0;
const Y_TILES = 30;
const X_TILES = 40;
const TILE_SIZE = 25;
const CHARACTER_SIZE = 50;


//var num_of_players = 0;

//Movement
var lastDownTarget, canvas;
//var x_mov = 1, y_mov = 1;



function green_block(ctx, x, y) {
	ctx.fillStyle = 'green';
	ctx.fillRect(0+x*TILE_SIZE, Y_GAP+y*TILE_SIZE, TILE_SIZE, TILE_SIZE); //x,y position and then size
}

function blue_block(ctx, x, y) {
	ctx.fillStyle = 'blue';
	ctx.fillRect(0+x*TILE_SIZE, Y_GAP+y*TILE_SIZE, TILE_SIZE, TILE_SIZE); //x,y position and then size
}

function build_map(ctx, map_) {
	//ctx.drawImage(worldmap.image, 0, Y_GAP, X_TILES*TILE_SIZE, Y_TILES*TILE_SIZE);

	for(let i = 0; i < 30; i++) {
		for(let j = 0; j < 40; j++) {
		
			if(map_[i][j].name == "water") {
				blue_block(ctx, j, i);
			}
			else if(map_[i][j].name == "grass") {
				green_block(ctx, j, i);
				//ctx.drawImage(pixel_grass, 0+j*TILE_SIZE, Y_GAP+i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
			}				
			else if(map_[i][j].name == "trunk") {
				green_block(ctx, j, i);
				ctx.drawImage(pixel_trunk, 0+j*TILE_SIZE, Y_GAP+i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
			}
			else if(map_[i][j].name == "treeright") {
				green_block(ctx, j, i);
				ctx.drawImage(pixel_treeright, 0+j*TILE_SIZE, Y_GAP+i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
			}
			else if(map_[i][j].name == "treerighttop") {
				green_block(ctx, j, i);
				ctx.drawImage(pixel_treerighttop, 0+j*TILE_SIZE, Y_GAP+i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
			}
			else if(map_[i][j].name == "treeleft") {
				green_block(ctx, j, i);
				ctx.drawImage(pixel_treeleft, 0+j*TILE_SIZE, Y_GAP+i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
			}
			else if(map_[i][j].name == "treelefttop") {
				green_block(ctx, j, i);
				ctx.drawImage(pixel_treelefttop, 0+j*TILE_SIZE, Y_GAP+i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
			}
			else if(map_[i][j].name == "treetop") {
				green_block(ctx, j, i);
				ctx.drawImage(pixel_treetop, 0+j*TILE_SIZE, Y_GAP+i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
			}
			else if(map_[i][j].name == "tree") {
				green_block(ctx, j, i);
				ctx.drawImage(pixel_tree, 0+j*TILE_SIZE, Y_GAP+i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
			}
			
		}
	}
}


//PART 1
window.onload = function() {
	
	const canvas = document.querySelector('.myCanvas');
	var width = canvas.width = window.innerWidth;
	var height = canvas.height = window.innerHeight;
	
	const ctx = canvas.getContext('2d');
			
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(0, 0, width, height);
	
	//SET THE STAGE
	build_map(ctx, map1);
	
}