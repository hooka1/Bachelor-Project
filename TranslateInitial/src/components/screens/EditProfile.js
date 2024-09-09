import { StyleSheet, Text, View, TouchableOpacity, ImageBackground,TextInput, ScrollView, Alert} from 'react-native'
import React from 'react'
import {useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions';
import {useNetInfo} from "@react-native-community/netinfo";
import {button2} from '../../common/button'
import { Modal } from 'react-native-paper';
import { errormessage, formgroup, head1, input2, label2, link2 } from '../../common/form';
import  DateTimePickerAndroid  from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons'


const EditProfile = ({navigation}) => {
    const [token,setToken]=useState();
// const [user,setUser]=useState();
    const {user}= useSelector(state=>state.userReducer);
    const[isLoading,setIsLoading]=useState(true);
    const dispatch=useDispatch();

    const [showModal,setShowModal]=useState(false);
    const [errormsg, setErrormsg] = useState(null);
    const [password,setPassword]=useState({
        Password:"",
        CPassword:""
    });

    const [clientData,setClientData]=useState({
        Name:"",
        Email:'',
        dob:'',
        PhoneNumber:'',
      });

      const [state, setState] = useState(false)

      const netInfo = useNetInfo();
    
    useEffect(() => {
      getUser();
     },[state]);
    const getUser = async () => {
    
        const savedToken = await AsyncStorage.getItem("token");
        // const savedUser= await AsyncStorage.getItem("user");
        // const currentUser = JSON.parse(savedUser);
        const currentToken = JSON.parse(savedToken);
        setToken(currentToken);
        // setUser(currentUser);
        // console.log(currentUser);
        // setClientData({...clientData,Email:currentUser.Email,dob:currentUser.DOB,PhoneNumber:currentUser.PhoneNumber,Name:currentUser.Name})
        setClientData({...clientData,Email:user.Email,dob:user.DOB,PhoneNumber:user.PhoneNumber,Name:user.Name})
        setIsLoading(false);
    
    };

    const storeUser = async (value, string) => {
        try {
        //   await AsyncStorage.removeItem(string)
        //   await AsyncStorage.setItem(string, JSON.stringify(value));
          dispatch(setUser(value))
          setState(!state)
        } catch (error) {
          console.log(error);
        }
      };

    //   function sendToBackend(){
    //     if(clientData.Email == ""&&clientData.Name == ""&&clientData.PhoneNumber == "" &&clientData.dob == "" ) {
    //         alert("Data not changed")
    //         return;
    //        }
    //        if ( clientData.Email == ""){setClientData({...clientData,Email:user.Email}); console.log(clientData.Email)} 
    //        if(clientData.Name == ""){setClientData({...clientData,Name:user.Name})} 
    //        if(clientData.PhoneNumber == "" ){setClientData({...clientData,PhoneNumber:user.PhoneNumber})} 
    //        if( clientData.dob == "" ) {setClientData({...clientData,dob:user.DOB})}
          
    //        sendToBackend1();

    //   }
    const sendToBackend = () => {
        console.log(clientData);
       if(clientData.Email == user.Email&&clientData.Name == user.Name&&clientData.PhoneNumber == user.PhoneNumber &&clientData.dob == user.DOB ) {
        alert("Data not changed")
        return;
       }
  
       else {
        if (!netInfo.isConnected || !netInfo.isInternetReachable) {
            alert("Please Connect to the Internet")
          }
          else{
               Axios.put('http://10.0.2.2:8000/updateProfile',{
                 Email: clientData.Email,
                 Name: clientData.Name,
                 dob:clientData.dob,
                 PhoneNumber:clientData.PhoneNumber,
           },{
            headers:{authorization:'Bearer ' +token.token},
          }
               ) .then((response)=>{
                if(response.data.error){
                }
                else{
                  alert('Profile Updated Successfully');


                  setClientData({...clientData,Email:"",Name:"",PhoneNumber:"",dob:""})
                //   setClientData({...clientData,Name:""})
                //   setClientData({...clientData,PhoneNumber:""})
                //   setClientData({...clientData,dob:""})

                  storeUser(response.data.user,"user")


                //   navigation.navigate('Draw',{screen:'Home'}); 
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

function changpDone (){
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
              Email: user.Email,
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
              setShowModal(false)
           }).catch((err) => {
           if(err.response.status==500) {
              alert("Please Connect to the Internet")
            }
          })
      
         } 
        }
  }

  function changp(){
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to change your password?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
  changpDone()          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  }


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
    if(tempDate.getFullYear()>date.getFullYear()-18){
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

if(isLoading==false){
  return (
    <View style={styles.container}>
     <ScrollView style={{margin:20}}>
        <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{}}>
                <View style={{height:100,width:100,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                    <ImageBackground source={require('./../../../assets/images/DefaultProfile.png')} style={{height:100,width:100}} imageStyle={{borderRadius:15}} >
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <MaterialCommunityIcons
                            name="camera"
                            size={35}
                            color="#fff"
                            style={{
                                opacity:0.7,
                                alignItems:'center',
                                justifyContent:'center',
                                borderWidth:1,
                                borderColor:'#fff',
                                borderRadius:10
                            }}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
            <Text style={{marginTop:10,fontSize:18,fontWeight:'bold'}}>{user.Name}</Text>
        </View>
        <View style={styles.action}>
            <Text style={{marginTop:4}}>Name:</Text>
            <TextInput placeholder={user.Name} defaultValue={user.Name} placeholderTextColor='#000000' style={styles.textInput} autoCorrect={false} onChangeText={(text)=> setClientData({...clientData,Name:text})}/>
        </View>
        {/* <View style={styles.action}>
            <Text style={{marginTop:4}}>Date Of Birth:</Text>
            <TextInput placeholder={user.DOB} defaultValue={user.DOB} placeholderTextColor='#000000' style={styles.textInput} autoCorrect={false} onChangeText={(text)=> setClientData({...clientData,dob:text})} />
        </View> */}
         <View style={styles.action}>
            {/* <Text style={label2}>Date of Birth:</Text> */}
            {/* <TextInput placeholder="Example: 27/02/2001" style={input2} onPressIn={() => setErrormsg(null)} onChangeText={(text)=> setClientData({...clientData,dob:text})}/> */}
            <Text style={{marginTop:4}}>Date of Birth:</Text>
            <Text style={[button2,{width:"70%", alignSelf:"center", textAlign:'center', marginTop:-10, marginBottom:-10}]} onPress={()=> showMode('date')}>{clientData.dob}</Text>
          </View>
          {show && (<DateTimePickerAndroid testID='dateTimePicker' value={date} mode={mode} is24Hour={true} display={Platform.OS ==='android'?'default' : 'default'} onChange={(event, date) => onPick(event, date)} />)}
         
        <View style={styles.action}>
            <Text style={{marginTop:4}}>Email:</Text>
            <TextInput placeholder={user.Email} defaultValue={user.Email} keyboardType='email-address' placeholderTextColor='#000000' style={styles.textInput} autoCorrect={false} onChangeText={(text)=> setClientData({...clientData,Email:text})} />
        </View>
        <View style={styles.action}>
            <Text style={{marginTop:4}}>Phone Number:</Text>
            <TextInput placeholder={user.PhoneNumber} defaultValue={user.PhoneNumber} keyboardType='phone-pad' placeholderTextColor='#000000' style={styles.textInput} autoCorrect={false} onChangeText={(text)=> setClientData({...clientData,PhoneNumber:text})}/>
        </View>
        <View >
       < TouchableOpacity onPress={()=>setShowModal(true)} >
            <Text style={button2}>Change Password</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={()=>{sendToBackend()}}>
            <Text style={styles.panelButtonTitle}>Update</Text>
        </TouchableOpacity>
     </ScrollView>
     <Modal animationType="slide" transparent={true} visible={showModal}>
     <ScrollView style={styles.s2}>
     {/* <View style={{flexDirection:'row', marginBottom:25}}> */}
     <TouchableOpacity onPress={()=>{setShowModal(false)}}>
                <Ionicons name="close-outline" color="#000000" size={30} style={{ marginLeft:-5, marginRight:5}}/>
                </TouchableOpacity>
                {/* <View style={{flexDirection:'column'}}> */}

          <Text style={head1}>Change your Password</Text>
          <Text style={link2}>Enter your new Password</Text>
          {/* </View>
          </View> */}
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
            changp();
          }}>
          <Text style={button2} >Change Password</Text>
          </TouchableOpacity>  
          </View>
        </ScrollView>
     </Modal>
    </View>
  )
}
}

export default EditProfile

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
        borderRadius: 5,
        paddingHorizontal: 1,
        paddingVertical: 1,
    },
    s2:{
        display:'flex',
        backgroundColor:'#fff',
        width:'100%',
        height:'100%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:20,
       },
})