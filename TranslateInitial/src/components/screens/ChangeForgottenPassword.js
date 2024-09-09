import { StyleSheet, Text, View, Image,Button, TextInput,ScrollView, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Background from '../../../assets/images/background.png';
import welcome from '../../../assets/images/w2.png';
import { button1, button2 } from '../../common/button'
import Axios from 'axios';
import { head1, head2 ,formgroup,label,input, link,link2,input2,label2,errormessage} from '../../common/form';
import {useNetInfo} from "@react-native-community/netinfo";

const ChangeForgottenPassword = ({ navigation, route }) => {
    const { udata } = route.params;

    const [errormsg, setErrormsg] = useState(null);
    const [email, setEmail] = useState('');
    const [password,setPassword]=useState({
        Password:"",
        CPassword:""
    });

    const netInfo = useNetInfo();

    useEffect(() => {
        setEmail(udata.Email);
    }, [])

    const sendToBackend = () => {
      if(password.Password==""||
      password.CPassword==""){
        setErrormsg('All fields are required');
        return;
      }

     else if (password.Password != password.CPassword) {
        setErrormsg('Password and Confirm Password must be same');
        return;
    }

     else{
            const fdata = {
                Email: email,
                Password:password.Password
            }

            if (!netInfo.isConnected || !netInfo.isInternetReachable) {
              alert("Please Connect to the Internet")
            }
            else{
            Axios.put('http://10.0.2.2:8000/changepass',{
                Email: fdata.Email,
                Password: fdata.Password,
          }
              ).then(res=>{
                alert('Password Changed Successfully');
                navigation.navigate('login');
             }).catch((err) => {
             if(err.response.status==500) {
                alert("Please Connect to the Internet")
              }
            })
        
           } 
          }
    }
    return (
        <View style={styles.container}>
      <Image style={styles.patternbg} source={Background}/>
      <View style={styles.textContainer}>
        <View style={styles.s1}>
        <Image style={styles.logo} source={welcome}></Image>
          <Text style={styles.h1} onPress={()=>navigation.navigate('welcome')}>TranslateCo, Inc.</Text>
          <Text style={styles.small1} onPress={()=>navigation.navigate('welcome')}>Translating in person or at home</Text>
          {/* <Text style={styles.head}>Main Logo</Text> */}
        </View>
        <ScrollView style={styles.s2}>
          <Text style={head1}>Change your Password</Text>
          <Text style={link2}>Enter your new Password</Text>
          {errormsg?<Text style={errormessage}>{errormsg}</Text>:null}
          <View style={formgroup}>
            <Text style={label2}>Password:</Text>
            <TextInput placeholder="Create your Password" style={input2} secureTextEntry={true} onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setPassword({...password,Password:text})}/>
          </View>
          <View style={formgroup}>
            <Text style={label2}>Confirm Password:</Text>
            <TextInput placeholder="Confirm your Password" style={input2} secureTextEntry={true} onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setPassword({...password,CPassword:text})}/>
          </View>
          <View style={formgroup}>
          <TouchableOpacity onPress={()=>{
            sendToBackend();
          }}>
          <Text style={button2} >Change Password</Text>
          </TouchableOpacity>  
          </View>
        </ScrollView>
      </View>
    </View>
    )
}

export default ChangeForgottenPassword

const styles = StyleSheet.create({
    patternbg:{
      position:'absolute',
      top:0,
      height:'100%',
      width:'100%',
    },
    container:{
      width:'100%',
      height:'100%'
    },
    textContainer:{
      display:"flex",
       alignItems:'center',
       justifyContent:'center',
       height:'100%'
     },
     head:{
       fontSize:30,
       color:'white'
     },
     s1:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'20%'
     },
     s2:{
      display:'flex',
      backgroundColor:'#fff',
      width:'100%',
      height:'80%',
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      padding:20,
     },
     formgroup: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginVertical: 10,
  },
  label: {
      fontSize: 17,
      color: '#000',
      marginLeft: 10,
      marginBottom: 5,
  },
  input: {
      backgroundColor: "#FFB0CC",
      borderRadius: 20,
      padding: 10,
  },
  fp: {
    display: 'flex',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  logo:{
    // width:'60%',
    height:80,
    // marginBottom:50,
    resizeMode:'contain',
   },
   small1: {
    color: '#fff',
    fontSize: 17,
  }
  ,
  h1: {
    fontSize: 30,
    color: '#fff',
  },
  })