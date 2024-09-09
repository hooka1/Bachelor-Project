import { StyleSheet, Text, View, Image,Button, TextInput,ScrollView, TouchableOpacity,Platform} from 'react-native'
import React,{useState} from 'react'
import Background from '../../../assets/images/background.png';
import {button1, button2, button4} from '../../common/button';
import welcome from '../../../assets/images/w2.png';
import Axios from 'axios';
import { head1, head2 ,formgroup,label,input, link,link2,input2,label2,errormessage} from '../../common/form';
import {useNetInfo} from "@react-native-community/netinfo";
import  DateTimePickerAndroid  from '@react-native-community/datetimepicker';


const Signup = ({navigation}) => {

  const [clientData,setClientData]=useState({
    Name:"",
    Email:'',
    dob:'',
    Password:'',
    cpassword:'',
    Username:'',
    PhoneNumber:'',
  });

  const [errormsg, setErrormsg] = useState(null);
  const netInfo = useNetInfo();

  const[date,setDate]=useState(new Date());
  const[date2,setDate2]=useState(new Date());
  const[mode,setMode]=useState('date');
  const [show,setShow]=useState(false);

function showMode(currentMode){
   setShow(true);
   setMode(currentMode);
  }

  const onPick=(event,selectedDate)=>{
   setShow(false);
   if(event.type == "set") {
   const currentDate=selectedDate||date;
  // setShow(Platform.OS ==='android');
   setDate(currentDate);
   let tempDate=new Date(currentDate);
   let fDate= tempDate.getDate()+'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear();
   //let fTime= 'Hours: '+tempDate.getHours()+'| Minutes: '+tempDate.getMinutes();
   //let Tn= tempDate.getHours();
   if(mode=="date"){
    console.log(tempDate.getFullYear())
    console.log(date2.getFullYear()-18)
    if(tempDate.getFullYear()>date2.getFullYear()-18){
      alert("Must be over 18 years old to sign up")
    }
    else{
      setClientData({...clientData,dob:fDate})
    }
   }
  //  if(mode=="time")
  //  setEnteredSession({...enteredSession,TimeFrom:Tn})
  //  console.log(fDate +' (' +fTime+')');
   }
   else{
     setShow(false);
   }
  }


  const sendToBackend = () => {
     console.log(clientData);
    if (clientData.Name == '' ||
    clientData.Email == '' ||
    clientData.Password == '' ||
    clientData.cpassword == '' ||
    clientData.dob == '' ||
    clientData.Username == ''||
    clientData.PhoneNumber == '') {
        setErrormsg('All fields are required');
        return;
    }
    else {
        if (clientData.Password != clientData.cpassword) {
            setErrormsg('Password and Confirm Password must be same');
            return;
        }
        else if(clientData.Email.indexOf("a")==-1){
          setErrormsg('please enter a valid Email');
          return;
        }
        else if(clientData.PhoneNumber.length!=11){
          setErrormsg('please enter a valid Phone Number');
          return;
        }
        else {
          if (!netInfo.isConnected || !netInfo.isInternetReachable) {
            alert("Please Connect to the Internet")
          }
          else{
            Axios.post('http://10.0.2.2:8000/verify',{
              Name: clientData.Name,
              Email: clientData.Email,
              Username: clientData.Username,
              Password: clientData.Password,
              dob:clientData.dob,
              PhoneNumber:clientData.PhoneNumber
        }
            ).then((response)=>{
              if(response.data.message==="Verification Code Sent to your Email"){
                console.log(response.data.udata);
                alert(response.data.message);
                navigation.navigate('verification', {userdata:response.data.udata}); 
              }
            else{
              if(response.data.error){
                setErrormsg(response.data.error);
                return
              }
            }}).catch((err) => {
              if(err.response.status==500) {
                alert("Please Connect to the Internet")
              }
              // console.log(reason.message)
            })
    }}

}}

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
          <Text style={head1}>Create a New Account</Text>
          <Text style={link2}>Already have an account?<Text style={link} onPress={()=>navigation.navigate('login')}> Login</Text></Text>
          {errormsg?<Text style={errormessage}>{errormsg}</Text>:null}
          <View style={formgroup}>
            <Text style={label2}>Email:</Text>
            <TextInput placeholder="Enter your Email" style={input2} keyboardType='email-address' onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setClientData({...clientData,Email:text})}/>
          </View>
          <View style={formgroup}>
            <Text style={label2}>Username:</Text>
            <TextInput placeholder="Make your own Username" style={input2} onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setClientData({...clientData,Username:text})}/>
          </View>
          <View style={formgroup}>
            <Text style={label2}>Name:</Text>
            <TextInput placeholder="Example: John Doe" style={input2} onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setClientData({...clientData,Name:text})}/>
          </View>
          <View style={formgroup}>
            {/* <Text style={label2}>Date of Birth:</Text> */}
            {/* <TextInput placeholder="Example: 27/02/2001" style={input2} onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setClientData({...clientData,dob:text})}/> */}
            <Text style={button2} onPress={()=> showMode('date')}>Pick Date of Birth</Text>
          </View>
          {show && (<DateTimePickerAndroid testID='dateTimePicker' value={date} mode={mode} is24Hour={true} display={Platform.OS ==='android'?'default' : 'default'} onChange={(event, date) => onPick(event, date)} />)}
          <View style={formgroup}>
            <Text style={label2}>Phone Number:</Text>
            <TextInput placeholder="example: 01223254554" style={input2} keyboardType='phone-pad' onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setClientData({...clientData,PhoneNumber:text})}/>
          </View>
          <View style={formgroup}>
            <Text style={label2}>Password:</Text>
            <TextInput placeholder="Create your Password" style={input2} secureTextEntry={true} onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setClientData({...clientData,Password:text})}/>
          </View>
          <View style={formgroup}>
            <Text style={label2}>Confirm Password:</Text>
            <TextInput placeholder="Confirm your Password" style={input2} secureTextEntry={true} onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setClientData({...clientData,cpassword:text})}/>
          </View>
          <View style={formgroup}>
          <TouchableOpacity style={{marginBottom:10}} onPress={()=>{
            sendToBackend();
          }}>
          <Text style={button1} >Sign Up</Text>
          </TouchableOpacity>  
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Signup

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