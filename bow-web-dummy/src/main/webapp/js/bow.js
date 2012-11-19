function createElement(tagName) {
	return document.createElement(tagName);
}

function createElement(tagName, id) {
	var element = document.createElement(tagName);
	element.setAttribute("id", id);
	return element;
}

function query(selector) {
	// is id a selector?
	return selector.indexOf("#") == 0 ? document.getElementById(selector.substr(1)) : null ;
}

function loadScript(src) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = src;
	document.body.appendChild(script);
}

/**
 * Usage: addEvent(document.getElementById('id1'),'click',dosomething,false);
 * 
 * useCapture: true or false for "bubble":
 *   <div onclick="alert('a')><div onclick="alert('b')">xx</div></div>
 * Clicking on the xx would "bubble" out triggering the alert('b') first and the alert('a') second.
 * If those alerts were attached using event listeners with useCapture true then all modern browsers
 * except Internet Explorer would process the alert('a') first and then the alert('b').
 */
function addEvent(el, eventType, functionName, useCapture) {
	if (el.addEventListener) {
		el.addEventListener(eventType, functionName, useCapture);
		return true;
	} else if (el.attachEvent) {
		return el.attachEvent('on' + eventType, functionName);
	}
}