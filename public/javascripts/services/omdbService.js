var omdbHttpRequest = new XMLHttpRequest();

var OmdbService = function () {}

OmdbService.searchForMovieByName = function searchForMovieByName() {

	var searchTerm = document.getElementById('searchTerm').value
	var url = 'http://www.omdbapi.com/?s=' + encodeURIComponent(searchTerm);

	omdbHttpRequest.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        var searchResponse = JSON.parse(this.responseText);

	        var resultHTML = buildSearchResultHTML(searchResponse)
    		document.getElementById('searchResults').innerHTML = resultHTML;
	    }
	}
	omdbHttpRequest.open("GET", url, true);
	omdbHttpRequest.send();	
}


function buildSearchResultHTML(searchResponse) {
	
	var resultHTML = [];
    searchResponse.Search.forEach(function (movieResult) {
    	resultHTML.push(
    		'<div id="' + movieResult.imdbID + '_display">',
	    		'<h4>'+ movieResult.Title.toUpperCase() + '</h4>',
	    		'<img src="' + movieResult.Poster + '" alt="' + movieResult.Title + '"/>',
	    		'<div id="' + movieResult.imdbID + '_info"></div>',
	    	'</div>'
		)    	
    });

    return resultHTML.join("");
}
