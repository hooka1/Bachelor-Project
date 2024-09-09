import { StyleSheet, Text, View, TouchableOpacity, ImageBackground,TextInput} from 'react-native'
import React from 'react'
import {useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import {useNetInfo} from "@react-native-community/netinfo";
import { useIsFocused } from '@react-navigation/native';



const UserDetails = ({navigation,route}) => {
    const [token,setToken]=useState();
    const details=route.params.details
    const {user}= useSelector(state=>state.userReducer);
    const[isLoading,setIsLoading]=useState(true);
    const dispatch=useDispatch();
    const isFocused = useIsFocused();

      const netInfo = useNetInfo();
    
    useEffect(() => {
      getUser();
     },[isFocused]);
    const getUser = async () => {
    
        const savedToken = await AsyncStorage.getItem("token");
        // const savedUser= await AsyncStorage.getItem("user");
        // const currentUser = JSON.parse(savedUser);
        const currentToken = JSON.parse(savedToken);
        setToken(currentToken);
        // setUser(currentUser);
        // console.log(currentUser);
        // setClientData({...clientData,Email:currentUser.Email,dob:currentUser.DOB,PhoneNumber:currentUser.PhoneNumber,Name:currentUser.Name})
        setIsLoading(false);
    
    };


    function removeUser(){
        if (netInfo.isConnected==false || netInfo.isInternetReachable==false) {
          alert("Please Connect to the Internet")
        }
        else{
      Axios.post('http://10.0.2.2:8000/removeUser',{  
        _id:details._id
      },{
        headers:{authorization:'Bearer ' +token.token},
      }
      ).then((response)=>{
        if(response.data.message=="User has been removed"){
            if(details.role==1){
                alert("Client has been removed");
    
            }
          else if(details.role==2){
            alert("Translator has been removed");
          }
          else{
            alert("Admin has been removed");
          }
        }
        navigation.goBack();

    }).catch((err) => {
      if (err.response.status === 401) {
        alert("please Login")
        navigation.navigate("login")
      } 
      else if(err.response.status==500) {
        alert("Please Connect to the Internet")
        navigation.navigate("login")
      }
      // console.log(reason.message)
    })
      }
    }

if(isLoading==false){
  return (
    <View style={styles.container}>
     <View style={{margin:20}}>
       
        <View style={styles.action}>
            <Text style={{marginTop:4}}>Name:</Text>
            <Text style={styles.textInput}>{details.Name}</Text>
        </View>
        <View style={styles.action}>
            <Text style={{marginTop:4}}>Username:</Text>
            <Text style={styles.textInput}>{details.Username}</Text>       
         </View>
         <View style={styles.action}>
            <Text style={{marginTop:4}}>Email:</Text>
            <Text style={styles.textInput}>{details.Email}</Text>        
        </View>
        <View style={styles.action}>
            <Text style={{marginTop:4}}>Date Of Birth:</Text>
            <Text style={styles.textInput}>{details.DOB}</Text>        
        </View>
        <View style={styles.action}>
            <Text style={{marginTop:4}}>Phone Number:</Text>
            <Text style={styles.textInput}>{details.PhoneNumber}</Text>        
        </View>
        <View style={styles.action}>
            <Text style={{marginTop:4}}>Created At:</Text>
            <Text style={styles.textInput}>{details.createdAt}</Text>       
         </View>
        <TouchableOpacity style={styles.commandButton} onPress={()=>{removeUser()}}>
            <Text style={styles.panelButtonTitle}>Remove</Text>
        </TouchableOpacity>
     </View>
    </View>
  )
}
}

export default UserDetails

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    commandButton:{
        padding:15,
        borderRadius:10,
        backgroundColor:'#F50057',
        alignItems:'center',
        marginTop:10,
    },
    panel:{
        padding:20,
        backgroundColor:'#FFFFFF',
        paddingTop:20,
    },
    header:{
        backgroundColor:'#FFFFFF',
        shadowColor:'#333333',
        shadowOffset:{width:-1,height:-3},
        shadowRadius:2,
        shadowOpacity:0.4
    },
    panelHandle:{
        width:40,
        height:8,
        borderRadius:4,
        backgroundColor:'#00000040',
        marginBottom:10
    },
    panelTitle:{
        fontSize:27,
        height:35
    },
    panelSubtitle:{
        fontSize:14,
        color:'gray',
        height:30,
        marginBottom:10
    },
    panelButton:{
        padding:13,
        borderRadius:10,
        backgroundColor:'#FF6347',
        alignItems:'center',
        marginVertical:7
    },
    panelButtonTitle:{
        fontSize:17,
        fontWeight:'bold',
        color:'white'
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    actionError:{
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'#FF0000',
        paddingBottom:5
    },
    textInput:{
        flex:1,
        marginTop: Platform.OS=='android'?0:-12,
        paddingLeft:10,
        marginLeft:5,
        color:'#05375a',
        backgroundColor: "#E9EBEE",
        borderRadius: 5,
        paddingHorizontal: 1,
        paddingVertical: 1,
    }
})