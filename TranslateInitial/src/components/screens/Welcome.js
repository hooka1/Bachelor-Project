import { StyleSheet, Text, View, Image,Button, Animated, Dimensions, SafeAreaView} from 'react-native'
import React from 'react'
import Background from '../../../assets/images/background.png';
import welcome from '../../../assets/images/w2.png'
import {button1, button2} from '../../common/button';
import { useRef } from 'react';
import { useEffect } from 'react';

const Welcome = ({ navigation }) => {
  const fadeAnim= useRef(new Animated.Value(0)).current;
  useEffect(()=>{
      Animated.timing(fadeAnim,{
        duration:2000,
        toValue:1,
        delay:200,
        useNativeDriver:false
      }).start()
    
  },[fadeAnim]);
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.patternbg} source={Background}/>
      <View style={styles.textContainer}>
          <Animated.Image style={[styles.logo,{opacity:fadeAnim}]} source={welcome}/>
          <Animated.Text style={[button2,{opacity:fadeAnim}]}
                    onPress={() => navigation.navigate('login')}
                >Login</Animated.Text>
          <Animated.Text style={[button1,{opacity:fadeAnim}]} 
                    onPress={() => navigation.navigate('signup')}
                >Signup</Animated.Text>
      </View>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
  patternbg:{
    position:'absolute',
    top:0,
    height:'100%',
    width:'100%',
  },
  container:{
    width:'100%',
    height:'100%'
  },
  textContainer:{
    display:"flex",
     alignItems:'center',
     justifyContent:'center',
     height:'100%',
   
   },
   head:{
     fontSize:30,
     color:'white'
   },
   logo:{
    width:'60%',
    height:'30%',
    marginBottom:50,
    resizeMode:'contain',
   }
})