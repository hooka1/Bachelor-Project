import { StyleSheet,View,Text,Pressable,Modal,Image,FlatList,Button, RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react'
import { button1,button2 } from '../../../common/button';
import Axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNetInfo} from "@react-native-community/netinfo";



function UnreportedPrevious({navigation}) {
  const [requests, setRequests] = useState([]);
  const[refreshing,setRefreshing] =useState(true);

  const {user}= useSelector(state=>state.userReducer);
  const {token}= useSelector(state=>state.userReducer);

  const[isLoading,setIsLoading]=useState(true);
  const isFocused = useIsFocused();
  const netInfo = useNetInfo();


  function ReportRequest(input){

    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      alert("Please Connect to the Internet")
    }
    else{
        navigation.navigate("report",{report:input, ReportType:"Session"})
  }
}

function ViewRequestDetails(input){
    
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
        alert("Please Connect to the Internet")
      }
      else{
          navigation.navigate("SessionDetails",{details:input})
    }
}

  function loadUserRequests(){
   // console.log(props.token);
   if (netInfo.isConnected==false || netInfo.isInternetReachable==false) {
    alert("Please Connect to the Internet")
  }
  else{
    Axios.get('http://10.0.2.2:8000/myUnreportedPreviousRequests',{
      headers:{authorization:'Bearer ' +token.token},
    }
    ).then((response)=>{
     
       // console.log(response.data.requests);
        setRefreshing(false);
        setRequests(response.data.requests);
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
          <Text style={styles.requestText}>{itemData.item.Date} at {itemData.item.TimeFrom} PM</Text>
          <Text style={styles.requestText}>Duration: {itemData.item.Duration} Hours</Text>
          </View>
          <View style={styles.buttonPlacement}>
          <TouchableOpacity onPress={()=>{ ViewRequestDetails(itemData.item);}}>
      <Text style={button2}>Details</Text>
      </TouchableOpacity>  
          <TouchableOpacity onPress={()=>{ ReportRequest(itemData.item);}}>
      <Text style={button1} >Report</Text>
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
export default UnreportedPrevious;

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
