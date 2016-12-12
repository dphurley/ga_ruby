var favoriteHttpRequest = new XMLHttpRequest();

var FavoritesService = function () {}

FavoritesService.retrieveAndDisplayFavorites = function retrieveAndDisplayFavorites() {

	var url = '/favorites';

	favoriteHttpRequest.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
	        var favoritesResponse = JSON.parse(this.responseText);

	        var favoritesHTML = [];
	        favoritesResponse.favorites.forEach(function (favorite) {
		        favoritesHTML.push(
		        	'<div>',
		        	favorite.movie_title,
		        	'</div>'
	        	)
	        })
    		document.getElementById('favorites').innerHTML = favoritesHTML.join("");
	    }
	}
	
	favoriteHttpRequest.open("GET", url, true);
	favoriteHttpRequest.send();

}