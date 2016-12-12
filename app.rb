require 'sinatra'
require 'json'

# GET call that serves up the HTML page
get '/' do 
  File.read('views/index.html')
end

# This is the GET call that will serve up favorites from the 'database'
get '/favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('favorites.json')
end

# This is the POST call that will add new favorites to the 'database'
post '/addFavorite' do
  favorites = JSON.parse(File.read('favorites.json'))
  
  return 'Invalid Request' unless params[:movie_title] && params[:omdb_id]

  movie = { movie_title: params[:movie_title], omdb_id: params[:omdb_id] }
  favorites << movie
  File.write('favorites.json',JSON.pretty_generate(favorites))
  movie.to_json
end
