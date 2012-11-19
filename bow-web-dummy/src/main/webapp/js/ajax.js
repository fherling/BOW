XMLHttpRequest.prototype.get = function get(url) {
	this.open('GET', url);
	this.onreadystatechange = function() {this.processRequest();};
	this.send(null);
};

XMLHttpRequest.prototype.processRequest = function processRequest() {
	if (this.readyState == 4) {
		if (this.status != 200)	throw 'error : ' + this.status + '; message : ' + this.statusText;
		else {
			var cType =	this.getResponseHeader("Content-Type");

			if (cType == 'text/xml') this.processResponse(this.responseXML, cType);
			else this.processResponse(this.responseText, cType);
		}
	}
};

function createXMLHttp() {
	if (typeof XMLHttpRequest != 'undefined')
		return new XMLHttpRequest();
	else if (window.ActiveXObject) {
		var avers = ["Microsoft.XmlHttp", "MSXML2.XmlHttp", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.5.0"];
		for (var i = avers.length -1; i >= 0; i--) {
			try {
				var httpObj = new ActiveXObject(avers[i]);
				return httpObj;
			} catch(e) {}
		}
	}
	throw new Error('XMLHttp (AJAX) not supported');
}

function load(url) {
	var ajaxObj = createXMLHttp();

	ajaxObj.processResponse = function processResponse(response, mimeType) {
		document.open();
		document.write(response);
		document.close();
	};

	ajaxObj.get(url);
}