var players = { // Detalles de cada player
	left: {

	},
	right: {

	}
}; 

players.left.vel=players.right.vel=0; //Inicializacion de la velocidad de cada player
var bounces = []; //Array de pelotas
var directionCollision = [true, false]; //Direccion de Y cuando hay una colision
var distPlayers = 26;

class Ball {
	constructor(posX, posY, diameter, color, speedX, speedY, dirX, dirY){
		this.x = posX; //Posicion X
		this.y = posY; //Posicion Y
		this.d = diameter; //Diametro
		this.r = diameter/2; //Radio
		this.color = color; //Color
		this.bounceSpeedX = speedX; //Velocidad en X
		this.bounceSpeedY = speedY; //Velocidad en Y
		this.directionX = dirX; //Direccion en X
		this.directionY = dirY; //Direccion en Y
	}

	init(){
		
		if(this.x + this.r >= width || this.x <= this.r){ //Comprueba permanencia en rango de X y el contato con un player
			this.lateralCrash();
		}

		if(this.x - this.r <= players.left.x && this.y + this.r >= players.left.y1 && this.y - this.r <= players.left.y2){
			this.lateralCrash();
		}

		if(this.y >= height - this.r || this.y <= this.r){ //Comprueba permanencia en rango de Y
			this.directionY *= -1; //Si toca una frontera superior cambia direcion en Y
		}

		this.creation(); //LLama a funcion de creacion de pelota

		this.x = this.x + this.bounceSpeedX * this.directionX; //Valor en X actual
		this.y = this.y + this.bounceSpeedY * this.directionY; //Valor en Y actual
	}

	randomMovement(randomSpeed, randomDirection){ //Define el angulo nuevo poc cada colision
		this.bounceSpeedY = randomSpeed; //Cambia el valor de velocidad

		if(randomDirection == true){ //SI hay cambio de direccion
			this.directionY *= -1; //Cambia de direccon
		}
	}

	creation(){ //Dibuja las pelotas
		noStroke(); //No dibuja borde
		fill(this.color);
		ellipse(this.x, this.y, this.d, this.d); //DIbuja la pelota
	}

	lateralCrash(){
		var randomSpeed = Math.floor(random(0, 28)); //Valor velocidad en Y
		var randomDirection = random(directionCollision); //Valor de la direccion en Y

		this.directionX *= -1; //Si toca una frontera cambia direcion en X
		this.randomMovement(randomSpeed, randomDirection); //devuelve valores aleatorios para Y
		//console.log(randomSpeed);
	}
}

function setup() { //Solo una vez
	createCanvas(windowWidth, windowHeight-4);

	//Atributos del canvas
	wallUpDown = (windowHeight-4)/50; //Limite superior

	// .-.-.-.- Atributos generales de los jugadores -.-.-.-.-.
	players.size = windowHeight/6; //* Tamaño jugadores 
	players.width = windowHeight/45; //* Grosor jugadores
	players.left.start=players.right.start= (windowHeight/2)-(players.size/2); //* Position "Y" 2 players

	players.left.x = windowWidth/35; //* Position "X" P1
	players.right.x = players.left.x*34; //* Position "X" P2"

	// ----------------------
	bounces.push(new Ball(50, 150, 40, "white", 10, 10, 1, 1)); //(x, y, diam, color, velX, velY, dirX, dirY)
	bounces.push(new Ball(600, 300, 40, "red", 10, 10, -1, -1));
}

function draw() { //Cambios constantes
	background("#373737"); //Fondo

	//========== ATRIBUTOS PLAYER 1 =============

	
	players.left.y1 = players.left.start+players.left.vel; //* Position "Y" P1
	players.left.y2 = players.left.y1+players.size; //*

	//========== ATRIBUTOS PLAYER 2 =============

	
	players.right.y1 = players.right.start+players.right.vel; //* Position "Y" P2
	players.right.y2 = players.right.y1+players.size; //*

	// ==========================================
	
	//*-*-*-*-*-* Controls P1 *-*-*-*-*-*

	if(keyIsDown(87)){ // "W"
		players.left.vel -= distPlayers;
	} else if(keyIsDown(83)){ // "S"
		players.left.vel += distPlayers;
	}

	//*-*-*-*-*-* Controls P2 *-*-*-*-*-*

	if(keyIsDown(UP_ARROW)){
		players.right.vel -= distPlayers;
	} else if(keyIsDown(DOWN_ARROW)){
		players.right.vel += distPlayers;
	}
	
	// --------- DIBUJADO -----------

	// ========= JUGADORES ===========
	stroke("white");
	strokeWeight(players.width);
	line(players.left.x, players.left.y1, players.left.x, players.left.y2);
	line(players.right.x, players.right.y1, players.right.x, players.right.y2);
	
	//Crea las pelotas

	for(b of bounces){
		b.init();
	}

}

//Ahora funciona con Github