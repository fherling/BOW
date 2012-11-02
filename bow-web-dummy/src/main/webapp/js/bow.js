function createElement(tagName) {
	return document.createElement(tagName);
}

function createElement(tagName, id) {
	var element = document.createElement(tagName);
	element.setAttribute("id", id);
	return element;
}

function query(selector) {

	// is id selector?
	var index = selector.indexOf("#");
	
	if(index == 0) {
		return document.getElementById(selector.substr(1));
	}
	
	return;	
}

function loadScript(src) {
	  var script = document.createElement("script");
	  script.type = "text/javascript";
	  script.src = src;
	  document.body.appendChild(script);
}
