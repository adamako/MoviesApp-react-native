import React from 'react'
import {StyleSheet, Image} from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Search from '../components/search'
import FilmDetail from '../components/FilmDetail'
import Favorites from '../components/Favories'
import Test from '../components/Test'


const SearchStackNavigator= createStackNavigator({
      Search: {
        screen: Search,
        navigationOptions: {
          title: 'Rechercher'
        }
      },
      FilmDetail:{
        screen:FilmDetail,
      }
})

const FAvoriteStackNavigator= createStackNavigator({
  Favorites:{
    screen:Favorites,
    navigationOptions:{
      title:'Favoris'
      },
      FilmDetail:{
        screen:FilmDetail,
    }
  }
})

const MoviesTabNavigator= createBottomTabNavigator(
  {
    Test:{
      screen:Test
    },
    Search:{
      screen: SearchStackNavigator,
      navigationOptions:{//On defini le rendu de nos icones
        tabBarIcon: ()=> {
        return <Image source={require('../image/search.png')}
                style={styles.icon}
          />
      }
    }
  },
    Favorites: {
      screen: FAvoriteStackNavigator,
      navigationOptions:{
        tabBarIcon:()=>{
          return <Image source={require('../image/like.png')}
                  style={styles.icon}
                  />
        }
      }
    }
  },
  {

    tabBarOptions:{
      activeBackgroundColor:'#DDDDDD',//Couler d'arriere plan de l'onglet selectionner

      inactiveBackgroudColor:'#FFFFFF',//non innactif
      showLabel: false,//On masque les titre
      showIcon: true //on informe TabNavigator qu'on souhaite afficher les icones definis
    }

  })
const styles=StyleSheet.create({
  icon:{
    width:30,
    height: 30
  }
})



export default createAppContainer(MoviesTabNavigator)
