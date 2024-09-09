import { StyleSheet,View,Text,Pressable,Modal,Image,FlatList,Button, RefreshControl, ActivityIndicator, TouchableOpacity, Alert} from 'react-native';
import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector,useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {useNetInfo} from "@react-native-community/netinfo";
import { button1,button2 } from '../../../common/button';
import { TextInput } from 'react-native-gesture-handler';
import { errormessage, input, input2 } from '../../../common/form';

function UserList({navigation,route}) {
  const [users, setUsers] = useState([]);
  const[refreshing,setRefreshing] =useState(true);
  const [userRole,setUserRole]=useState("");
  const {token}= useSelector(state=>state.userReducer);
 const role= route.params.role;
  const[isLoading,setIsLoading]=useState(true);
  const [errormsg, setErrormsg] = useState(null);
 const [showCancel, setShowCancel]= useState(false);


  const [search,setSearch]=useState("");

  const isFocused = useIsFocused();
  const netInfo = useNetInfo();

  function viewUserDetails(input){
    navigation.navigate('UserDetails',{details:input})
  }

  function cancelSearch(){
    setIsLoading(true)
    setShowCancel(false)
    setErrormsg(null)
    loadUsers();
  }

  function searchUser(){
    setShowCancel(true)
    setIsLoading(true)
    if (netInfo.isConnected==false || netInfo.isInternetReachable==false) {
      alert("Please Connect to the Internet")
    }
    else if(search==""){
      setErrormsg("Please Enter valid Email")
    }
    else{
      Axios.post('http://10.0.2.2:8000/SearchUser',{
        role:role,
        Email:search
    },{
      headers:{authorization:'Bearer ' +token.token},
    }
    ).then((response)=>{
     if(response.data.message=="Found"){
      console.log(response.data.users);
      setRefreshing(false);
      setUsers(response.data.users);
      setIsLoading(false)
      console.log(users);
     }
     else{
      console.log(response.data.message)
      setIsLoading(false)
      setErrormsg(response.data.message)
     }

  }).catch((err) => {
    if (err.response.status === 401) {
      alert("please Login")
      navigation.navigate("login")
    } 
    else if(err.response.status==500) {
      alert("Please Connect to the Internet")
    }
    else{
      setErrormsg(r)
    }
    // console.log(reason.message)
  })
  }
}

function removeUser(input){
  return Alert.alert(
    "Are your sure?",
    "Are you sure you want to remove this user?",
    [
      // The "Yes" button
      {
        text: "Yes",
        onPress: () => {
          removeUserDone(input)          },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]
  );
}

  function removeUserDone(input){
    setIsLoading(true)
    if (netInfo.isConnected==false || netInfo.isInternetReachable==false) {
      alert("Please Connect to the Internet")
    }
    else{
  Axios.post('http://10.0.2.2:8000/removeUser',{  
    _id:input
  },{
    headers:{authorization:'Bearer ' +token.token},
  }
  ).then((response)=>{
    if(response.data.message=="User has been removed"){
        if(role==1){
            alert("Client has been removed");

        }
      else if(role==2){
        alert("Translator has been removed");
      }
      else{
        alert("Admin has been removed");
      }
      loadUsers();
    }
})
// .catch((err) => {
//   if (err.response.status === 401) {
//     alert("please Login")
//     navigation.navigate("login")
//   } 
//   else if(err.response.status==500) {
//     alert("Please Connect to the Internet")
//     navigation.navigate("login")
//   }
//   // console.log(reason.message)
// })
  }
}

  function loadUsers(){
    if (netInfo.isConnected==false || netInfo.isInternetReachable==false) {
      alert("Please Connect to the Internet")
    }
    else{
        console.log(role)
        if(role==1){
            setUserRole("Client")
        }
        else if(role==2){
            setUserRole("Translator")
        }
        else {
            setUserRole("Admin")
        }
    console.log(token.token);
    Axios.post('http://10.0.2.2:8000/getUsers',{
        role:role
    },{
      headers:{authorization:'Bearer ' +token.token},
    }
    ).then((response)=>{
     
        console.log(response.data.users);
        setRefreshing(false);
        setUsers(response.data.users);
        setIsLoading(false)
        console.log(users);
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
    loadUsers();
}, [isFocused]);

if(isLoading==false){
return(
   <View style={styles.inputContainer}>
        <Ionicons name="list-outline"  size={125} style={{marginBottom:10,color:"#4267B3",backgroundColor:"#E9EBEE", borderColor:"#4267B7"}}/>
        <View style={{width:"100%"}}>
        {errormsg?<Text style={errormessage}>{errormsg}</Text>:null}
        </View>
        <View style={{flexDirection:'row', alignSelf:"center"}}>
        <TextInput placeholder="Email or Username" style={styles.search} placeholderTextColor={"#A3A4A6"} onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setSearch(text)}/>
        <TouchableOpacity onPress={()=>{ searchUser();}}>
          <Text style={styles.sb} >Search</Text>
          </TouchableOpacity>  
          {showCancel? 
          <TouchableOpacity style={styles.close} onPress={()=>{ cancelSearch();}}>
          <Text>               
           <Ionicons name="close-outline" color="#000000" size={30} />
          </Text>
          </TouchableOpacity>  : <></>
        } 
            
        </View>
         <View style={styles.listContainer}>
          {refreshing ?<ActivityIndicator/>:null}
        <FlatList data={users} renderItem={itemData=>{
          return <>
          <Pressable android_ripple={{color:'#4267B3'}}><View style={styles.request}>
            <View style={{width:'50%'}}>
              <Text style={styles.requestText}>{itemData.item.Name}</Text>
              <Text style={styles.requestText}>{itemData.item.Username}</Text>
              <Text style={styles.requestText}>{itemData.item.Email}</Text>
              <Text style={styles.requestText}>{itemData.item.PhoneNumber}</Text>
              </View>
              <View style={styles.buttonPlacement}>
              <TouchableOpacity onPress={()=>{ viewUserDetails(itemData.item);}}>
          <Text style={button2} >{userRole} Details</Text>
          </TouchableOpacity>
              <TouchableOpacity onPress={()=>{ removeUser(itemData.item._id);}}>
          <Text style={button1} >Remove {userRole}</Text>
          </TouchableOpacity>    
          </View>
          </View>
          </Pressable> 
          </>
        }} ItemSeparatorComponent={<View style={styles.separator}/>} alwaysBounceVertical={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadUsers}/>}/>
        </View>
        </View>

    )
}
else{
  return(<ActivityIndicator style={{marginTop:150}} size={100} animating={true}/>)
}
}
export default UserList;

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
  input: {
    backgroundColor: "#FFB0CC",
    borderRadius: 20,
    padding: 10,
},

  separator:{
    height:1,
    width:'100%',
    backgroundColor:"#000000"
  },
  buttonPlacement:{
    width:'50%'
  },
  search:{
    backgroundColor: "#D1D3D6",
    borderRadius: 5,
    borderColor:"#D1D3D6",
    paddingHorizontal: 10,
    paddingVertical: 10,
    color:'#000000',
     width:"60%",
    height:50,
    marginTop:9
  },
  close:{
    backgroundColor: "#90949C",
    borderRadius: 5,
    borderColor:"#D1D3D6",
    paddingHorizontal: 10,
    paddingVertical: 10,
    // color:'#000000',
     width:"13%",
    height:50,
    marginTop:9,
    marginLeft:1
  },
  sb:{
    backgroundColor: '#4267B3',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    textAlign: 'center',
    marginTop:9,
    marginLeft:1,
    marginRight:1,
    //  width:"20%",
    height:50,
  }
});
