// import { StyleSheet,View,Text,Pressable,Modal,Image,FlatList,Button, RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';
// import React, { useEffect, useState } from 'react'
// import {button1,button2} from '../../common/button';
// import Axios from 'axios';
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import { useSelector,useDispatch } from 'react-redux';

// function TranslatorRequests(props) {
//   const [requests, setRequests] = useState([]);
//   const[refreshing,setRefreshing] =useState(true);

// function approveRequest(input){
//     Axios.post('http://10.0.2.2:8000/acceptSession',{  
//         LanguageFrom: input.LanguageFrom,
//         LanguageTo: input.LanguageTo,
//         Date: input.Date,
//         TimeFrom: input.TimeFrom,
//         Duration:input.Duration,
//         ClientEmail:input.ClientEmail,
//         TranslatorEmail:props.user,
//         _id:input._id
//       },{
//         headers:{authorization:'Bearer ' +props.token},
//       }
//       ).then((response)=>{
//         if(response.data.message==="Request Accepted, please check approved section for details on this session"){
//           console.log(response.data.cor);
//           alert(response.data.message);
//           loadUserRequests();
//         }
//     })
// }

//   function cancelRequest(input){
//   Axios.post('http://10.0.2.2:8000/declineRequest',{  
//     _id:input
//   },{
//     headers:{authorization:'Bearer ' +props.token},
//   }
//   ).then((response)=>{
//     if(response.data.message=="Request has been declined"){
//       alert("Request has been declined");
//       loadUserRequests();
//     }
// })
//   }

//   function loadUserRequests(){
//     console.log(props.token);
//     Axios.get('http://10.0.2.2:8000/myRequestsT',{
//       headers:{authorization:'Bearer ' +props.token},
//     }
//     ).then((response)=>{
     
//         console.log(response.data.requests);
//         setRefreshing(false);
//         setRequests(response.data.requests);
//         console.log(requests);
//         // navigation.navigate('verification', {userdata:response.data.udata}); 
      
//     // else{
//     //   if(response.data.error){
//     //     setErrormsg(response.data.error);
//     //     return
//     //   }
//     // }
//   })
//   }

//   useEffect(() => {
//     loadUserRequests();
// }, []);

//     return(
//     // <Pressable android_ripple={{color:'#ff0000'}} onPress={props.onCancel.bind(this,props.id)}>
//     // <Modal visible={props.showModal} animationType="slide" >
//     //   <View style={styles.request}>
//     //     <Text style={styles.requestText}>hi</Text>
//     //   </View>
//     // </Modal>
//     <Modal visible={props.showModal} animationType="slide" >
//    <View style={styles.inputContainer}>
//         <Image style={styles.image} source={require('../../../assets/images/search.png')} />
//         <View style={styles.buttonContainer}> 
//         <View style={styles.button}>
//         <Button title="Cancel" onPress={props.goBackToHub} color="#f31282"/>
//         </View>
//         </View>
//          <View style={styles.listContainer}>
//           {refreshing ?<ActivityIndicator/>:null}
//         <FlatList data={requests} renderItem={itemData=>{
//           return <>
//           <Pressable android_ripple={{color:'#ff0000'}}><View style={styles.request}>
//               <Text style={styles.requestText}>{itemData.item.LanguageFrom} {itemData.item.LanguageTo}</Text>
//           </View>
//           </Pressable> 
//           <TouchableOpacity onPress={()=>{ approveRequest(itemData.item);}}>
//           <Text style={button2} >Approve Request</Text>
//           </TouchableOpacity> 
//           <TouchableOpacity onPress={()=>{ cancelRequest(itemData.item._id);}}>
//           <Text style={button1} >Cancel Request</Text>
//           </TouchableOpacity>        
//           </>
//         }} alwaysBounceVertical={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadUserRequests}/>}/>
//         </View>
//         </View>
//         </Modal>
//     // </Pressable> 
//     )
// }
// export default TranslatorRequests;

// const styles = StyleSheet.create({
//     request:{
//      margin:8,
//      padding:8,
//      borderRadius:6,
//      backgroundColor:'#5e0acc',
//     },
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
//     requestText:{
//       color:'white',
//     },
//     image:{
//       width:100,
//       height:100,
//       margin:20
//     },
//     buttonContainer:{
//       flexDirection:"row",
//     },
//     button:{
//       width:100,
//       marginTop:16,
//       marginHorizontal:8
//     },
//     listContainer:{
//       flex:5,
//     },
//   });
  

import { StyleSheet,View,Text,Pressable,Modal,Image,FlatList,Button, RefreshControl, ActivityIndicator, TouchableOpacity, Alert} from 'react-native';
import React, { useEffect, useState } from 'react'
import {button1,button2, button4} from '../../common/button';
import Axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector,useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {useNetInfo} from "@react-native-community/netinfo";


