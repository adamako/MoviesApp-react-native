import React from 'react'
import {View,StyleSheet, TextInput,Button, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../Api/TMDBApi'
import { connect } from 'react-redux'
import FilmList from './FilmList'




class Search extends React.Component{
    constructor(props){
      super(props)
      this._loadFilms=this._loadFilms.bind(this)
      this.searchedText= ""
      this.page=0 //Compteur pour connaitre la page courante
      this.totalPages=0//Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
      this.state={
        films:[],
        isLoading:false//Par defaut a false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
      }
    }

    _displayDetailForFilm= (idFilm)=>{
      console.log("Display film with id"+ idFilm)
      this.props.navigation.navigate("FilmDetail",{idFilm: idFilm} )
    }

    _searchFilms(){
      this.page=0 //Compteur pour connaitre la page courante
      this.totalPages=0
      this.setState({
        films: [],
      }, ()=>{
        this._loadFilms()
      })
    }
    _displayLoading(){
      if(this.state.isLoading){
        return (
          <View style={styles.loading_container}>
              <ActivityIndicator size='large'/>
         </View>
        )
      }
    }
    _searchTextInputChanged(Text){
      //this.setState( {searchedText: Text})
      this.searchedText=Text//Modification du texte rechercher a chaque saisie de texte
    }

    _loadFilms() {

          if(this.searchedText.length>0){
            this.setState({isLoading:true})//Lancement du chargement
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
              this.page=data.page
              this.totalPages=data.total_pages
              this.setState({
                films: [...this.state.films,...data.results],
                isLoading: false// Arret du chargement
               })
          })
        }
      }
  render(){

    return(
      <View style={ styles.main_container} onPress={()=>displayDetailForFilm(film.id)} >

            <TextInput
                style={styles.Textinput}
                placeholder='Titre du film'
                onChangeText={(Text)=>this._searchTextInputChanged(Text)}
                onSubmitEditing={()=>this._searchFilms()}
             />

            <Button title='Rechercher' onPress={() => this._searchFilms()}/>
            <FilmList
              films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
              navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
              loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
              page={this.page}
              totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
            />

              {this._displayLoading()}

      </View>

    )
  }
}




const styles=StyleSheet.create({
  main_container:{
    flex: 1,

  },
  Textinput:{
      marginLeft:0,
      marginRight: 0,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
  },
  loading_container:{
    position: 'absolute',
    left:0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


//On connecte le state Redux, ainsi que les films favoris du state de notre application, a notre component Search
const mapStateToProps= state=>{
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search)
