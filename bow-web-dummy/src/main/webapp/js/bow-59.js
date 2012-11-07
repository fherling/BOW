//Main function that is called on load.
function initialize() {
	
	// Set heading text
	var heading = query("#heading");
	heading.innerHTML = "BOW-59: Feature - Perform common arithmetic operations";

	createArithmeticsExample();
}

// Add a form to enter your name
function createArithmeticsExample() {
	var div = createElement("div", "output-div");
	document.body.appendChild(div);
	var pre = createElement("pre", "output-pre");
	div.appendChild(pre);
	
	var a = 17;
	outputLine("var a = " + a);
	var b = 5;
	outputLine("var b = " + b);
	
	var add = a + b;
	outputLine("add: a + b = " + add);
	
	var subtract = a - b;
	outputLine("subtract: a - b = " + subtract);
	
	var multiply = a * b;
	outputLine("multiply: a * b = " + multiply);
	
	var divide = a / b;
	outputLine("divide: a / b = " + divide);
	
	var divideInt = Math.floor(a / b);
	outputLine("divideInt: a // b = " + divideInt);
	
	var remainder = a % b;
	outputLine("remainder: a % b = " + remainder);
	
	var exponentation = Math.pow(a, b);
	outputLine("exponentation: a ^ b = " + exponentation);

	a++;
	outputLine("increment: a++ = " + a);

	a--;
	outputLine("decrement: a-- = " + a);
}

function outputLine(line) {
	query("#output-pre").innerHTML += line + "\n";
}
