var omdbHttpRequest = new XMLHttpRequest();

var OmdbService = function () {}

OmdbService.searchForMovieByName = function searchForMovieByName() {

	// Add all query parameters to the URL, ensuring all params are URI encoded
	var searchTerm = document.getElementById('searchTerm').value
	var url = 'http://www.omdbapi.com/?s=' + encodeURIComponent(searchTerm);

	// Once the URL has been built, make an AJAX call to OMDB search endpoint.
	omdbHttpRequest.onreadystatechange = function() {


	    if (this.readyState == 4 && this.status == 200) {
	        var searchResponse = JSON.parse(this.responseText);

	        /* 
	        	Upon successful search, build a HTML structure out of the results
	        	and append them to the 'searchResults' DOM element.
	        */
	        var resultHTML = buildSearchResultHTML(searchResponse)
    		document.getElementById('searchResults').innerHTML = resultHTML;
	    }
	}
	omdbHttpRequest.open("GET", url, true);
	omdbHttpRequest.send();	
}

OmdbService.displayAdditionalInfoForMovieByImdbId = function displayAdditionalInfoForMovieByImdbId(imdbID) {

	// Add all query parameters to the URL, ensuring all params are URI encoded
	var url = 'http://www.omdbapi.com/?i=' + encodeURIComponent(imdbID);

	// Once the URL has been built, make an AJAX call to OMDB movie ID lookup endpoint.
	omdbHttpRequest.onreadystatechange = function() {

		// Check for success, in this case we want readyState of 'loaded' and HTTP status of 200
	    if (this.readyState == 4 && this.status == 200) {
	        var lookupResponse = JSON.parse(this.responseText);

	        /* 
	        	Upon successful lookup, build a HTML structure out of the additional info
	        	and append it to the '*_info' DOM element on the matching search result entry.
	        */
	        var additionalInfoHTML = buildAdditionalInfoHTML(lookupResponse);
    		document.getElementById(imdbID + '_info').innerHTML += additionalInfoHTML;

    		/* 
    			We'll want to hide the 'More Info' button now that we are displaying the info.
    			To do that, we will update the CSS 'visibility' on the button.
			*/
    		document.getElementById(imdbID + '_more_info_button').style.visibility = 'hidden';
	        
	    }
	}
	omdbHttpRequest.open("GET", url, true);
	omdbHttpRequest.send();
}

function buildSearchResultHTML(searchResponse) {
	
	/*
		We'll want to build a new DOM element for each search result.

		By building an array of strings and then joining them before we return,
		we allow ourselves to nicely format our HTML as we build it. This helps 
		to keep our code clean and easy to read.
	*/

	var resultHTML = [];
    searchResponse.Search.forEach(function (movieResult) {
    	resultHTML.push(
    		'<div id="' + movieResult.imdbID + '_display">',
	    		'<h4>'+ movieResult.Title.toUpperCase() + '</h4>',
	    		'<img src="' + movieResult.Poster + '" alt="' + movieResult.Title + '"/>',
	    		'<div id="' + movieResult.imdbID + '_more_info_button">',
	    			'<button onclick="OmdbService.displayAdditionalInfoForMovieByImdbId(\'' + movieResult.imdbID + '\')">More Info</button>',
				'</div>',   	
	    		'<div id="' + movieResult.imdbID + '_info"></div>',
	    	'</div>'
		)    	
    });

    return resultHTML.join("");
}

function buildAdditionalInfoHTML(lookupResponse) {
	
	/*
		We'll want to build a new DOM element for the individual movie's lookup result.

		By building an array of strings and then joining them together at the end 
		of the function, we allow ourselves to nicely format our HTML as we build it. 
		This helps to keep our code clean and easy to read.
	*/

	var resultHTML = [];
	resultHTML.push(
		'<div>Rating: ' + lookupResponse.Rated + '</div>',
		'<div>Release Date: ' + lookupResponse.Released + '</div>',
		'<div>Runtime: ' + lookupResponse.Runtime + '</div>',
		'<div>Genre: ' + lookupResponse.Genre + '</div>',
		'<div>Director: ' + lookupResponse.Director + '</div>',
		'<div>Writer: ' + lookupResponse.Writer + '</div>',
		'<div>Actors: ' + lookupResponse.Actors + '</div>',
		'<div>Plot Summary: ' + lookupResponse.Plot + '</div>',
		'<div>Language: ' + lookupResponse.Language + '</div>',
		'<div>Country: ' + lookupResponse.Country + '</div>',
		'<div>Awards: ' + lookupResponse.Awards + '</div>',
		'<div>Metascore: ' + lookupResponse.Metascore + '</div>',
		'<div>IMDB Rating: ' + lookupResponse.imdbRating + '</div>',
		'<div>IMDB Votes: ' + lookupResponse.imdbVotes + '</div>',
		'<div>Type: ' + lookupResponse.Type + '</div>'
	)    	

    return resultHTML.join("");
}