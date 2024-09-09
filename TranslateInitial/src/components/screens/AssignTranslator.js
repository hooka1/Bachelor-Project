// import { StyleSheet,TextInput, Button,View, Modal,Image,Text} from 'react-native';
// import SelectDropdown from 'react-native-select-dropdown';
// import { useState } from 'react';
// import Axios from 'axios';
// import { useNavigation } from '@react-navigation/native';


// function AssignTranslator(props){
//     const [t,setT]=useState({
//         TranslatorEmail:"",
//     });

//     const navigation=useNavigation()
    
//     function Assign(){
// if(t.TranslatorEmail==''){
//   alert('please enter a Translator Email');
// }

// else{
//   if (!netInfo.isConnected || !netInfo.isInternetReachable) {
//     alert("Please Connect to the Internet")
//   }
//   else{
//         Axios.put('http://10.0.2.2:8000/assignTranslator',{  
//             _id:props._id,
//             TranslatorEmail:t.TranslatorEmail,
//           },{
//             headers:{authorization:'Bearer ' +props.token},
//           }
//           ).then((response)=>{
//             if(response.data.message){
//               alert(response.data.message);
//               props.goBackToHub();
//             }
//             else{
//               alert("Something Went Wrong")  
//               props.goBackToHub();
//             }
//         }).catch((err) => {
//           if (err.response.status === 401) {
//             alert("please Login")
//             navigation.navigate("login")
//           } 
//           else if(err.response.status==500) {
//             alert("Please Connect to the Internet")
//           }
//           // console.log(reason.message)
//         })
    
  
//       }
// }
//     }


//    return(
//     <Modal visible={props.showModal} animationType="slide" >
//    <View style={styles.inputContainer}>
//    <Text style={styles.h1}>Assign Translator</Text>
//         <Image style={styles.image} source={require('../../../assets/images/add.png')} />
//         <TextInput style={styles.text} placeholder='enter Translator Email' onChangeText={(selectedItem)=>{setT({...t,TranslatorEmail:selectedItem}); console.log(t.TranslatorEmail)}}/>
//         <View style={styles.buttonContainer}> 
//         <View style={styles.button}>
//         <Button title="Assign" onPress={Assign} color="#5e0acc"/>
//         </View>
//         <View style={styles.button}>
//         <Button title="Cancel" onPress={props.goBackToHub} color="#f31282"/>
//         </View>
//         </View>
//         </View>
//         </Modal>
//    )


// };
// export default AssignTranslator;

// const styles = StyleSheet.create({
//     inputContainer: {
//       flex: 1,
//       flexDirection:'column',
//       backgroundColor: '#311b6b',
//       alignItems: 'center',
//       justifyContent: 'center',
//      // marginBottom:24,
//       padding:16,
//       // borderBottomColor:"#555555",
//       // borderBottomWidth:1,
//     },
//     text:{
//      // marginRight:8,
//       padding: 10,
//       borderWidth:1,
//       marginBottom:8,
//       borderColor:'#e4d0ff',
//       borderRadius:6,
//       width:'100%',
//       backgroundColor:'#e4d0ff',
//       color:'#120438'
//     },
//     buttonContainer:{
//       flexDirection:"row",
//     },
//     button:{
//       width:100,
//       marginTop:16,
//       marginHorizontal:8
//     },
//     image:{
//       width:100,
//       height:100,
//       margin:20
//     },
//     h1: {
//         fontSize: 30,
//         color: '#fff',
//       },
//   });

import { StyleSheet,View,Text,Pressable,Modal,Image,FlatList,Button, RefreshControl, ActivityIndicator, TouchableOpacity,Platform} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import React, { useEffect, useState } from 'react'
import {button1} from '../../common/button';
import Axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {useNetInfo} from "@react-native-community/netinfo";


