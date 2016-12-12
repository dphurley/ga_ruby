require 'sinatra'
require 'json'

# GET call that serves up the HTML page
get '/' do 
  File.read('public/index.html')
end

# This is the GET call that will serve up favorites from the 'database'
get '/favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('favorites.json')
end

# This is the POST call that will add new favorites to the 'database'
post '/addFavorite' do

  # Make sure all necessary information has been sent before we process the request further
  return 'Invalid Request' unless params[:movie_title] && params[:imdb_id]

  # Build a new hash from the input parameters
  new_favorite = { 
    'movie_title' => params[:movie_title], 
    'imdb_id' => params[:imdb_id] 
  }

  # Add the new hash to the existing list of Favorites in the 'database'
  favorites = JSON.parse(File.read('favorites.json'))
  favorites['favorites'] << new_favorite

  File.write('favorites.json', JSON.pretty_generate(favorites))

  new_favorite.to_json
end