function TranslatorRequests({navigation}) {
  const [requests, setRequests] = useState([]);
  const[refreshing,setRefreshing] =useState(true);

  const {user}= useSelector(state=>state.userReducer);
  const {token}= useSelector(state=>state.userReducer);

  const[isLoading,setIsLoading]=useState(true);

  const isFocused = useIsFocused();
  const netInfo = useNetInfo();

  function ViewRequestDetails(input){
    
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
        alert("Please Connect to the Internet")
      }
      else{
          navigation.navigate("SessionDetails",{details:input})
    }
}

function approveRequest(input){
  setIsLoading(true)
  if (!netInfo.isConnected || !netInfo.isInternetReachable) {
    alert("Please Connect to the Internet")
  }
  else{
    Axios.post('http://10.0.2.2:8000/acceptSession',{  
        LanguageFrom: input.LanguageFrom,
        LanguageTo: input.LanguageTo,
        Date: input.Date,
        TimeFrom: input.TimeFrom,
        Duration:input.Duration,
        ClientEmail:input.ClientEmail,
        TranslatorEmail:user.Email,
        _id:input._id
      },{
        headers:{authorization:'Bearer ' +token.token},
      }
      ).then((response)=>{
        if(response.data.message==="Request Accepted, please check approved section for details on this session"){
          console.log(response.data.cor);
          alert(response.data.message);
          loadUserRequests();
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
}}

  function cancelRequestDone(input){
    setIsLoading(true)
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      alert("Please Connect to the Internet")
    }
    else{
  Axios.post('http://10.0.2.2:8000/declineRequest',{  
    _id:input
  },{
    headers:{authorization:'Bearer ' +token.token},
  }
  ).then((response)=>{
    if(response.data.message=="Request has been declined"){
      alert("Request has been declined");
      loadUserRequests();
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
  }}

  function cancelRequest(input){
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to cancel this session?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
cancelRequestDone(input)          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
}

  function loadUserRequests(){
    if (netInfo.isConnected==false || netInfo.isInternetReachable==false) {
      alert("Please Connect to the Internet")
    }
    else{
    console.log(token.token);
    Axios.get('http://10.0.2.2:8000/myRequestsT',{
      headers:{authorization:'Bearer ' +token.token},
    }
    ).then((response)=>{
     
        console.log(response.data.requests);
        setRefreshing(false);
        setRequests(response.data.requests);
        setIsLoading(false);
        console.log(requests);
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
  }}

  useEffect(() => {
  if(isFocused)
    loadUserRequests();
}, [isFocused]);

if(isLoading==false){
  return(
    <View style={styles.inputContainer}>
    <Ionicons name="list-outline"  size={125} style={{marginBottom:20,color:"#4267B3",backgroundColor:"#E9EBEE", borderColor:"#4267B7"}}/>
     <View style={styles.listContainer}>
      {refreshing ?<ActivityIndicator/>:null}
    <FlatList data={requests} renderItem={itemData=>{
      return <>
      <Pressable android_ripple={{color:'#4267B3'}}><View style={styles.request}>
        <View style={{width:'50%'}}>
          <Text style={styles.requestText}>{itemData.item.LanguageFrom} To {itemData.item.LanguageTo}</Text>
          {
                itemData.item.TimeFrom<12?            
                <Text style={styles.requestText}>{itemData.item.Date} at {itemData.item.TimeFrom} AM</Text>:  
                itemData.item.TimeFrom==12?      
                <Text style={styles.requestText}>{itemData.item.Date} at {itemData.item.TimeFrom} PM</Text>
:               
                 <Text style={styles.requestText}>{itemData.item.Date} at {itemData.item.TimeFrom-12} PM</Text>
              }
                      <Text style={styles.requestText}>Duration: {itemData.item.Duration} Hours</Text>
          </View>
          <View style={styles.buttonPlacement}>
          <TouchableOpacity onPress={()=>{ approveRequest(itemData.item);}}>
          <Text style={button4} >Approve</Text>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>{ ViewRequestDetails(itemData.item);}}>
      <Text style={button2}>Details</Text>
      </TouchableOpacity> 
          <TouchableOpacity onPress={()=>{ cancelRequest(itemData.item._id);}}>
      <Text style={button1} >Cancel</Text>
      </TouchableOpacity>    
      </View>
      </View>
      </Pressable> 
      {/* <TouchableOpacity onPress={()=>{ cancelRequest(itemData.item._id);}}>
      <Text style={button1} >Cancel Request</Text>
      </TouchableOpacity>    
      <TouchableOpacity onPress={()=>{ assignTranslator(itemData.item._id);}}>
      <Text style={button2} >Assign Translator</Text>
      </TouchableOpacity>       */}
      </>
    }} ItemSeparatorComponent={<View style={styles.separator}/>} alwaysBounceVertical={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadUserRequests}/>}/>
    </View>
    </View>
  )
}
else{
  return(<ActivityIndicator style={{marginTop:150}} size={100} animating={true}/>)
}
}
export default TranslatorRequests;

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
  requestText:{
    color:'white',
    fontSize:20,
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
  