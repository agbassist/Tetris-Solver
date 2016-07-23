var tetrisGame = {};
tetrisGame.currentState = [];
tetrisGame.shapes = [];

tetrisGame.initialized = false;

tetrisGame.bigShape = [];

//IwZgrAHGDsAsAMx4mAJmcWBOMA2MqIuhuEIKSECIyEuoE8YIW6uxqYsasqqoWGomZIwrUENghYuEBGBZg0VFPDpFuJn1DAyreMTywy0TWDDAjIdNAUGF3eNEj4siYEk0I+eUOi7AuLzk2GRospa4iuD40oyoxG6E0HDm/JhcTuCYiPyMpoKkVFhFvEz4wEA=
//the above seed clears 47 lines

function Shape(position,type){

      this.position = position;
      this.type = type;
      this.coordinates = [];
      this.check = [];
      this.canMove = true;
      this.adjusted = false;

      switch(type){

            case 0: //each of these stores relative coordinates for each shape and rotation
                  this.position = position - 10;
                  this.coordinates = [[10,11,12,13],[1,11,21,31],[20,21,22,23],[2,12,22,32]];
                  this.check = [[20,21,22,23],[41],[30,31,32,33],[42]]; //this is used so the program knows which coordinates to check
                  break;

            case 1:
                  this.coordinates = [[10,11,12,21],[1,11,21,12],[10,11,12,1],[10,1,11,21]];
                  this.check = [[20,31,22],[31,22],[20,21,22],[20,31]];
                  break;

            case 2:

                  this.coordinates = [[0,1,11,12],[11,21,12,2],[11,10,21,22],[11,10,20,1]];
                  this.check = [[10,21,22],[31,22],[20,31,32],[30,21]];
                  break;

            case 3:

                  this.coordinates = [   [1,2,10,11],[1,11,12,22],[20,21,11,12],[0,10,11,21]  ];
                  this.check = [   [20,21,12],[21,32],[30,31,22],[20,31]  ];
                  break;

            case 4:
                  this.coordinates = [[0,1,10,11]];
                  this.check = [[20,21]];
                  break;

            case 5:
                  this.coordinates = [   [0,10,11,12],[1,2,11,21],[10,11,12,22],[20,21,11,1]  ];
                  this.check = [   [20,21,22],[31,12],[20,21,32],[30,31]  ];
                  break;

            case 6:
                  this.position = position - 10;
                  this.coordinates = [   [10,11,12,20],[1,11,21,22],[10,11,12,2],[0,1,11,21]  ];
                  this.check = [   [30,21,22],[31,32],[20,21,22],[10,31]  ];
                  break;

      }

      this.rotate = function(){

            this.coordinates.push(this.coordinates.shift()); //rotate the actual array, since increment time only looks at the first element
            this.check.push(this.check.shift());
      }

}

tetrisGame.AddShape = function(shapeType, position, id){
	if(!this.initialized){this.Initialize();}
      if(!this.gameOver){this.shapes.push(new Shape(position,shapeType));}

}

tetrisGame.DrawShape = function(shape1,gameArray){
	if(!this.initialized){this.Initialize();}

      for(var i = 0; i < shape1.coordinates[0].length; i++){

            gameArray[ shape1.position + shape1.coordinates[0][i] ] = shape1.type;
      }



}

tetrisGame.IncrementTime = function(){
	if(!this.initialized){this.Initialize();}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /* I used this to create my own shapes, then I realized this process is provided
      alert(this.bigShape);

      if(this.shapes.length == 0 || (this.shapes[0].canMove == false)){

            var shapeType = Math.floor((Math.random() * 7));

            var startingPosition = 0;

            if(shapeType == 0){ //4 wide shapes

                  startingPosition = Math.floor((Math.random() * 7));
            }
            else if(shapeType == 4){ //2 wide shapes

                  startingPosition = Math.floor((Math.random() * 9));
            }
            else{ //3 wide shapes

                  startingPosition = Math.floor((Math.random() * 8));
            }

            this.shapes.unshift(new Shape(startingPosition,shapeType));


      }

      */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      for(var i = 0; i <this.shapes.length; i++){

            for(var q = 0; q < this.shapes[i].check[0].length; q++){ //for every coordinate in the first array

                  var positionToCheck = this.shapes[i].check[0][q] + this.shapes[i].position; //figure out which positions to check
                  if(positionToCheck > 199 || this.currentState[positionToCheck] != -1){ //if the checked spots are not empty or at the bottom, don't let the shape move

                        this.shapes[i].canMove = false;

                  }

            }

            if(this.shapes[i].canMove == true){ //move it down if it can move, adjust it if it hasn't been adjusted

                  this.shapes[i].position += 10;

                  if(!this.shapes[i].adjusted){

                        this.adjustShape(this.shapes[i]);
                  }

            }
            else{ //if the shape can no longer move, add it to the "big shape" and delete the shape from the array
                  for(var j = 0; j < this.shapes[i].coordinates[0].length; j++){

                        this.bigShape[ this.shapes[i].position + this.shapes[i].coordinates[0][j] ] = this.shapes[i].type;
                  }

                  this.shapes.splice(i,1);
            }




      }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // This section will be used to check if each row is full
      for(var row = 19; row >= 2; row = row - 1){

            for(var column = 0; column < 10; column++){

                  if(this.bigShape[(10*row) + column] == -1){ break;}
                  else if(column == 9){ //this executes if an entire row is full

                        for(var a = 0; a < 10;a++){

                              this.bigShape[(10 * row) + a] = -1;
                        }



                        for(var i = 10*(row-1) + 9; i >= 0 ; i = i - 1){
                              this.bigShape[i + 10] = this.bigShape[i];
                        }


                        this.pointTotal += 1;
                  }

            }
      }


      //checks if the top two rows have any blocks in them, if so it causes the game to stop
      for(var row = 1; row >= 0; row = row - 1){
            for(var column = 0; column < 10; column++){
                  if(this.bigShape[(10*row) + column] != -1){
                        this.gameOver = true;
                        alert("GAME OVER!\n" + "TOTAL POINTS: " + this.pointTotal);
                        break;
                  }
            }
      }

}//end of increment time