function AssignTranslator({navigation,route}){

    const {session,LF,LT,CB}=route.params;
    const {token}= useSelector(state=>state.userReducer);
    const netInfo = useNetInfo();
    const[isLoading,setIsLoading]=useState(true);
    const [translators, setTranslators] = useState([]);
    const[refreshing,setRefreshing] =useState(true);


    function Assign(input){

setIsLoading(true)

  if (!netInfo.isConnected || !netInfo.isInternetReachable) {
    alert("Please Connect to the Internet")
  }
  else{
        Axios.put('http://10.0.2.2:8000/assignTranslator',{  
            _id:session,
            TranslatorEmail:input,
          },{
            headers:{authorization:'Bearer ' +token.token},
          }
          ).then((response)=>{
            if(response.data.message){
              alert(response.data.message);
              navigation.goBack();
            }
            else{
              alert("Something Went Wrong")  
              navigation.goBack();
            }
        }).catch((err) => {
          if (err.response.status === 401) {
            alert("please Login")
            navigation.navigate("login")
          } 
          else if(err.response.status==500) {
            alert("Please Connect to the Internet")
          }
          // console.log(reason.message)
        })
    
  
      }

    }

    function loadTranslators(){
      // console.log(props.token);
      if (netInfo.isConnected==false || netInfo.isInternetReachable==false) {
       alert("Please Connect to the Internet")
     }
      else{
       Axios.post('http://10.0.2.2:8000/listTranslators',{  
        LanguageFrom:LF,
        CB:CB,
        LanguageTo:LT
      },{
         headers:{authorization:'Bearer ' +token.token},
       }
       ).then((response)=>{
        
           //console.log(response.data.requests);
           setRefreshing(false);
           setTranslators(response.data.translators);
           setIsLoading(false);
          // console.log(requests);
         
     }).catch((err) => {
       if (err.response.status === 401) {
         alert("please Login")
         navigation.navigate("login")
       } 
       else if(err.response.status==500) {
         alert("Please Connect to the Internet")
       }
       // console.log(reason.message)
     })
     }
   }
   
     useEffect(() => {
       loadTranslators();
   }, [session]);


   if(isLoading==false){
    return(
      <View style={styles.inputContainer}>
      <Ionicons name="list-outline"  size={125} style={{marginBottom:20,color:"#4267B3",backgroundColor:"#E9EBEE", borderColor:"#4267B7"}}/>
       <View style={styles.listContainer}>
        {refreshing ?<ActivityIndicator/>:null}
      <FlatList data={translators} renderItem={itemData=>{
        return <>
        <Pressable android_ripple={{color:'#4267B3'}}><View style={styles.request}>
          <View style={{width:'50%', marginLeft:5,marginTop:7}}>
            <Text style={styles.name}>{itemData.item.Name}</Text>
            <Text style={styles.email}>{itemData.item.Email}</Text>
            </View>
            <View style={styles.buttonPlacement}>
            <TouchableOpacity onPress={()=>{ Assign(itemData.item.Email);}}>
        <Text style={button1} >Assign</Text>
        </TouchableOpacity>    
        </View>
        </View>
        </Pressable> 
        </>
      }} ItemSeparatorComponent={<View style={styles.separator}/>} alwaysBounceVertical={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadTranslators}/>}/>
      </View>
      </View>
    )
   }
   else{
    return(<ActivityIndicator style={{marginTop:150}} size={100} animating={true}/>)
  }
};
export default AssignTranslator;

const styles = StyleSheet.create({
  request:{
   margin:8,
   padding:8,
   borderRadius:6,
   backgroundColor:'#90949C',
   flexDirection:'row'
  },
  inputContainer: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#E9EBEE',
    alignItems: 'center',
    justifyContent: 'center',
   // marginBottom:24,
    padding:16,
    // borderBottomColor:"#555555",
    // borderBottomWidth:1,
  },
  name:{
    color:'white',
    fontSize:20,
    // width:"50%"
  },
  email:{
    color:'white',
    fontSize:15,
    // width:"50%"
  },
  image:{
    width:100,
    height:100,
    margin:20
  },
  buttonContainer:{
    flexDirection:"row",
  },
  button:{
    width:100,
    marginTop:16,
    marginHorizontal:8
  },
  listContainer:{
    flex:5,
    width:'100%'
  },

  separator:{
    height:1,
    width:'100%',
    backgroundColor:"#000000"
  },
  buttonPlacement:{
    width:'50%'
  }
});
