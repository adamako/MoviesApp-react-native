//Components/test.js

import React from 'react'
import {StyleSheet, View, Platform, Animated, Easing, PanResponder, Dimensions } from 'react-native'

class Test extends React.Component{
          constructor(props){
            super(props)
            this.state={
              topPosition:0,
              leftPosition: 0,
            }


          var { height,width }= Dimensions.get('window');
          this.panResponder = PanResponder.create({
            onStartShoulSetPanResponder: (evt, gestureState)=> true,
            onPanResponderMove: (evt, gestureState)=>{
              let touches = evt.nativeEvent.touches;
              if(touches.length == 1)
                  this.setState({
                    topPosition: touches[0].pageY - height/2,
                    leftPosition: touches[0].pageX - width/2
                  })
            }
          })

        }
          // componentDidMount(){
          //   // Animated.decay
          //   // velocity:0.8,
          //   // deceleration:0.997
          //   Animated.spring(
          //     this.state.topPosition,
          //     {
          //       toValue:100,
          //       tension: 8,
          //       friction: 3
          //     }
          //   ),
          //   Animated.timing(
          //     this.state.leftPosition,
          //     {
          //       toValue:100,
          //
          //
          //
          //       duration:3000,//Le temps est en miliseconds ici
          //       easing: Easing.elastic(2)
          //
          //       // speed:4,
          //       // bounciness:30
          //     }
          //   ).start()
          // }

  render(){
    return(
      <View style={styles.main_container}>
                <View
                      {...this.panResponder.panHandlers}
                      style={[styles.animation_view,{top:this.state.topPosition, left: this.state.leftPosition}]}>
                </View>
      </View>
    )
  }
}


const styles= StyleSheet.create({
  main_container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation_view:{
    backgroundColor: 'red',
    width: 100,
    height: 100,
    borderRadius: 90
  }

  // subview_container:{
  //     ...Platform.select({
  //       ios:{
  //         backgroundColor:'red',
  //         height:100,
  //         width:50
  //       },
  //       android:{
  //         backgroundColor:'blue',
  //         height:50,
  //         width:100
  //       }
  //     }
  //
  //     )
  // },
  // subview_container:{
  //   backgroundColor: Platform.OS==='ios' ? 'red' : 'blue',
  //   height: Platform.OS==='ios'?100:50,
  //   width: Platform.OS==='ios'?50:100
  // }
})


export default Test
