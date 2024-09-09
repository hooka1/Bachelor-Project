import { StyleSheet,TextInput, Button,View, Modal,Image,Platform, SafeAreaView,Text,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState } from 'react';
import Axios from 'axios';
import { button2,button1 } from '../../common/button';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector,useDispatch } from 'react-redux';
import AddUser from './AddUser';
import {useNetInfo} from "@react-native-community/netinfo";



function AddUserHome({navigation,route}){
  // const { token,user } = route.params;

  const {token}= useSelector(state=>state.userReducer);
  // const [user,setUser]=useState();
  const {user}= useSelector(state=>state.userReducer);
  const[isLoading,setIsLoading]=useState(true);
  const netInfo = useNetInfo();

  useEffect(() => {
    getUser();
   },[]);
  const getUser = async () => {

      const savedToken = await AsyncStorage.getItem("token");
      // const savedUser= await AsyncStorage.getItem("user");
      // const currentUser = JSON.parse(savedUser);
      const currentToken = JSON.parse(savedToken);
      // setUser(currentUser);
     setIsLoading(false);

  };

  const [addClientModalVisible,setAddClientModalVisible]=useState(false);
  const [addTranslatorModalVisible,setAddTranslatorModalVisible]=useState(false);
  const [addAdminModalVisible,setAddAdminModalVisible]=useState(false);

  function startAddClientVisible(){
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      alert("Please Connect to the Internet")
    }
    else{    
      console.log(token.token);
      setAddClientModalVisible(true);
    }
  };

  function endAddClientVisible(){
    setAddClientModalVisible(false);
  };

  
  function startAddTranslatorVisible(){
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      alert("Please Connect to the Internet")
    }
    else{
    console.log(token.token);
    setAddTranslatorModalVisible(true);
    }
  };

  function endAddTranslatorVisible(){
    setAddTranslatorModalVisible(false);
  };

  function startAddAdminVisible(){
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      alert("Please Connect to the Internet")
    }
    else{
    console.log(token.token);
    setAddAdminModalVisible(true);
    }
  };

  function endAddAdminVisible(){
    setAddAdminModalVisible(false);
  };


    
if(isLoading==false){
   return(
    <>
    <StatusBar style="dark"/>
    <View style={styles.appContainer}>
    <Text style={button2} onPress={startAddClientVisible}>Add Client</Text>
    <Text style={button2} onPress={startAddTranslatorVisible}>Add Translator</Text>
    <Text style={button2} onPress={startAddAdminVisible}>Add Admin</Text>
      <AddUser  showModal={addClientModalVisible} role={1} token={token.token} goBackToHub={endAddClientVisible}/>
      <AddUser  showModal={addTranslatorModalVisible} role={2} token={token.token} goBackToHub={endAddTranslatorVisible}/>
      <AddUser  showModal={addAdminModalVisible} role={3} token={token.token} goBackToHub={endAddAdminVisible}/>


    </View>
    </>
   )
      }
};
export default AddUserHome;


const styles = StyleSheet.create({

    appContainer:{
      flex:1,
      paddingTop:50,
      paddingHorizontal:16,
      // backgroundColor:'#1e085a',
      // backgroundColor: '#E9EBEE',
    },
    listContainer:{
      flex:5,
    },
  });