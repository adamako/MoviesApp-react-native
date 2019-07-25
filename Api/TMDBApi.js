//API/TMDBApi.js

const API_TOKEN= "34f1c5828b74b203497d3bd4c2847731";

//Recuperation du titre
export function getFilmsFromApiWithSearchedText(text,page){
  const url='https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query='+text+"&page="+page
  return fetch(url)
    .then((response) =>response.json())
    .catch((error)=>console.error(error))
}

//Recuperation des images de l'api
export function getImageFromApi(name){
  return 'https://image.tmdb.org/t/p/w300'+name
}

//Recuperation du detail d'un film
export function getFilmsDetailFromApi(id){
  return fetch('https:api.themoviedb.org/3/movie/'+id+ '?api_key=' + API_TOKEN+ '&langage=fr')
        .then((response)=>response.json())
        .catch((error)=>console.error(error));
}
