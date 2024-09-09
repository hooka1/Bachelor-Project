import { StyleSheet, Text, View, TouchableOpacity, ImageBackground,TextInput, ScrollView} from 'react-native'
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
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'



function ReportType({navigation,route}){
    const [token,setToken]=useState();
// const [user,setUser]=useState();
    const RepT= route.params.ReportType;
    const Session= route.params.report;
    const {user}= useSelector(state=>state.userReducer);
    const[isLoading,setIsLoading]=useState(true);
    const isFocused = useIsFocused();


    const [clientData,setClientData]=useState({
        ReportDescription:"",
      });

      const netInfo = useNetInfo();
    
    useEffect(() => {
      getUser();
     },[isFocused]);
    const getUser = async () => {
    
        const savedToken = await AsyncStorage.getItem("token");
        const currentToken = JSON.parse(savedToken);
        setToken(currentToken);
        setClientData({...clientData,Email:user.Email,dob:user.DOB,PhoneNumber:user.PhoneNumber,Name:user.Name})
        setIsLoading(false);
    
    };


    const sendToBackend = () => {
        console.log(RepT);
  
    
        if (netInfo.isConnected==false || netInfo.isInternetReachable==false) {
            alert("Please Connect to the Internet")
          }
          else{
            if(RepT=="System"){
                Axios.post('http://10.0.2.2:8000/Report',{
                    ReportType:"System",
                    Email: user.Email,
                    ClientName:user.Name,
                    ReportDescription: clientData.ReportDescription,
              },{
               headers:{authorization:'Bearer ' +token.token},
             }
                  ) .then((response)=>{
                   if(response.data.error){
                   }
                   else{
                    alert('Report Submitted');
                    navigation.goBack();

                   }}).catch((err) => {
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
            else if(RepT=="Session"){
                Axios.post('http://10.0.2.2:8000/Report',{
                    ReportType:"Session",
                    TranslatorEmail: Session.TranslatorEmail,
                    TranslatorName:Session.TranslatorName,
                    ClientName:user.Name,
                    SessionId:Session._id,
                    Email: user.Email,
                    ReportDescription: clientData.ReportDescription,
              },{
               headers:{authorization:'Bearer ' +token.token},
             }
                  ) .then((response)=>{
                   if(response.data.error){
                   }
                   else{
                    alert('Report Submitted');
                    navigation.goBack();

                   }}).catch((err) => {
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

}

if(isLoading==false){
    if(RepT=="System"){
        return (
            <View style={styles.container}>
             <ScrollView style={{margin:20}}>
             <Feather name="flag" color={"#4267B3"} size={125} style={{marginBottom:20,alignSelf:"center"}} />
                   {/* <Ionicons name="arrow-redo-outline" color={"#4267B3"}/> */}
                <View style={styles.action2}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Please Enter your Report:</Text>
                    <TextInput defaultValue={""} style={styles.textInput} multiline={true} autoCorrect={false} onChangeText={(text)=> setClientData({...clientData,ReportDescription:text})}/>
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={()=>{sendToBackend()}}>
                    <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity>
             </ScrollView>
            </View>
          )
    }
else if(RepT=="Session"){
    return (
        <View style={styles.container}>
         <ScrollView style={{margin:20}}>
            <Feather name="flag" color={"#4267B3"} size={125} style={{marginBottom:20,alignSelf:"center"}} />
         {/* <Ionicons name="arrow-redo-outline"  size={125} style={{marginBottom:20,color:"#4267B3", alignSelf:"center"}}/> */}
               <Text style={{marginTop:4, fontSize:30, fontStyle:"normal",}}>Session Details:</Text>
            <View style={styles.action}>
                <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Language From: </Text>
                <Text style={styles.text}>{Session.LanguageFrom}</Text>
            </View>
            <View style={styles.action}>
                <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Language To: </Text>
                <Text style={styles.text}>{Session.LanguageTo}</Text>
            </View>
            <View style={styles.action}>
                <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Date: </Text>
                <Text style={styles.text}>{Session.Date}</Text>
            </View>
            <View style={styles.action}>
                <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Time: </Text>
                <Text style={styles.text}>{Session.TimeFrom}</Text>
            </View>
            <View style={styles.action}>
                <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Duration: </Text>
                <Text style={styles.text}>{Session.Duration} Hour</Text>
            </View>
            <View style={styles.action}>
                <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Client Email: </Text>
                <Text style={styles.text}>{Session.ClientEmail}</Text>
            </View>
            <View style={styles.action}>
                <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Translator Name: </Text>
                <Text style={styles.text}>{Session.TranslatorName}</Text>
            </View>
            <View style={styles.action}>
                <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Type: </Text>
                <Text style={styles.text}>{Session.Type}</Text>
            </View>
            <View style={styles.action2}>
                        <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Please Enter your Report: </Text>
                        <TextInput defaultValue={""} multiline={true} style={styles.textInput} autoCorrect={false} onChangeText={(text)=> setClientData({...clientData,ReportDescription:text})}/>
                    </View>
                    <TouchableOpacity style={styles.commandButton} onPress={()=>{sendToBackend()}}>
                        <Text style={styles.panelButtonTitle}>Submit</Text>
                    </TouchableOpacity>
         </ScrollView>
        </View>
      )
}

}
}

export default ReportType

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
        paddingLeft:10,
        marginLeft:5,
        color:'#000000',
        backgroundColor: "#A3A4A6",
        borderRadius: 5,
        paddingHorizontal: 1,
        paddingVertical: 1, flex:1
    }
})