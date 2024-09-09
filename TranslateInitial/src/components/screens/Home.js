import { StatusBar } from 'expo-status-bar';
import {useEffect,useState} from 'react';
import { StyleSheet,TextInput, Button,View,FlatList,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestedSession from './RequestedSession';
import EnteredSession from './EnteredSession';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { button1,button2 } from '../../common/button';
import AcceptedSession from './AcceptedSession';
import AdminAllRequest from './AdminAllRequest';
import AdminAllAccepted from './AdminAllAccepted';
import AddUser from './AddUser';
import TranslatorRequests from './TranslatorRequests';
import TranslatorApproved from './TranslatorApproved';
import { useSelector,useDispatch } from 'react-redux';


 const Home =  ({navigation,route}) => {

  const [token,setToken]=useState();
  // const [user,setUser]=useState();
  const {user}= useSelector(state=>state.userReducer);
  const[isLoading,setIsLoading]=useState(true);

  useEffect(() => {
    getUser();
    console.log(user);
   },[user]);
  const getUser = async () => {

      const savedToken = await AsyncStorage.getItem("token");
      // const savedUser= await AsyncStorage.getItem("user");
      // const currentUser = JSON.parse(savedUser);
      const currentToken = JSON.parse(savedToken);
      setToken(currentToken);
      // setUser(currentUser);
     setIsLoading(false);

  };




  //  const [requestModalVisible,setRequestModalVisible]=useState(false);
  //  const [seeRequestModalVisible,setSeeRequestModalVisible]=useState(false);
  //  const [seeAcceptedModalVisible,setSeeAcceptedModalVisible]=useState(false);
   const [seeAdminRequestModalVisible,setSeeAdminRequestModalVisible]=useState(false);
   const [seeAdminAcceptedModalVisible,setSeeAdminAcceptedModalVisible]=useState(false);
   const [addClientModalVisible,setAddClientModalVisible]=useState(false);
   const [addTranslatorModalVisible,setAddTranslatorModalVisible]=useState(false);
   const [addAdminModalVisible,setAddAdminModalVisible]=useState(false);
  //  const [seeTranslatorRequestModalVisible,setSeeTranslatorRequestModalVisible]=useState(false);
  //  const [seeTranslatorAcceptedModalVisible,setSeeTranslatorAcceptedModalVisible]=useState(false);

  function seeProfile(){
    navigation.navigate('Draw',{screen:'Profile'})
    console.log(user)
  }

  function startRequestVisible(){
    console.log(token.token);
    // setRequestModalVisible(true);
    // navigation.navigate('enteredSession',{token:token,user:user}); 
    // navigation.navigate('Tab',{screen:'enteredSession',params:{token:token,user:user}}); 
    navigation.navigate('RequestSession'); 



  };

//   useEffect(() => {
//     if(token.token==null){
//       navigation.navigate('login'); 
//     }
// });

  // function endRequestVisible(){
  //   setRequestModalVisible(false);
  // };

  function startSeeRequestVisible(){
    console.log(token.token);
    // setSeeRequestModalVisible(true);
    navigation.navigate('Top',{screen:'Requests'}); 
  };

  // function endSeeRequestVisible(){
  //   setSeeRequestModalVisible(false);
  // };
  // function startSeeAcceptedVisible(){
  //   console.log(token.token);
  //   setSeeAcceptedModalVisible(true);
  // };

  // function endSeeAcceptedVisible(){
  //   setSeeAcceptedModalVisible(false);
  // };
  
  function startSeeAdminRequestVisible(){
    console.log(token.token);
    // setSeeAdminRequestModalVisible(true);
    navigation.navigate('Top',{screen:'Requests'}); 

  };

  function endSeeAdminRequestVisible(){
    setSeeAdminRequestModalVisible(false);
  };
  function startSeeAdminAcceptedVisible(){
    console.log(token.token);
    setSeeAdminAcceptedModalVisible(true);
  };

  function endSeeAdminAcceptedVisible(){
    setSeeAdminAcceptedModalVisible(false);
  };

  function startAddClientVisible(){
    console.log(token.token);
    setAddClientModalVisible(true);
  };

  function endAddClientVisible(){
    setAddClientModalVisible(false);
  };

  
  function startAddTranslatorVisible(){
    console.log(token.token);
    setAddTranslatorModalVisible(true);
  };

  function endAddTranslatorVisible(){
    setAddTranslatorModalVisible(false);
  };

  function startAddAdminVisible(){
    console.log(token.token);
    setAddAdminModalVisible(true);
  };

  function endAddAdminVisible(){
    setAddAdminModalVisible(false);
  };

  function startSeeTranslatorRequestVisible(){
    console.log(token.token);
    // setSeeTranslatorRequestModalVisible(true);
    navigation.navigate('Top',{screen:'Requests'}); 
  };

  function addUser(){
    navigation.navigate('AddUserHome')
  }

  function userList(){
    navigation.navigate('UserListTop',{screen:'Clients'})
  }

  // function endSeeTranslatorRequestVisible(){
  //   setSeeTranslatorRequestModalVisible(false);
  // };
  // function startSeeTranslatorAcceptedVisible(){
  //   console.log(token.token);
  //   setSeeTranslatorAcceptedModalVisible(true);
  // };

  // function endSeeTranslatorAcceptedVisible(){
  //   setSeeTranslatorAcceptedModalVisible(false);
  // };

  if(isLoading==false){
  if(user.role==1){
  return (
    <>
    <StatusBar style="dark"/>
    <View style={styles.appContainer}>
    <Text style={{fontSize:20, fontStyle:"italic", fontWeight:'bold'}}>Welcome, {user.Name}</Text>
    <Text style={button2} onPress={startRequestVisible}>Request Session</Text>
    <Text style={button2} onPress={startSeeRequestVisible}>View Requests</Text>
    <Text style={button2} onPress={seeProfile}>Profile</Text>
    </View>
    </>
  );
    }
  else if(user.role==2){
    return (
      <>
      <StatusBar style="dark"/>
      <View style={styles.appContainer}>
      <Text style={{fontSize:20, fontStyle:"italic", fontWeight:'bold'}}>Welcome, {user.Name}</Text>
      <Text style={button2} onPress={startSeeTranslatorRequestVisible}>View Requests</Text>
      <Text style={button2} onPress={seeProfile}>Profile</Text>
      </View>
      </>
    );
      }
  else if(user.role==3){
      return (
        <>
        <StatusBar style="dark"/>
        <View style={styles.appContainer}>
        <Text style={{fontSize:20, fontStyle:"italic", fontWeight:'bold'}}>Welcome, {user.Name}</Text>
        <Text style={button2} onPress={startSeeAdminRequestVisible}>View Requests</Text>
        <Text style={button2} onPress={addUser}>Add User</Text>
        <Text style={button2} onPress={userList}>See Users</Text>
        <Text style={button2} onPress={seeProfile}>Profile</Text>
        </View>
        </>
      );
        }
  }
}

export default Home

const styles = StyleSheet.create({

    appContainer:{
      flex:1,
      paddingTop:50,
      paddingHorizontal:16,
      
      // backgroundColor:'#f1e7e5',
    },
    listContainer:{
      flex:5,
    },
  });
  