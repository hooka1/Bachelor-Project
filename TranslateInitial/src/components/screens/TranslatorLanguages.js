import { StyleSheet,View,Text,Pressable,Modal,Image,FlatList,Button, RefreshControl, ActivityIndicator, TouchableOpacity,Platform, Alert} from 'react-native';
import React, { useEffect, useState } from 'react'
import button, {button1, button2} from '../../common/button';
import Axios from 'axios';
import {AxiosError} from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector,useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import {useNetInfo} from "@react-native-community/netinfo";
import SelectDropdown from 'react-native-select-dropdown';



function TranslatorLanguages({navigation}) {
  const [languages, setLanguages] = useState([]);
  const[refreshing,setRefreshing] =useState(true);

  // const [token,setToken]=useState();
  // const [user,setUser]=useState();
  const {user}= useSelector(state=>state.userReducer);
  const {token}= useSelector(state=>state.userReducer);

  const[isLoading,setIsLoading]=useState(true);
  const isFocused = useIsFocused();
  const netInfo = useNetInfo();

  const [addLang,setAddLang]=useState("");
  // const languageChoices =["Arabic", "English","Italian","French","German","Spanish","Japanese","Chinese","Korean"];
  const [languageChoices,setLanguageChoices]=useState([]);
  var lang= [];
  const [displang,setDL]=useState([])



  function deleteLanguageDone(input){
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      alert("Please Connect to the Internet")
    }

  else{
  Axios.post('http://10.0.2.2:8000/deleteLanguage',{  
    language:input
  },{
    headers:{authorization:'Bearer ' +token.token},
  }
  ).then((response)=>{
    if(response.data.message=="Language Removed"){
      alert("Language Removed");
      loadLanguages();
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

function deleteLanguage(input){
  return Alert.alert(
    "Are your sure?",
    "Are you sure you want to remove this language?",
    [
      // The "Yes" button
      {
        text: "Yes",
        onPress: () => {
          deleteLanguageDone(input)          },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]
  );
}

function addLanguage(){
  if (!netInfo.isConnected || !netInfo.isInternetReachable) {
    alert("Please Connect to the Internet")
  }

else{
Axios.put('http://10.0.2.2:8000/addLanguages',{  
  language:addLang
},{
  headers:{authorization:'Bearer ' +token.token},
}
).then((response)=>{
  if(response.data.message=="Language Added"){
    alert("Language Added");
    loadLanguages();
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

  function loadLanguages(){
   // console.log(props.token);
   if (netInfo.isConnected==false || netInfo.isInternetReachable==false) {
    alert("Please Connect to the Internet")
  }
   else{

  //   Axios.get('http://10.0.2.2:8000/getLanguagesT',{
  //     headers:{authorization:'Bearer ' +token.token},
  //   }
  //   ).then((response)=>{
  //    setLanguageChoices(response.data.lang)
      
  // }).catch((err) => {
  //   if (err.response.status === 401) {
  //     alert("please Login")
  //     navigation.navigate("login")
  //   } 
  //   else if(err.response.status==500) {
  //     alert("Please Connect to the Internet")
  //   }
  //   // console.log(reason.message)
  // })



    Axios.get('http://10.0.2.2:8000/myLanguages',{
      headers:{authorization:'Bearer ' +token.token},
    }
    ).then((response)=>{
     
        //console.log(response.data.requests);
        setRefreshing(false);
        setLanguages(response.data.languages);

        var lan=response.data.lang
       
        const langlist=response.data.languages
        lan.forEach(language=>{
            var bool=true;
            langlist.forEach(element => {
              if(element.language==language){
                bool=false;
                return;
              }
            });
            if(bool==true){
              console.log(language)
              lang.push(language)
            }
          })
console.log(lang)
          setDL(lang)
      
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
    loadLanguages();
}, [isFocused]);

if(isLoading==false){
    return(
      <View style={styles.inputContainer}>
      <Ionicons name="list-outline"  size={125} style={{marginBottom:20,color:"#4267B3",backgroundColor:"#E9EBEE", borderColor:"#4267B7"}}/>
      <View style={{flexDirection:"row"}}>
      <SelectDropdown data={displang} buttonStyle={styles.text} defaultButtonText="Language List" buttonTextStyle={{fontWeight:'bold',color:"#fff"}} onSelect={(selectedItem)=>{setAddLang(selectedItem); console.log(addLang)}}/>
      <TouchableOpacity onPress={()=>{ addLanguage();}}>
        <Text style={button2} >Add Language</Text>
        </TouchableOpacity>
      </View>
       <View style={styles.listContainer}>
        {refreshing ?<ActivityIndicator/>:null}
      <FlatList data={languages} renderItem={itemData=>{
        return <>
        <Pressable android_ripple={{color:'#4267B3'}}><View style={styles.request}>
          <View style={{width:'50%'}}>
            <Text style={styles.requestText}>{itemData.item.language}</Text>
            </View>
            <View style={styles.buttonPlacement}>
            <TouchableOpacity onPress={()=>{ deleteLanguage(itemData.item.language);}}>
        <Text style={button1} >Remove Language</Text>
        </TouchableOpacity>    
        </View>
        </View>
        </Pressable> 
        </>
      }} ItemSeparatorComponent={<View style={styles.separator}/>} alwaysBounceVertical={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadLanguages}/>}/>
      </View>
      </View>
    )
}
}
export default TranslatorLanguages;

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
  },
  text:{
    // marginRight:8,
     padding: 10,
     borderWidth:1,
     marginBottom:0,
     marginTop:8,
     // borderColor:'#f1e7c0',
     borderColor:'#dddddd',
     borderRadius:6,
     width:'50%',
     // backgroundColor:'#f1e7d0',
     backgroundColor:'#90949C',
     color:'#120438'
   },
});