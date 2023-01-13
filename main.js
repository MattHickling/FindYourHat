const prompt = require("prompt-sync")({ sigint: true });
const readline = require("readline");
const blank = "\n".repeat(process.stdout.rows);

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const gamePlay = true;

class Field {
  constructor(field) {
    this.field = field;
    this.success = false;
    this.x = 0;
    this.y = 0; 
  }

  static newField(h, w, p) {
    const fieldCount = Array.from(Array(h), () => new Array(w));
    const totalHoles = Math.ceil(h * w * (p / 100));

    //Set field size
    for (let i = 0; i < fieldCount.length; i++) {
      for (let j = 0; j < fieldCount[i].length; j++) {
        fieldCount[i][j] = fieldCharacter;
      }}
 
    do {
      let xArray = Math.floor(Math.random() * fieldCount.length);
      let yArray = Math.floor(Math.random() * fieldCount[0].length);
      
      if (xArray || yArray) {
        fieldCount[xArray][yArray] = hole;
      } 
    } while (
      fieldCount.flat().filter((element) => element === hole).length < totalHoles
    );

   //Add hat to initial position
    let noPass = true;
    while (noPass) {
      let xArray2 = Math.floor(Math.random() * fieldCount.length);
      let yArray2 = Math.floor(Math.random() * fieldCount[0].length);
      
      
      if (fieldCount[xArray2][yArray2] === fieldCharacter) {
        fieldCount[xArray2][yArray2] = hat;
        noPass = false;
      }
    }
    return fieldCount;
  }
  static clear() {
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
  }
  print() {
    Field.clear();
    this.field.forEach((element) => {
      console.log(...element);
    });
  }
  reDrawFeld(x, y) {
    this.field[x][y] = pathCharacter;
    this.print();
  }
  warningOutOfBound() {
    console.log("Your going the wrong way!....Game Over");
    this.success = true;
  }
  gameWin() {
    console.log("You're good.....well done");
    this.success = true;
  }
  findHole() {
    console.log("Oh dear, you fell down a hole");
    this.success = true;
  }
  newUserStep(input) {
    switch (input) {
      case "d":
        if (this.x + 1 < this.field.length) {
          this.x++;
          switch (this.field[this.x][this.y]) {
            case hat:
              this.gameWin();
              break;
            case hole:
              this.findHole();
              break;
            case fieldCharacter:
              this.reDrawFeld(this.x, this.y);
              break;
            case pathCharacter:
              this.reDrawFeld(this.x, this.y);
              break;
          }
        } else {
          this.warningOutOfBound();
          return this.success;
        }

        break;
      case "u":
        if (this.x - 1 >= 0) {
          this.x--;
          switch (this.field[this.x][this.y]) {
            case hat:
              this.gameWin();
              break;
            case hole:
              this.findHole();
              break;
            case fieldCharacter:
              this.reDrawFeld(this.x, this.y);
              break;
            case pathCharacter:
              this.reDrawFeld(this.x, this.y);
              break;
          }
        } else {
          this.warningOutOfBound();
        }
        break;
      case "l":
        if (this.y - 1 >= 0) {
          this.y--;
          switch (this.field[this.x][this.y]) {
            case hat:
              this.gameWin();
              break;
            case hole:
              this.findHole();
              break;
            case fieldCharacter:
              this.reDrawFeld(this.x, this.y);
              break;
            case pathCharacter:
              this.reDrawFeld(this.x, this.y);
              break;
          }
        } else {
          this.warningOutOfBound();
        }
        break;
      case "r":
        if (this.y + 1 < this.field[0].length) {
          this.y++;
          switch (this.field[this.x][this.y]) {
            case hat:
              this.gameWin();
              break;
            case hole:
              this.findHole();
              break;
            case fieldCharacter:
              this.reDrawFeld(this.x, this.y);
              break;
            case pathCharacter:
              pathCharacter.fontcolor("red");
              this.reDrawFeld(this.x, this.y);
              break;
          }
        } else {
          this.warningOutOfBound();
        }
        break;
      default:
        console.log("You can go to 'l' 'r' 'u' 'd' only...");
    }
  }
  userQuestion() { 
    let noPass = true;
    while (noPass) {
      let xArray2 = Math.floor(Math.random() * this.field.length);
      let yArray2 = Math.floor(Math.random() * this.field[0].length);
      if (this.field[xArray2][yArray2] === fieldCharacter) {
        this.field[xArray2][yArray2] = pathCharacter;
        this.x = xArray2;
        this.y = yArray2;
        noPass = false;
      }
    }  
    this.print();
    
    while (!this.success) {
      const userInput = prompt("Which way (d/u/r/l)? ");
      this.newUserStep(userInput);
    }
  }
}


const myField = new Field(Field.newField(15, 15, 15));
myField.userQuestion();