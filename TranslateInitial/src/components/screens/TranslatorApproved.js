import { StyleSheet,View,Text,Pressable,Modal,Image,FlatList,Button, RefreshControl, ActivityIndicator, TouchableOpacity,Platform,Linking, Alert} from 'react-native';
import React, { useEffect, useState } from 'react'
import {button1, button2, button4} from '../../common/button';
import Axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useNetInfo} from "@react-native-community/netinfo";



function TranslatorApproved({navigation,route}) {
  const [requests, setRequests] = useState([]);
  const[refreshing,setRefreshing] =useState(true);
  const {user}= useSelector(state=>state.userReducer);
  const {token}= useSelector(state=>state.userReducer);
  const date= new Date();
  const today= date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
  const Hour=date.getHours();
  const time= route.params.time
  const[isLoading,setIsLoading]=useState(true);
  const isFocused = useIsFocused();
  const netInfo = useNetInfo();

  const triggerCall = (inputValue) => {

    if(Platform.OS==="android"){
      Linking.openURL("tel:"+inputValue)
    }
  };

  function ViewRequestDetails(input){
    
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
        alert("Please Connect to the Internet")
      }
      else{
          navigation.navigate("SessionDetails",{details:input})
    }
}

  function startRequest(input,input2,input3){
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      alert("Please Connect to the Internet")
    }
    else{
  Axios.post('http://10.0.2.2:8000/startSession',{  
    _id:input,
    Type:input2
  },{
    headers:{authorization:'Bearer ' +token.token},
  }
  ).then((response)=>{
    if(response.data.message=="Session Started. Goodluck !!"){
      alert("Session Started. Goodluck !!");
      loadUserRequests();
    }
    else{
      alert("Session Started. Goodluck!! You will now be redirected to make the call")
      triggerCall(input3)
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
  }
  }

  function cancelRequestDone(input){
    setIsLoading(true)
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      alert("Please Connect to the Internet")
    }
    else{
  Axios.post('http://10.0.2.2:8000/cancelApprovedRequestsT',{  
    _id:input
  },{
    headers:{authorization:'Bearer ' +token.token},
  }
  ).then((response)=>{
    if(response.data.message=="Approved Request has been cancelled"){
      alert("Approved Request has been cancelled");
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
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      alert("Please Connect to the Internet")
    }
    else{
    console.log(token.token);
    Axios.get('http://10.0.2.2:8000/myApprovedRequestsT',{
      headers:{authorization:'Bearer ' +token.token},
    }
    ).then((response)=>{
     
        console.log(response.data.requests);
        console.log(today)
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
  if(time=="today"){
    return(
      <View style={styles.inputContainer}>
      <Ionicons name="list-outline"  size={125} style={{marginBottom:20,color:"#4267B3",backgroundColor:"#E9EBEE", borderColor:"#4267B7"}}/>
       <View style={styles.listContainer}>
        {refreshing ?<ActivityIndicator/>:null}
      <FlatList data={requests} renderItem={itemData=>{
        return <>
       {itemData.item.Date==today? <Pressable android_ripple={{color:'#4267B3'}}><View style={styles.request}>
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
            {itemData.item.Date==today&&itemData.item.TimeFrom==Hour && itemData.item.Started==false ?<TouchableOpacity onPress={()=>{ startRequest(itemData.item._id,itemData.item.Type, itemData.item.UserPhoneNumber);}}>
          <Text style={button4} >Start</Text>
          </TouchableOpacity>:<></>  }
          <TouchableOpacity onPress={()=>{ ViewRequestDetails(itemData.item);}}>
        <Text style={button2}>Details</Text>
        </TouchableOpacity>  
            <TouchableOpacity onPress={()=>{ cancelRequest(itemData.item._id);}}>
        <Text style={button1} >Cancel</Text>
        </TouchableOpacity>  
        </View>
        </View>
        </Pressable> :<></>}
        </>
      }} ItemSeparatorComponent={<View style={styles.separator}/>} alwaysBounceVertical={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadUserRequests}/>}/>
      </View>
      </View>
    )
  }
  else{
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
          {itemData.item.Date==today&&itemData.item.TimeFrom==Hour && itemData.item.Started==false ?<TouchableOpacity onPress={()=>{ startRequest(itemData.item._id,itemData.item.Type, itemData.item.UserPhoneNumber);}}>
        <Text style={button4} >Start</Text>
        </TouchableOpacity>:<></>  }
        <TouchableOpacity onPress={()=>{ ViewRequestDetails(itemData.item);}}>
      <Text style={button2}>Details</Text>
      </TouchableOpacity>  
          <TouchableOpacity onPress={()=>{ cancelRequest(itemData.item._id);}}>
      <Text style={button1} >Cancel</Text>
      </TouchableOpacity>  
      </View>
      </View>
      </Pressable> 
      </>
    }} ItemSeparatorComponent={<View style={styles.separator}/>} alwaysBounceVertical={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadUserRequests}/>}/>
    </View>
    </View>
  )
}
}
else{
  return(<ActivityIndicator style={{marginTop:150}} size={100} animating={true}/>)
}
}
export default TranslatorApproved;

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
