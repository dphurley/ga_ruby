require 'sinatra'

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
post '/favorites' do
  file = JSON.parse(File.read('favorites.json'))
  
  return 'Invalid Request' unless params[:name] && params[:oid]

  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('favorites.json',JSON.pretty_generate(file))
  movie.to_json
end
