import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity } from 'react-native'
import React from 'react'
import { button2 } from '../../common/button'
import {useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector,useDispatch } from 'react-redux';


const Profile = ({navigation}) => {
  const [token,setToken]=useState();
  // const [user,setUser]=useState();
  const {user}= useSelector(state=>state.userReducer);
  const[isLoading,setIsLoading]=useState(true);
  const[UIrole,setRole]=useState();
  const isFocused = useIsFocused();
  
  // useEffect(() => {
  //   if(isFocused)
  //   getUser();
  //  },[isFocused]);
  // const getUser = async () => {
  
  //     const savedToken = await AsyncStorage.getItem("token");
  //     const savedUser= await AsyncStorage.getItem("user");
  //     const currentUser = JSON.parse(savedUser);
  //     const currentToken = JSON.parse(savedToken);
  //     setToken(currentToken);
  //     setUser(currentUser);
  //    setIsLoading(false);
  //    if(currentUser.role==1){
  //     setRole("Client")
  //    }
  //    else if(currentUser.role==2){
  //     setRole("Translator")
  //    }
  //    else{
  //     setRole("Admin")
  //    }
  
  // };

  useEffect(() => {
    getUser();
   },[user]);
  const getUser = async () => {
  
      const savedToken = await AsyncStorage.getItem("token");
      const currentToken = JSON.parse(savedToken);
      setToken(currentToken);
     setIsLoading(false);
     if(user.role==1){
      setRole("Client")
     }
     else if(user.role==2){
      setRole("Translator")
     }
     else{
      setRole("Admin")
     }
  
  };

  if(isLoading==false){
    if(user.role==2){
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <View style={{marginTop:50, flexDirection:'row'}}>
          <Avatar.Image source={require('./../../../assets/images/DefaultProfile.png')} size={80} style={{backgroundColor:"#efefef"}} />
          {/* <Ionicons name="person-circle-outline" color="#4267B3" size={80}/> */}
          <View style={{marginLeft:20}}>
            <Title style={[styles.title,{marginTop:5,marginBottom:5}]}>{user.Name}</Title>
            <Caption style={styles.caption}>@{user.Username}</Caption>
            <Caption style={styles.caption}>{UIrole}</Caption>
          </View>
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.row}>
          <Ionicons name="call-outline" color="#333333" size={20}/>
          <Text style={{color:'#333333', marginLeft:20}}>{user.PhoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="mail-outline" color="#333333" size={20}/>
          <Text style={{color:'#333333', marginLeft:20}}>{user.Email}</Text>
        </View>
      </View>
      <View>
      <TouchableOpacity onPress={()=>{ navigation.navigate("TranslatorLanguages")}}>
        <Text style={button2} >Add Language</Text>
        </TouchableOpacity>    
      </View>
    </SafeAreaView>
  )
}
else{
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <View style={{marginTop:50, flexDirection:'row'}}>
          <Avatar.Image source={require('./../../../assets/images/DefaultProfile.png')} size={80} style={{backgroundColor:"#efefef"}} />
          {/* <Ionicons name="person-circle-outline" color="#4267B3" size={80}/> */}
          <View style={{marginLeft:20}}>
            <Title style={[styles.title,{marginTop:5,marginBottom:5}]}>{user.Name}</Title>
            <Caption style={styles.caption}>@{user.Username}</Caption>
            <Caption style={styles.caption}>{UIrole}</Caption>
          </View>
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.row}>
          <Ionicons name="call-outline" color="#333333" size={20}/>
          <Text style={{color:'#333333', marginLeft:20}}>{user.PhoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="mail-outline" color="#333333" size={20}/>
          <Text style={{color:'#333333', marginLeft:20}}>{user.Email}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
  }
}

export default Profile

const styles= StyleSheet.create({
container:{
  flex:1,
  
},
userInfo:{
  paddingHorizontal:24,
  marginBottom:25,
},
title:{
  fontSize:24,
  fontWeight:'bold'
},
caption:{
  fontSize:14,
  lineHeight:14,
  fontWeight:'500'
},
row:{
  flexDirection:'row',
  marginBottom:10
},
infoBoxOut:{
  borderBottomColor:'#dddddd',
  borderBottomWidth:1,
  borderTopColor:'#dddddd',
  borderTopWidth:1,
  flexDirection:'row',
  height:100
},
infoBoxIn:{
  width:'50%',
  alignItems:'center',
  justifyContent:'center'
},
menu:{
  marginTop:10,
},
menuItem:{
flexDirection:'row',
paddingVertical:15,
paddingHorizontal:30,
},
menuItemText:{
  color:'#777777',
  marginLeft:20,
  fontWeight:'600',
  fontSize:16,
  lineHeight:26
},


});