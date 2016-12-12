var favoriteHttpRequest = new XMLHttpRequest();

var FavoritesService = function () {}

FavoritesService.addFavorite = function addFavorite(movieTitle, imdbID) {
	
	// Add all query parameters to the URL, ensuring all params are URI encoded
	var url = 
		'/addFavorite?movie_title=' + encodeURIComponent(movieTitle) + 
		'&imdb_id=' + encodeURIComponent(imdbID);
	
	// Make an asynchronous call to add the new favorite to the datab
	favoriteHttpRequest.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log('Successfully added ' + movieTitle);
	    }
	}
	favoriteHttpRequest.open("POST", url, true);
	favoriteHttpRequest.send();

}

FavoritesService.retrieveAndDisplayFavorites = function retrieveAndDisplayFavorites() {

	/* 
		It is helpful to keep track of our URLs as variables. This makes 
		it very apparent where we should make a change if the endpoints
		are ever renamed. 

		An even better pattern would be to keep this information 
		outside of your code as a part of your environment configuration. 
		This works in slightly different ways depending on how and where your 
		code is deployed. When that is the case, you do not have to make a 
		change to the code when the location of a dependency changes.
	*/
	var url = '/favorites';

	// Make an asynchronous call to the service and retrieve the list of favorites.
	favoriteHttpRequest.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
	        var favoritesResponse = JSON.parse(this.responseText);

	        // Build a new DOM structure for our Favorites results
	       	var favoritesHTML = buildFavoritesHTML(favoritesResponse)
	        
	        // Add the new HTMl into the 'favorites' DOM element
    		document.getElementById('favorites').innerHTML = favoritesHTML;
	    }
	}
	favoriteHttpRequest.open("GET", url, true);
	favoriteHttpRequest.send();

}

function buildFavoritesHTML(favoritesResponse) {

	/*
		We'll want to build a new DOM element for each favorite result.

		By building an array of strings and then joining them before we return,
		we allow ourselves to nicely format our HTML as we build it. This helps 
		to keep our code clean and easy to read.
	*/

	var favoritesHTML = [];
    favoritesResponse.favorites.forEach(function (favorite) {
        favoritesHTML.push(
        	'<div>',
        		favorite.movie_title,
        	'</div>'
    	)
    })

    return favoritesHTML.join("");
}