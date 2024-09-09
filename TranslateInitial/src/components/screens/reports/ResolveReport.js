import { StyleSheet, Text, View, TouchableOpacity, ImageBackground,TextInput, ScrollView, ActivityIndicator} from 'react-native'
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
import { button2, button3 } from '../../../common/button';



const ResolveReport = ({navigation,route}) => {
    const [token,setToken]=useState();
    const Report= route.params.details;
    const {user}= useSelector(state=>state.userReducer);
    const[isLoading,setIsLoading]=useState(true);
    const isFocused = useIsFocused();


    const [resolveData,setResolveData]=useState({
        ResolveDescription:"",
      });

    const [warnTranslator,setWarnTranslator]=useState(false);

      const netInfo = useNetInfo();
    
    useEffect(() => {
      getUser();
     },[isFocused]);
    const getUser = async () => {
    
        const savedToken = await AsyncStorage.getItem("token");
        const currentToken = JSON.parse(savedToken);
        setToken(currentToken);
        setIsLoading(false);
    
    };


    const sendToBackend = () => {
  setIsLoading(true)
    
        if (!netInfo.isConnected || !netInfo.isInternetReachable) {
            alert("Please Connect to the Internet")
          }
          else{
            if(Report.ReportType=="System"){
                console.log(Report.ReportType);

                Axios.put('http://10.0.2.2:8000/RespondToReport',{
                    ReportType:"System",
                    _id: Report._id,
                    ResolveAnswer: resolveData.ResolveDescription,
                    ClientEmail:Report.ClientEmail
              },{
               headers:{authorization:'Bearer ' +token.token},
             }
                  ) .then((response)=>{
                   if(response.data.error){
                   }
                   else{
                    alert('Report Resolved');
                    navigation.goBack();

                   }}).catch((err) => {
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
            else if(Report.ReportType=="Session"){
                Axios.put('http://10.0.2.2:8000/RespondToReport',{
                    ReportType:"Session",
                    updateWS:warnTranslator,
                    _id: Report._id,
                    TranslatorEmail: Report.TranslatorEmail,
                    TranslatorWarnStatus: Report.TranslatorWarnStatus,
                    ResolveAnswer: resolveData.ResolveDescription,
                    ClientEmail:Report.ClientEmail

              },{
               headers:{authorization:'Bearer ' +token.token},
             }
                  ) .then((response)=>{
                   if(response.data.error){
                   }
                   else{
                    alert('Report Resolved');
                    navigation.goBack();

                   }}).catch((err) => {
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

}

if(isLoading==false){
    if(Report.ReportType=="System"){
        return (
            <View style={styles.container}>
             <ScrollView style={{margin:20}}>
             <Feather name="flag" color={"#4267B3"} size={125} style={{marginBottom:20,alignSelf:"center"}} />
                   {/* <Ionicons name="arrow-redo-outline" color={"#4267B3"}/> */}
                   <View style={styles.action}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Client Email: </Text>
                    <Text style={styles.text}>{Report.ClientEmail}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Client Name: </Text>
                    <Text style={styles.text}>{Report.ClientName}</Text>
                </View>
                   <View style={styles.action2}>
                            <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Report Description: </Text>
                            <Text style={styles.text}>{Report.ReportDescription}</Text>
                        </View>
                <View style={styles.action2}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Resolve Response:</Text>
                    <TextInput defaultValue={""} style={styles.textInput} multiline={true} autoCorrect={false} onChangeText={(text)=> setResolveData({...resolveData,ResolveDescription:text})}/>
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={()=>{sendToBackend()}}>
                    <Text style={styles.panelButtonTitle}>Resolve</Text>
                </TouchableOpacity>
             </ScrollView>
            </View>
          )
    }
    else if(Report.ReportType=="Session"){
        return (
            <View style={styles.container}>
             <ScrollView style={{margin:20}}>
                <Feather name="flag" color={"#4267B3"} size={125} style={{marginBottom:20,alignSelf:"center"}} />
             {/* <Ionicons name="arrow-redo-outline"  size={125} style={{marginBottom:20,color:"#4267B3", alignSelf:"center"}}/> */}
                   <Text style={{marginTop:4, fontSize:30, fontStyle:"normal",}}>Report Details:</Text>
                   <View style={styles.action}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Session ID: </Text>
                    <Text style={styles.text}>{Report.SessionId} Hour</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Client Email: </Text>
                    <Text style={styles.text}>{Report.ClientEmail}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Client Name: </Text>
                    <Text style={styles.text}>{Report.ClientName}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Translator Email: </Text>
                    <Text style={styles.text}>{Report.TranslatorEmail}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Translator Name: </Text>
                    <Text style={styles.text}>{Report.TranslatorName}</Text>
                </View>
                <View style={styles.action}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Translator Warning Level: </Text>
                    <Text style={styles.text}>{Report.TranslatorWarnStatus}</Text>
                </View>
                <View style={styles.action2}>
                            <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Report Description: </Text>
                            <Text style={styles.text}>{Report.ReportDescription}</Text>
                        </View>
                        {warnTranslator==false ?<TouchableOpacity onPress={()=>{ setWarnTranslator(true);}}>
      <Text style={button2} >Warn</Text>
      </TouchableOpacity>:<TouchableOpacity>
      <Text style={button3} >Warn</Text>
      </TouchableOpacity> }
                <View style={styles.action2}>
                    <Text style={{marginTop:4, fontSize:20, fontStyle:"normal"}}>Resolve Response:</Text>
                    <TextInput defaultValue={""} style={styles.textInput} multiline={true} autoCorrect={false} onChangeText={(text)=> setResolveData({...resolveData,ResolveDescription:text})}/>
                </View>
                        <TouchableOpacity style={styles.commandButton} onPress={()=>{sendToBackend()}}>
                            <Text style={styles.panelButtonTitle}>Resolve</Text>
                        </TouchableOpacity>
             </ScrollView>
            </View>
          )
    }
}
else{
    return(<ActivityIndicator style={{marginTop:150}} size={100} animating={true}/>)
  }
}

export default ResolveReport

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