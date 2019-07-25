//Store/Reducers/favoriteReducer

const initialState={favoritesFilm:[]}

function toggleFavorite(state=initialState, action){
  let nexteState
  switch(action.type){
    case 'TOGGLE_FAVORITE':
        const favoriteFilmIndex= state.favoritesFilm.findIndex(item=>item.id===action.value.id)
        if(favoriteFilmIndex!==-1){
          //Le film est deja dans les favoris, on le supprime de la liste
          nexteState={
            ...state,
            favoritesFilm:state.favoritesFilm.filter((item,index)=> index!==favoriteFilmIndex)
          }
        }
        else{
          //Le film n'est pas dans les favoris, on l'ajoute a la liste
          nexteState={
            ...state,
            favoritesFilm:[...state.favoritesFilm,action.value]
          }
        }
        return nexteState || state
    default:
      return state
  }
}


export default toggleFavorite