tetrisGame.GetCurrentState = function(){

	if(!this.initialized){this.Initialize();}


      this.currentState = [];


      this.currentState = this.bigShape.slice(); //copies the big shape to the current shape

      for(var i = 0; i < this.shapes.length; i++){
		this.DrawShape(this.shapes[i],this.currentState);
	}

	return this.currentState;
}


/* Method that is not used
tetrisGame.checkHeight = function(){

      for(var row = 0; row < 20; row = row + 1){

            for(var column = 0; column < 10; column = column + 1){

                  if(this.bigShape[row*10 + column] != -1){ //if there is a nonempty spot, move to the next row
                        break;
                  }
                  else if(column == 9){ //if all spots are empty return the row number
                        return row;
                  }
            }

      }
}
*/

function heightOfPosition(x){ //used to check the height of a position

      return(x / 10 - ((x % 10 )/ 10));

}

function scoreOfPosition(shape){

      var score = 0;


      var multiplier = 3; //a block in one row is worth 3 times as much as a block in the row above
      /*
      switch(shape.type){

            case 5: case 6:
                  multiplier = 4;
                  break;
      }
      */

      for(var q = 0; q < shape.coordinates[0].length; q++){

            score = score + Math.pow(multiplier,heightOfPosition(shape.coordinates[0][q]) + heightOfPosition(shape.position)); //used to calculate the score
            //score = score + heightOfPosition(shape.coordinates[orientation][q]) + heightOfPosition(shape.position);
            //score = score + shape.coordinates[orientation][q] + shape.position;
      }

      return score;

}


tetrisGame.possibleStartsBasedOnType = [ [0,-1,0,-2], [0,-1,0,0], [0,-1,0,0], [0,-1,0,0], [0], [0,-1,0,0], [0,-1,0,0] ]; //used to store how many spots each shape takes up based on
tetrisGame.widthsOfEachType = [ [4,1,4,1],[3,2,3,2],[3,2,3,2],[3,2,3,2],[2],[3,2,3,2],[3,2,3,2]  ]; //stores the width of the shape based on orientation


//Second try of adjustShape
tetrisGame.adjustShape = function(shape){

      var bestPosition = shape.position; //number that indicates the best position

      var bestScore = 0;
      var bestOrientation = 0;

      var copyOfShape = new Shape(shape.position,shape.type);


      for(var orientation = 0; orientation < copyOfShape.coordinates.length; orientation++){

            var start = this.possibleStartsBasedOnType[copyOfShape.type][orientation]; //calculate the start and end based on the 2 monstrous arrays above
            var end =   (10 - this.widthsOfEachType[copyOfShape.type][orientation]) + this.possibleStartsBasedOnType[copyOfShape.type][orientation];

            for(var position = start; position <= end; position ++){

                  var copyOfGame = this.bigShape.slice(); //copies the current bigShape

                  copyOfShape.position = position;

                  copyOfShape.canMove = true;

                  while(copyOfShape.canMove == true){ //the shape can still move downwards

                        for(var q = 0; q < copyOfShape.check[0].length; q++){
                              var positionToCheck = copyOfShape.check[0][q] + copyOfShape.position;
                              if(positionToCheck > 199 || copyOfGame[positionToCheck] != -1){

                                    copyOfShape.canMove = false;

                              }
                        }
                        if(copyOfShape.canMove){copyOfShape.position += 10;} //move the shape down 1, if included to safeguard from an extra movement

                  }

                  var score1 = scoreOfPosition(copyOfShape);
                  if(score1 > bestScore){ //if the position of the shape is better

                        bestPosition = copyOfShape.position; //choose this position
                        bestOrientation = orientation; //choose this orientation
                        bestScore = score1;
                  }

            }

            copyOfShape.rotate();
      }

      //At this point, the best position and orientation have been found

      shape.position = shape.position + ((bestPosition % 10) - shape.position); //adjusts the shape

      for(var i = 0; i < bestOrientation; i++){ //rotates the shape
            shape.rotate();
      }

      shape.adjusted = true;

      //alert(bestPosition + " " + bestOrientation);


}



tetrisGame.IsShapeFalling = function(){

	if(!this.initialized){this.Initialize();}


      return(this.shapes.length != 0 ); //if the shapes array is not empty, return true


}

tetrisGame.Initialize = function(){

	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 20; j++){
			this.currentState.push(-1);
		}
	}

      for(var i = 0; i < 10; i++){
		for(var j = 0; j < 20; j++){
			this.bigShape.push(-1);
		}
	}

/*
    //TEST SETUP
      for(var i = 0; i < 200; i++){

            if(i>=150 && i<160 &&i%2 == 0){
                  this.bigShape[i] = 0;
            }
            else if(i>=160 && i<170 &&i%2 != 0){
                  this.bigShape[i] = 0;
            }
            else if(i>= 170){
                  this.bigShape[i] = 0;
            }
            else{
                  this.bigShape[i] = -1;
            }
	}
*/

      this.pointTotal = 0;
      this.gameOver = false;
      this.initialized = true;

}



