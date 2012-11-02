//Main function that is called on load.
function initialize() {
	
	// Set heading text
	var heading = query("#heading");
	heading.innerHTML = "Welcome to the <em>BOW</em> proof of concept!";

	query("#name_form_div").appendChild(createNameForm());
	query("#map_form_div").appendChild(createMapForm());

	// Add a div for a map
	initializeMap();
}

// Add a form to enter your name
function createNameForm() {
	var form = createElement("form", "nameForm");
	form.setAttribute("onsubmit", "submit_nameForm(); return false;");
	
	var textInputLabel = createElement("span");
	textInputLabel.innerHTML = "Whats your name?";
	form.appendChild(textInputLabel);
	
	var nameInput = createElement("input", "nameInput");
	nameInput.setAttribute("type", "text");
	form.appendChild(nameInput);
	
	var submitButton = createElement("input");
	submitButton.setAttribute("type", "submit");
	submitButton.setAttribute("value", "Submit");
	submitButton.setAttribute("onclick", "submit_nameForm();");
	form.appendChild(submitButton);
	
	var resetButton = createElement("input");
	resetButton.setAttribute("type", "button");
	resetButton.setAttribute("value", "Reset");
	resetButton.setAttribute("onclick", "reset_nameForm();");
	form.appendChild(resetButton);
	
	return form;
}

function submit_nameForm() {
	
	var nameInputValue = query("#nameInput").value;
	
	if (nameInputValue==null || nameInputValue=="") {
		alert("Come on, don't be shy...");
		return false;
	}
	
	var heading = query("#heading");
	heading.innerHTML = "Hi " + nameInputValue + ", welcome to the <em>BOW</em> proof of concept!";
}

function reset_nameForm() {
	
	query("#nameForm").reset();
	
	var heading = query("#heading");
	heading.innerHTML = "Welcome to the <em>BOW</em> proof of concept!";
}

// Add a form to enter a address
function createMapForm() {
	var form = createElement("form", "mapForm");
	form.setAttribute("onsubmit", "submit_mapForm(); return false;");
	
	var textInputLabel = createElement("span");
	textInputLabel.innerHTML = "Where are you?";
	form.appendChild(textInputLabel);
	
	var nameInput = createElement("input", "addressInput");
	nameInput.setAttribute("type", "text");
	form.appendChild(nameInput);
	
	var submitButton = createElement("input");
	submitButton.setAttribute("type", "submit");
	submitButton.setAttribute("value", "Submit");
	submitButton.setAttribute("onclick", "submit_mapForm();");
	form.appendChild(submitButton);
	
	var resetButton = createElement("input");
	resetButton.setAttribute("type", "button");
	resetButton.setAttribute("value", "Reset");
	resetButton.setAttribute("onclick", "reset_mapForm();");
	form.appendChild(resetButton);

	return form;
}

function submit_mapForm() {
	var address = document.getElementById("addressInput").value;
	setMapLocation(address);
}

function reset_mapForm() {
	
	query("#mapForm").reset();
	
	resetMap();
}