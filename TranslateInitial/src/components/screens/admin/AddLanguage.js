import { StyleSheet, Text, View, TouchableOpacity, ImageBackground,TextInput, ScrollView, Alert} from 'react-native'
import React from 'react'
import {useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../../../redux/actions';
import {useNetInfo} from "@react-native-community/netinfo";
import SelectDropdown from 'react-native-select-dropdown';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'



function AddLanguage({navigation,route}){
    const {token}= useSelector(state=>state.userReducer);
    const {user}= useSelector(state=>state.userReducer);
    const[isLoading,setIsLoading]=useState(true);
    const isFocused = useIsFocused();

    const langlist = [
        "Afrikaans",
        "Albanian",
        "Arabic",
        "Armenian",
        "Azerbaijani",
        "Belarusian",
        "Bengali",
        "Bosnian",
        "Bulgarian",
        "Chinese",
        "Croatian",
        "Czech",
        "Danish",
        "Dutch",
        "English",
        "Estonian",
        "Faroese",
        "Filipino",
        "French",
        "Finnish",
        "Georgian",
        "German",
        "Greek",
        "Hawaiian",
        "Hindi",
        "Hungarian",
        "Icelandic",
        "Indonesian",
        "Italian",
        "Japanese",
        "Korean",
        "Kurdish",
        "Lao",
        "Latvian",
        "Lithuanian",
        "Macedonian",
        "Malay",
        "Maltese",
        "Mongolian",
        "Nepali",
        "Norwegian",
        "Persian",
        "Polish",
        "Portuguese",
        "Romanian",
        "Russian",
        "Serbian",
        "Slovakian",
        "Slovenian",
        "Somali",
        "Spanish",
        "Sundanese",
        "Swahili",
        "Swedish",
        "Thai",
        "Turkish",
        "Ukrainian",
        "Urdu",
        "Uyghur",
        "Uzbek",
        "Vietnamese",
        "Welsh",
        "Yoruba",
        "Zulu"
    ];

    const [languages,setLanguages]= useState([])
    const [dispLang,setDispLang]= useState([])

    function deleteLanguageDone(){
        if (!netInfo.isConnected || !netInfo.isInternetReachable) {
          alert("Please Connect to the Internet")
        }

        else if(delLang==""){
            alert("Please Select a Language")
        }
    
      else{
      Axios.post('http://10.0.2.2:8000/removeLanguage',{  
        Language:delLang
      },{
        headers:{authorization:'Bearer ' +token.token},
      }
      ).then((response)=>{
        if(response.data.message=="Language Removed"){
          alert("Language Removed");
          setDelLang("");
          loadLanguages()
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

    function deleteLanguage(){
      return Alert.alert(
        "Are your sure?",
        "Are you sure you want to remove this language from the system?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              deleteLanguageDone()          },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    }

    function loadLanguages(){
        // console.log(props.token);
        if (netInfo.isConnected==false || netInfo.isInternetReachable==false) {
         alert("Please Connect to the Internet")
       }
        else{
     
     
         Axios.get('http://10.0.2.2:8000/getLanguagesA',{
           headers:{authorization:'Bearer ' +token.token},
         }
         ).then((response)=>{

            var lang=[]
            console.log(response.data.lang)
             var lan=response.data.lang
             setDispLang(lan);
             langlist.forEach(language=>{
                 var bool=true;
                 lan.forEach(element => {
                    // console.log(element)
                    // console.log(language)
                   if(element==language){
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
               setLanguages(lang)
           
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

    const [langData,setLangData]=useState("");
    const [delLang,setDelLang]=useState("");


      const netInfo = useNetInfo();
    
    useEffect(() => {
      getUser();
     },[isFocused]);
    const getUser = async () => {
    
        // const savedToken = await AsyncStorage.getItem("token");
        // const currentToken = JSON.parse(savedToken);
        // setToken(currentToken);
        loadLanguages();
        setIsLoading(false);
    
    };


    const sendToBackend = () => {
  
    
        if (netInfo.isConnected==false || netInfo.isInternetReachable==false) {
            alert("Please Connect to the Internet")
          }
          else if(langData==""){
            alert("Please Select a Language")
        }
          else{
        
                Axios.post('http://10.0.2.2:8000/addLanguage',{
                    Language:langData,
              },{
               headers:{authorization:'Bearer ' +token.token},
             }
                  ) .then((response)=>{
                   
                    alert(response.data.message);
                    setLangData("")
                    loadLanguages()
                   }).catch((err) => {
                       if (err.response.status === 401) {
                         alert("please Login")
                         navigation.navigate("login")
                       } 
                       else if(err.response.status==500) {
                         alert("Please Fill Description Field")
                       }
                       // console.log(reason.message)
                     })
            }
           

}

if(isLoading==false){
        return (
            <View style={styles.container}>
             <ScrollView style={{margin:20}}>
             <Feather name="flag" color={"#4267B3"} size={125} style={{marginBottom:20,alignSelf:"center"}} />
                   {/* <Ionicons name="arrow-redo-outline" color={"#4267B3"}/> */}
                <View style={styles.action2}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Select a new Language to Add:</Text>
                    <SelectDropdown data={languages} buttonStyle={styles.text} defaultButtonText="Language List" buttonTextStyle={{fontWeight:'bold',color:"#fff"}} onSelect={(selectedItem)=>{setLangData(selectedItem); console.log(langData)}}/>
                    <TouchableOpacity style={styles.commandButton} onPress={()=>{sendToBackend()}}>
                    <Text style={styles.panelButtonTitle}>Add</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.action2}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Remove Language From System:</Text>
                    <SelectDropdown data={dispLang} buttonStyle={styles.text} defaultButtonText="Language List" buttonTextStyle={{fontWeight:'bold',color:"#fff"}} onSelect={(selectedItem)=>{setDelLang(selectedItem); console.log(delLang)}}/>
                    <TouchableOpacity style={styles.commandButton} onPress={()=>{deleteLanguage()}}>
                    <Text style={styles.panelButtonTitle}>Remove</Text>
                </TouchableOpacity>
                </View>
             </ScrollView>
            </View>
          )


}
}

export default AddLanguage

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    commandButton:{
        padding:15,
        borderRadius:10,
        backgroundColor:'#F50057',
        alignItems:'center',
        marginTop:5,
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
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    action2:{
        flexDirection:'column',
        marginTop:10,
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5,
        // alignItems:"center"
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
        color:'#000000',
        backgroundColor: "#D1D3D6",
        borderColor:"#D1D3D6",
        borderRadius: 5,
        paddingHorizontal: 1,
        paddingVertical: 1,
    },
    text:{
        marginTop:6, 
        fontSize:17, 
        padding:10,
        // marginLeft:5,
        color:'#000000',
        backgroundColor: "#A3A4A6",
        borderRadius: 5,
        // borderBottomLeftRadius:5,
        // paddingHorizontal: 1,
        // paddingVertical: 1, 
        flex:1,
        alignSelf:"center",
        width:"100%"
    }
})