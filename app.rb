require 'sinatra'
require 'json'

# GET call that serves up the HTML page
get '/' do 
  File.read('public/index.html')
end

# This is the GET call that will serve up favorites from the 'database'
get '/favorites' do
  response.header['Content-Type'] = 'application/json'

  favorites_from_database
end

# This is the POST call that will add new favorites to the 'database'
post '/addFavorite' do

  # Make sure all necessary information has been sent before we process the request further
  return 'Invalid Request' unless params[:movie_title] && params[:imdb_id]

  # Look up the existing list of favorites
  favorites = JSON.parse(favorites_from_database)

  # Build a new hash from the input parameters
  new_favorite = { 
    'movie_title' => params[:movie_title], 
    'imdb_id' => params[:imdb_id] 
  }
  
  return 'You have already favorited this movie.' unless !movie_already_exists_in_favorites(favorites, new_favorite)

  # Add the new hash to the existing list of Favorites in the 'database'
  favorites['favorites'] << new_favorite

  File.write('favorites.json', JSON.pretty_generate(favorites))

  new_favorite.to_json
end

def movie_already_exists_in_favorites(favorites, new_favorite)
  favorites['favorites'].any? do |favoritedMovie|
    favoritedMovie['imdb_id'] == new_favorite['imdb_id']
  end
end

def favorites_from_database
  favoritesFromDatabase = File.read('favorites.json')

  favoritesFromDatabase.empty? ?  new_favorites_list : favoritesFromDatabase
end

def new_favorites_list
  {
    "favorites" => []
  }.to_json
end