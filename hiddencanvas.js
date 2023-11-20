// Text rendering place
let maindiv = document.getElementById('maindiv').innerHTML;

let duckFrame = document.getElementsByClassName('duckFrame')[0].innerHTML;

// console.log(maindiv)
console.log(duckFrame)

// // top left corner of the animation
// let tlRow = 11-11
// let tlCol = 23-11
let tlRow = 3
let tlCol = 2

// // bottom right corner of the animation
let brRow = 17
let brCol = 38

let tWidth =  brCol-tlCol;
let tHeight = brRow-tlRow;

// Convert a row/column position to a character position in a string
function findIndex(inString, row, column) {
    let rows = inString.split(/\r?\n/)
    // console.log(rows)
    let totalChars = 0

    if(rows.length < row) console.error("row out of bounds");

    // add up all the characters in rows less than the one
    for(let r = 0; r < row-1; r++) {
        totalChars += rows[r].length + 1;
    }

    return totalChars + column;     
}


// snipe characters so we can update the string
function replaceChar(origString, replaceChar, row, column) {
    let index = findIndex(origString, row, column)

    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);
      
    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

// convert brightness value into ascii character
function toAsciiChar(brightness) {
  let chars = " .::=+i#%&@";
  let index = Math.round(brightness/255*(chars.length-1))
  return chars[index]
}


// duck model "Cartoony Rubber Ducky" by Xabier Garcia on sketchfab 
// https://sketchfab.com/3d-models/cartoony-rubber-ducky-8a6e661916b74f9caa1c20dd6fdf77ad


let w = 400;
let h = 400;

var hcanv;

function preload() {
  duck = loadModel('assets/duck.obj');
}

function setup() {
    pixelDensity(1)
    // createCanvas(w, h, WEBGL);
    hcanv = createCanvas(w, h, WEBGL);
    hcanv.position(795, 340);
}

function draw() {
      // make a background
      background(0, 0, 0, 50)
      hcanv.background(0, 0, 0, 0)

      // set up the duck
      let locX = mouseX - width / 2;
      let locY = mouseY - height / 2;
      pointLight(255, 255, 255, locX, locY, 250);


      // set up the duck
      scale(27.0);
      translate(0, 4.3, 0);
      specularMaterial(255);
      ambientLight(25);
      noStroke();
      shininess(30);
      rotateX(59.25);
      rotateY(frameCount * 0.018);
      model(duck);

      // convert it to a jpg
      img = createImage(w, h);

      loadPixels();
      pcopy = [...pixels]
      // console.log(pcopy)

      // make the image invisible
      for (let x = 0; x < w; x += 1) {
        for (let y = 0; y < h; y += 1) {
            pixels[(y*h + x)*4+3] = 0
        }
      }
      updatePixels();

      img.loadPixels();
      for (let x = 0; x < w; x += 1) {
        for (let y = 0; y < h; y += 1) {
          img.set(x, y, pcopy[(y*h + x)*4]);
          // img.set(x, y, 250);
        }
      }
      img.updatePixels();
      img.resize(tWidth, tHeight); 

      img.updatePixels();

      for(var x=tlRow;x<brRow;x++){
        for(var y=tlCol;y<brCol;y++){
          let i = x-tlRow;
          let j = y-tlCol;

          let the_char = toAsciiChar(img.pixels[(i*tWidth + j)*4])
          duckFrame = replaceChar(duckFrame, the_char, x, y)
        }
      }
      document.getElementsByClassName('duckFrame')[0].innerHTML = duckFrame;
}

