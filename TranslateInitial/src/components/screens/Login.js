import { StyleSheet, Text, View, Image, TextInput,Pressable,TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState} from 'react'
import Background from '../../../assets/images/background.png';
import welcome from '../../../assets/images/w2.png';
import {button1, button2} from '../../common/button';
import { head1, head2 ,formgroup,label,input, link,link2,errormessage} from '../../common/form';
import Axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { setUser,setToken } from '../../redux/actions';
import {useNetInfo} from "@react-native-community/netinfo";

const Login = ({navigation}) => {

  const {user}= useSelector(state=>state.userReducer);
  const {token}= useSelector(state=>state.userReducer);

  const dispatch=useDispatch();

  const [clientData,setClientData]=useState({
    Password:'',
    Email:'',
  });

  const [errormsg, setErrormsg] = useState(null);
  const netInfo = useNetInfo();

  const storeUser = async (value, string) => {
    try {
      await AsyncStorage.setItem(string, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const sendToBackend = () => {
    console.log(clientData);
   if ( clientData.Email == '' ||clientData.Password == '' ) {
       setErrormsg('All fields are required');
       return;
   }
   else {
    
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      alert("Please Connect to the Internet")
    }
    else{
           Axios.post('http://10.0.2.2:8000/Login',{
             Email: clientData.Email,
             Password: clientData.Password,
       }
           ) .then((response)=>{
            if(response.data.error){
              setErrormsg(response.data.error)
            }
            else{
              alert('login successful');
              // console.log(response.data.tokenout);
              // AsyncStorage.setItem('token',JSON.stringify(response.data.tokenout));
              // AsyncStorage.setItem('user',JSON.stringify(response.data.user));
              storeUser(response.data.tokenout, "token");
              storeUser(response.data.user,"user")
              dispatch(setUser(response.data.user))
              dispatch(setToken(response.data.tokenout))
              // navigation.navigate('Tab',{screen:'home',params:{token:response.data.tokenout,user:response.data.user}}); 
              // navigation.navigate('Tab',{screen:'home'}); 
              if(response.data.user.FirstTimeUser==true){
                navigation.navigate("IntroScreens")
              }
              else{
                navigation.navigate('Draw',{screen:'Home'}); 
              }
              // navigation.navigate('Draw',{screen:'Home'}); 

           
            }}).catch((err) => {
             if(err.response.status==500) {
                alert("Please Connect to the Internet")
              }
              // console.log(reason.message)
            })
   }}}

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
        <View style={styles.s2}>
          <Text style={head1}>Login</Text>
          <Text style={head2}>Sign in to continue</Text>
          {errormsg?<Text style={errormessage}>{errormsg}</Text>:null}
          <View style={formgroup}>
            <Text style={label}>Email or Username:</Text>
            <TextInput placeholder="Email or Username" textContentType='emailAddress' placeholderTextColor={"#A3A4A6"} style={input} onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setClientData({...clientData,Email:text})}/>
          </View>
          <View style={formgroup}>
            <Text style={label}>Password:</Text>
            <TextInput placeholder="Password" style={input} placeholderTextColor={"#A3A4A6"} secureTextEntry={true} onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setClientData({...clientData,Password:text})}/>
          </View>
          <View style={styles.fp}>
            <Text style={link} onPress={()=>navigation.navigate('forgot')}>Forgot your Password?</Text>
          </View>
          <TouchableOpacity onPress={()=>{
            sendToBackend();
          }}>
          <Text style={button2} >Login</Text>
          </TouchableOpacity>  
          <Text style={link2}>Don't have an account?<Text style={link} onPress={()=>navigation.navigate('signup')}> Create a new account</Text></Text>
        </View>
      </View>
    </View>
  )
}

export default Login

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
    height:'40%'
   },
   s2:{
    display:'flex',
    backgroundColor:'#fff',
    width:'100%',
    height:'60%',
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