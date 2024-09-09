import { StyleSheet, Text, View, TouchableOpacity, ImageBackground,TextInput, ScrollView} from 'react-native'
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



const SessionDetails = ({navigation,route}) => {
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


if(isLoading==false){
    if(user.role==1){
        return (
            <View style={styles.container}>
                                  <ScrollView style={{margin:20}}>

             {/* <View style={{margin:20}}> */}
                {/* <View style={{alignItems:'center'}}>
                    <Text style={{marginTop:10,fontSize:18,fontWeight:'bold'}}>{user.Name}</Text>
                </View> */}
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Language From:</Text>
                    <Text style={styles.textInput}>{details.LanguageFrom}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Language To:</Text>
                    <Text style={styles.textInput}>{details.LanguageTo}</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Date:</Text>
                    <Text style={styles.textInput}>{details.Date}</Text>        
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Time From:</Text>
                    {
              details.TimeFrom<12?            
              <Text style={styles.textInput}>{details.TimeFrom} AM</Text>        
              :           
              <Text style={styles.textInput}>{details.TimeFrom-12} PM</Text>        
            }
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Duration:</Text>
                    <Text style={styles.textInput}>{details.Duration} Hours</Text>        
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Translator Email:</Text>
                    <Text style={styles.textInput}>{details.TranslatorEmail}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Translator Name:</Text>
                    <Text style={styles.textInput}>{details.TranslatorName}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Translator Number:</Text>
                    <Text style={styles.textInput}>{details.TranslatorPhoneNumber}</Text>
                </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Type:</Text>
                    <Text style={styles.textInput}>{details.Type}</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Payment Type:</Text>
                    <Text style={styles.textInput}>{details.Payment}</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Amount:</Text>
                    <Text style={styles.textInput}>{details.Amount} EGP</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Created At:</Text>
                    <Text style={styles.textInput}>{details.createdAt}</Text>       
                 </View>
                 </ScrollView>
             {/* </View> */}
            </View>
          ) 
    }
    else if(user.role==2){
        return (
            <View style={styles.container}>
             <ScrollView style={{margin:20}}>
             {/* <View style={{margin:20}}> */}
                {/* <View style={{alignItems:'center'}}>
                    <Text style={{marginTop:10,fontSize:18,fontWeight:'bold'}}>{user.Name}</Text>
                </View> */}
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Language From:</Text>
                    <Text style={styles.textInput}>{details.LanguageFrom}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Language To:</Text>
                    <Text style={styles.textInput}>{details.LanguageTo}</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Date:</Text>
                    <Text style={styles.textInput}>{details.Date}</Text>        
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Time From:</Text>
                    {
              details.TimeFrom<12?            
              <Text style={styles.textInput}>{details.TimeFrom} AM</Text>        
              :           
              <Text style={styles.textInput}>{details.TimeFrom-12} PM</Text>        
            }                
            </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Duration:</Text>
                    <Text style={styles.textInput}>{details.Duration} Hours</Text>        
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Client Email:</Text>
                    <Text style={styles.textInput}>{details.ClientEmail}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Client Name:</Text>
                    <Text style={styles.textInput}>{details.ClientName}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Client Number:</Text>
                    <Text style={styles.textInput}>{details.UserPhoneNumber}</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Type:</Text>
                    <Text style={styles.textInput}>{details.Type}</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Payment Type:</Text>
                    <Text style={styles.textInput}>{details.Payment}</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Amount:</Text>
                    <Text style={styles.textInput}>{details.Amount} EGP</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Created At:</Text>
                    <Text style={styles.textInput}>{details.createdAt}</Text>       
                 </View>
                 </ScrollView>
             {/* </View> */}
            </View>
          ) 
    }
    else{
        return (
            <View style={styles.container}>
                  <ScrollView style={{margin:20}}>
             {/* <View style={{margin:20}}> */}
                {/* <View style={{alignItems:'center'}}>
                    <Text style={{marginTop:10,fontSize:18,fontWeight:'bold'}}>{user.Name}</Text>
                </View> */}
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Language From:</Text>
                    <Text style={styles.textInput}>{details.LanguageFrom}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Language To:</Text>
                    <Text style={styles.textInput}>{details.LanguageTo}</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Date:</Text>
                    <Text style={styles.textInput}>{details.Date}</Text>        
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Time From:</Text>
                    {
              details.TimeFrom<12?            
              <Text style={styles.textInput}>{details.TimeFrom} AM</Text>        
              :           
              <Text style={styles.textInput}>{details.TimeFrom-12} PM</Text>        
            }              
              </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Duration:</Text>
                    <Text style={styles.textInput}>{details.Duration} Hours</Text>        
                </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Type:</Text>
                    <Text style={styles.textInput}>{details.Type}</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Client Email:</Text>
                    <Text style={styles.textInput}>{details.ClientEmail}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Client Name:</Text>
                    <Text style={styles.textInput}>{details.ClientName}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Client Number:</Text>
                    <Text style={styles.textInput}>{details.UserPhoneNumber}</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Translator Email:</Text>
                    <Text style={styles.textInput}>{details.TranslatorEmail}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Translator Name:</Text>
                    <Text style={styles.textInput}>{details.TranslatorName}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4}}>Translator Number:</Text>
                    <Text style={styles.textInput}>{details.TranslatorPhoneNumber}</Text>
                </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Payment Type:</Text>
                    <Text style={styles.textInput}>{details.Payment}</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Amount:</Text>
                    <Text style={styles.textInput}>{details.Amount} EGP</Text>       
                 </View>
                 <View style={styles.action}>
                    <Text style={{marginTop:4}}>Created At:</Text>
                    <Text style={styles.textInput}>{details.createdAt}</Text>       
                 </View>
             {/* </View> */}
             </ScrollView>
            </View>
          ) 
    }
  
}
}

export default SessionDetails

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