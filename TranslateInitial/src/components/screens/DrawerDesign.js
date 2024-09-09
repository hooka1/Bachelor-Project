import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import {useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';


const DrawerDesign = (props) => {
    
const [token,setToken]=useState();
// const [user,setUser]=useState();
const {user}= useSelector(state=>state.userReducer);
const[isLoading,setIsLoading]=useState(true);

useEffect(() => {
  getUser();
 },[]);
 const getUser = async () => {

    const savedToken = await AsyncStorage.getItem("token");
    // const savedUser= await AsyncStorage.getItem("user");
    // const currentUser = JSON.parse(savedUser);
    const currentToken = JSON.parse(savedToken);
    setToken(currentToken);
    // setUser(currentUser);
   setIsLoading(false);

};
const navigation= useNavigation();
if(isLoading==false){
  return (
    <View style={styles.header}>
   {/* <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:'#3b5998'}} > */}
    <ImageBackground source={require('../../../assets/images/background.png')} style={{padding:20}}>
        <Image source={require('./../../../assets/images/DefaultProfile.png')} style={{height:80, width:80, borderRadius:40, marginTop:10}} />
        <Text style={{color:'#fff', fontSize:18,marginTop:10}}> {user.Name} </Text>
    </ImageBackground>
    <View style={{flex:1,backgroundColor:'#fff',paddingTop:10}}>
        <DrawerItemList {...props} />
    </View>
    <View style={{marginLeft:10, marginBottom:20}}>
      <Text style={{color:"#90949C"}}>Contact us at: </Text>
      <Text style={{color:"#90949C"}}>translateco2023@gmail.com 01223254554</Text>
    </View>
   {/* </DrawerContentScrollView> */}
   <View style={{padding:20,borderTopWidth:1,borderTopColor:'#ccc'}} >
    <TouchableOpacity onPress={()=>navigation.navigate('welcome')} style={{paddingVertical:15}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Ionicons name="exit-outline" size={22}/>
    <Text style={{ fontSize:15, fontFamily:'Roboto', marginLeft:5}}>Log Out</Text>
    </View>
    </TouchableOpacity>
   </View>
   </View>
  )
}
}

export default DrawerDesign

const styles = StyleSheet.create({
    header:{
        flex:1,
    },
})