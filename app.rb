require 'sinatra'

get '/' do 
  File.read('views/index.html')
end

get '/favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('favorites.json')
end

get '/favorites' do
  file = JSON.parse(File.read('favorites.json'))
  
  return 'Invalid Request' unless params[:name] && params[:oid]

  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('favorites.json',JSON.pretty_generate(file))
  movie.to_json
end
