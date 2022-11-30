var cards = [];
var colors = ["red", "green", "purple"];
var numbers = [1, 2, 3];
var fills = ["solid", "striped", "empty"];
var shapes = ["squiggle", "oval", "diamond"];
var setID = 0;
// var colorMap = `000000000
// 000000000
// 000000000
// 111111111
// 111111111
// 111111111
// 222222222
// 222222222
// 222222222`.split("\n");
// var numberMap = `012012012
// 012012012
// 012012012
// 012012012
// 012012012
// 012012012
// 012012012
// 012012012
// 012012012`.split("\n");
// var fillMap = `000111222
// 000111222
// 000111222
// 000111222
// 000111222
// 000111222
// 000111222
// 000111222
// 000111222`.split("\n");
// var shapeMap = `000000000
// 111111111
// 222222222
// 000000000
// 111111111
// 222222222
// 000000000
// 111111111
// 222222222`.split("\n");
var colorMap = ``.split("\n");
var numberMap = ``.split("\n");
var fillMap = ``.split("\n");
var shapeMap = ``.split("\n");

var cardScale = 0.2;
function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	for (var i = 0; i < colorMap.length; i++) {
		for (var j = 0; j < colorMap[0].length; j++) {
			cards.push(
				new Card(
					j * 490 * cardScale,
					i * 315 * cardScale,
					cardScale,
					colors[parseInt(colorMap[i].charAt(j))],
					numbers[parseInt(numberMap[i].charAt(j))],
					fills[parseInt(fillMap[i].charAt(j))],
					shapes[parseInt(shapeMap[i].charAt(j))]
				)
			);
		}
	}
	// for (var i = 0; i < 9; i++) {
	// 	for (var j = 0; j < 9; j++) {
	// 		cards.push(
	// 			cardFromId(
	// 				i + j * 9,
	// 				i * 490 * cardScale,
	// 				j * 315 * cardScale,
	// 				cardScale
	// 			)
	// 		);
	// 	}
	// }
}
function draw() {
	background(128);
	cards.forEach((x) => {
		x.render();
	});
	cards.forEach((x) => {
		if (
			mouseX > x.x &&
			mouseY > x.y &&
			mouseX < x.x + x.w &&
			mouseY < x.y + x.h
		) {
			var a = x.checkSets(cards);
			strokeWeight(1);
			stroke(0);
			if (a.length > 0) {
				var c1 = cards[a[setID % a.length][0]];
				var c2 = cards[a[setID % a.length][1]];
				line(
					x.x + x.w / 2,
					x.y + x.h / 2,
					c1.x + c1.w / 2,
					c1.y + c1.h / 2
				);
				line(
					x.x + x.w / 2,
					x.y + x.h / 2,
					c2.x + c2.w / 2,
					c2.y + c2.h / 2
				);
				line(
					c1.x + c1.w / 2,
					c1.y + c1.h / 2,
					c2.x + c2.w / 2,
					c2.y + c2.h / 2
				);
				fill(0);
				ellipse(x.x + x.w / 2, x.y + x.h / 2, 10, 10);
				ellipse(c1.x + c1.w / 2, c1.y + c1.h / 2, 10, 10);
				ellipse(c2.x + c2.w / 2, c2.y + c2.h / 2, 10, 10);
			}
			// var a = x.checkSets(cards);
			// for(var i = 0; i < a.length; i++){
			//     var c1 = cards[a[i][0]];
			//     var c2 = cards[a[i][1]];
			//     line(x.x+x.w/2, x.y+x.h/2, c1.x+c1.w/2, c1.y+c1.h/2);
			//     line(x.x+x.w/2, x.y+x.h/2, c2.x+c2.w/2, c2.y+c2.h/2);
			//     line(c1.x+c1.w/2, c1.y+c1.h/2, c2.x+c2.w/2, c2.y+c2.h/2);
			//     fill(0);
			//     ellipse(x.x+x.w/2, x.y+x.h/2, 10, 10);
			//     ellipse(c1.x+c1.w/2, c1.y+c1.h/2, 10, 10);
			//     ellipse(c2.x+c2.w/2, c2.y+c2.h/2, 10, 10);
			// }
		}
	});
}
mouseClicked = function () {
	setID++;
};
keyPressed = function () {
	cards.push(
		new Card(
			mouseX,
			mouseY,
			cardScale,
			colors[parseInt(prompt("Enter a color\n(0=red,1=green,2=blue)"))],
			numbers[parseInt(prompt("Enter a number\n(1,2,3)")) - 1],
			fills[
				parseInt(prompt("Enter a fill\n(0=solid,1=stripes,2=empty)"))
			],
			shapes[
				parseInt(prompt("Enter a shape\n(0=squiggle,1=oval,2=diamond)"))
			]
		)
	);
};
function squiggle(x, y, w, h) {
	beginShape();
	curveVertex(x, y);
	curveVertex(x + w * 0.4, y - h * 0.5);
	curveVertex(x - w * 0.6, y - h * 0.6);
	curveVertex(x - w * 0.25, y - h * 0.25);
	curveVertex(x - w * 0.4, y + h * 0.5);
	curveVertex(x + w * 0.6, y + h * 0.6);
	curveVertex(x + w * 0.25, y + h * 0.25);
	curveVertex(x + w * 0.4, y - h * 0.5);
	curveVertex(x - w * 0.6, y - h * 0.6);
	endShape();
}
function oval(x, y, w, h) {
	rect(x - w / 2, y - h / 2, w, h, w / 2);
}
function diamond(x, y, w, h) {
	beginShape();
	vertex(x, y - h / 2);
	vertex(x - w / 2, y);
	vertex(x, y + h / 2);
	vertex(x + w / 2, y);
	vertex(x, y - h / 2);
	endShape();
}
class Card {
	constructor(x, y, s, color, number, fill, shape, id) {
		this.x = x;
		this.y = y;
		this.w = s * 490;
		this.h = s * 315;
		this.col = color;
		this.num = number;
		this.fill = fill;
		this.shape = shape;
		this.id = id;
	}
	render() {
		//Card
		fill(255);
		noStroke();
		rect(this.x, this.y, this.w, this.h, (this.w + this.h) / 50);
		//Color
		if (this.col === "red") {
			fill(255, 0, 0);
			stroke(255, 0, 0);
		} else if (this.col === "green") {
			fill(0, 192, 0);
			stroke(0, 192, 0);
		} else if (this.col === "purple") {
			fill(128, 0, 128);
			stroke(128, 0, 128);
		}
		//Fill
		if (this.fill === "empty") {
			noFill();
		}
		strokeWeight(1);
		//Number
		if (this.num === 1) {
			//Fill
			if (this.fill === "striped") {
				noFill();
				strokeWeight(1);
				for (
					var i = this.y + this.h * 0.15;
					i < this.y + this.h * 0.85;
					i += 5
				) {
					line(
						this.x + this.w / 2 - this.w / 10,
						i,
						this.x + this.w / 2 + this.w / 10,
						i
					);
				}
				strokeWeight(1);
			}
			//Shape
			if (this.shape === "squiggle") {
				squiggle(
					this.x + this.w / 2,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
			} else if (this.shape === "oval") {
				oval(
					this.x + this.w / 2,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
			} else if (this.shape === "diamond") {
				diamond(
					this.x + this.w / 2,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
			}
		} else if (this.num === 2) {
			//Fill
			if (this.fill === "striped") {
				noFill();
				strokeWeight(1);
				for (
					var i = this.y + this.h * 0.15;
					i < this.y + this.h * 0.85;
					i += 5
				) {
					line(
						this.x + this.w / 2 - this.w / 6 - this.w / 10,
						i,
						this.x + this.w / 2 - this.w / 6 + this.w / 10,
						i
					);
					line(
						this.x + this.w / 2 + this.w / 6 - this.w / 10,
						i,
						this.x + this.w / 2 + this.w / 6 + this.w / 10,
						i
					);
				}
				strokeWeight(1);
			}
			//Shape
			if (this.shape === "squiggle") {
				squiggle(
					this.x + this.w / 2 - this.w / 6,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
				squiggle(
					this.x + this.w / 2 + this.w / 6,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
			} else if (this.shape === "oval") {
				oval(
					this.x + this.w / 2 - this.w / 6,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
				oval(
					this.x + this.w / 2 + this.w / 6,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
			} else if (this.shape === "diamond") {
				diamond(
					this.x + this.w / 2 - this.w / 6,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
				diamond(
					this.x + this.w / 2 + this.w / 6,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
			}
		} else if (this.num === 3) {
			//Fill
			if (this.fill === "striped") {
				noFill();
				strokeWeight(1);
				for (
					var i = this.y + this.h * 0.15;
					i < this.y + this.h * 0.85;
					i += 5
				) {
					line(
						this.x + this.w / 2 - this.w / 4 - this.w / 10,
						i,
						this.x + this.w / 2 - this.w / 4 + this.w / 10,
						i
					);
					line(
						this.x + this.w / 2 - this.w / 10,
						i,
						this.x + this.w / 2 + this.w / 10,
						i
					);
					line(
						this.x + this.w / 2 + this.w / 4 - this.w / 10,
						i,
						this.x + this.w / 2 + this.w / 4 + this.w / 10,
						i
					);
				}
				strokeWeight(1);
			}
			//Shape
			if (this.shape === "squiggle") {
				squiggle(
					this.x + this.w / 2,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
				squiggle(
					this.x + this.w / 2 - this.w / 4,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
				squiggle(
					this.x + this.w / 2 + this.w / 4,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
			} else if (this.shape === "oval") {
				oval(
					this.x + this.w / 2,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
				oval(
					this.x + this.w / 2 - this.w / 4,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
				oval(
					this.x + this.w / 2 + this.w / 4,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
			} else if (this.shape === "diamond") {
				diamond(
					this.x + this.w / 2,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
				diamond(
					this.x + this.w / 2 - this.w / 4,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
				diamond(
					this.x + this.w / 2 + this.w / 4,
					this.y + this.h / 2,
					this.w / 5,
					this.h * 0.66
				);
			}
		}
	}
	checkSets(cards) {
		var sets = [];
		for (var i = 0; i < cards.length; i++) {
			for (var j = 0; j < cards.length; j++) {
				if (cards[i] !== this && cards[j] !== this && i !== j) {
					var c = false;
					var n = false;
					var f = false;
					var s = false;
					if (
						cards[i].col === this.col &&
						cards[j].col === this.col
					) {
						c = true;
					}
					if (
						cards[i].num === this.num &&
						cards[j].num === this.num
					) {
						n = true;
					}
					if (
						cards[i].fill === this.fill &&
						cards[j].fill === this.fill
					) {
						f = true;
					}
					if (
						cards[i].shape === this.shape &&
						cards[j].shape === this.shape
					) {
						s = true;
					}
					if (
						cards[i].col !== this.col &&
						cards[j].col !== this.col &&
						cards[i].col !== cards[j].col
					) {
						c = true;
					}
					if (
						cards[i].num !== this.num &&
						cards[j].num !== this.num &&
						cards[i].num !== cards[j].num
					) {
						n = true;
					}
					if (
						cards[i].fill !== this.fill &&
						cards[j].fill !== this.fill &&
						cards[i].fill !== cards[j].fill
					) {
						f = true;
					}
					if (
						cards[i].shape !== this.shape &&
						cards[j].shape !== this.shape &&
						cards[i].shape !== cards[j].shape
					) {
						s = true;
					}
					if (c && n && f && s) {
						sets.push([i, j]);
					}
				}
			}
		}
		return sets;
	}
}
function cardFromId(id, x, y, scale) {
	var color = floor(id / 27);
	var shape = floor((id % 27) / 9);
	var fill = floor((id % 9) / 3);
	var number = (id % 3) + 1;
	return new Card(
		x,
		y,
		scale,
		colors[color],
		number,
		fills[fill],
		shapes[shape],
		id
	);
}
