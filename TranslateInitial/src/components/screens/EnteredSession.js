import { StyleSheet,TextInput, Button,View, Modal,Image,Platform, SafeAreaView,Text, Dimensions, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import {useEffect, useState } from 'react';
import Axios from 'axios';
import  DateTimePickerAndroid  from '@react-native-community/datetimepicker';
import { button2, button4 } from '../../common/button';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector,useDispatch } from 'react-redux';
import {useNetInfo} from "@react-native-community/netinfo";
import { useStripe } from '@stripe/stripe-react-native';

function EnteredSession({navigation,route}){
  // const { token,user } = route.params;

const [showModal,setShowModal]=useState(false);
const windowHeight = Dimensions.get('window').height;

const [showTime,setShowTime]=useState(false)

  // const [token,setToken]=useState();
  // const [user,setUser]=useState();
  const {token}= useSelector(state=>state.userReducer)
  const {user}= useSelector(state=>state.userReducer);
  const[isLoading,setIsLoading]=useState(true);
  const netInfo = useNetInfo();

  useEffect(() => {
    getUser();
   },[]);
  const getUser = async () => {

    console.log(token.token)
      // const savedToken = await AsyncStorage.getItem("token");
      // // const savedUser= await AsyncStorage.getItem("user");
      // // const currentUser = JSON.parse(savedUser);
      // const currentToken = JSON.parse(savedToken);
      // setToken(currentToken);

      Axios.get('http://10.0.2.2:8000/getLanguages',{
      headers:{authorization:'Bearer ' +token.token},
    }
    ).then((response)=>{
      
  setLanguages(response.data.lang)
      
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

      // setUser(currentUser);
     setIsLoading(false);

  };

  function createPaymentIntent(){
    console.log(enteredSession.TimeFrom)
    if(enteredSession.LanguageFrom==''||enteredSession.LanguageTo==''||enteredSession.Date==''||enteredSession.TimeFrom==0||enteredSession.Duration==0|| enteredSession.Type==""){
      alert('please fill all fields');
    }
    // else if(enteredSession.ClientEmail==undefined){
    //   alert('please log in');
    // }
    else{
      if (!netInfo.isConnected || !netInfo.isInternetReachable) {
        alert("Please Connect to the Internet")
      }
    Axios.post('http://10.0.2.2:8000/intent',{  
     amount:price*100
    },{
      headers:{authorization:'Bearer ' +token.token},
    }
    )
    .then((response)=>{
      console.log(response.data.pid)
     onCheckout(response)
  })
  // .catch((err) => {
  //   console.log('error something wrong')
  // })

}
  };

const { initPaymentSheet, presentPaymentSheet } = useStripe();

const onCheckout = async (response1) => {
  // 1. Create a payment intent
  const response =response1
  // console.log(response.data.paymentIntent);
  if (response.error) {
    alert('Something went wrong', response.error);
    return;
  }
  // 2. Initialize the Payment sheet
  const { error: paymentSheetError } = await initPaymentSheet({
    merchantDisplayName: 'TranslateCo, Inc.',
    paymentIntentClientSecret: response.data.paymentIntent,
    defaultBillingDetails: {
      name: user.Name,
    },
  });
  if (paymentSheetError) {
    alert('Something went wrong', paymentSheetError.message);
    return;
  }
  // 3. Present the Payment Sheet from Stripe
  const { error: paymentError } = await presentPaymentSheet();

  if (paymentError) {
    alert(`Error code: ${paymentError.code}`, paymentError.message);
    return;
  }
  // 4. If payment ok -> create the order
console.log(response.data.pid)
  sessionBook("Card", response.data.pid);
};

    const [enteredSession,setEnteredSession]=useState({
      LanguageFrom:"",
      LanguageTo:"",
      Date:"",
      TimeFrom:0,
      Duration:0,
      Type:"",
      // ClientEmail:props.user,
      // ClientEmail:user.Email

    });

  //   useEffect(() => {
  //     if(token.token==null){
  //       navigation.navigate('login'); 
  //     }
  // });

    // const languages =["Arabic", "English","Italian","French","German","Spanish","Japanese","Chinese","Korean"];
    const [languages,setLanguages]=useState([])
    const dur =["1 hour", "2 hours","3 hours"];
    const Rtype=["Over The Phone", "In Person"]
    const [price,setPrice]=useState(0);


    function updateDur(dur){
      if(dur=="1 hour"){
        setEnteredSession({...enteredSession,Duration:1});
        if(enteredSession.Type=="Over The Phone"){
          setPrice(200);
        }
        else{
          setPrice(250)
        }
      }
      else if(dur=="2 hours"){
        setEnteredSession({...enteredSession,Duration:2});
        if(enteredSession.Type=="Over The Phone"){
          setPrice(300);
        }
        else{
          setPrice(350)
        }
      }
      else{
        setEnteredSession({...enteredSession,Duration:3});
        if(enteredSession.Type=="Over The Phone"){
          setPrice(350);
        }
        else{
          setPrice(400)
        }
      }
    }

    function updateType(type){
      if(type=="Over The Phone"){
        setEnteredSession({...enteredSession,Type:"OverThePhone"});
        if(enteredSession.Duration==1){
          setPrice(200);
        }
        else if(enteredSession.Duration==2){
          setPrice(300);
        }
        else{
          setPrice(350);
        }
      }
      else if(type=="In Person"){
        setEnteredSession({...enteredSession,Type:"InPerson"});
        if(enteredSession.Duration==1){
          setPrice(250);
        }
        else if(enteredSession.Duration==2){
          setPrice(350);
        }
        else{
          setPrice(400);
        }
      }
    }

   const[date,setDate]=useState(new Date());
   const[date2,setDate2]=useState(new Date());
   const date2string= date2.getDate()+'/'+(date2.getMonth()+1)+'/'+date2.getFullYear();
   const[mode,setMode]=useState('date');
   const [show,setShow]=useState(false);
   const [text,setText]=useState('Empty');
  const [d,setd]=useState();

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
    let fTime= 'Hours: '+tempDate.getHours()+'| Minutes: '+tempDate.getMinutes();
    let Tn= tempDate.getHours();
    if(mode=="date"){
    if(tempDate.getFullYear()==date2.getFullYear()&&tempDate.getMonth()+1>date2.getMonth()+1){
            setEnteredSession({...enteredSession,Date:fDate})
            setShowTime(true)
            console.log(fDate +' (' +fTime+')');
    }
    else if(tempDate.getFullYear()==date2.getFullYear()&&tempDate.getMonth()+1==date2.getMonth()+1&&tempDate.getDate()>=date2.getDate()){
      
        setEnteredSession({...enteredSession,Date:fDate})
        setShowTime(true)

        console.log(fDate +' (' +fTime+')');
    }
    else{
      alert("Please pick an appropriate Date")
    }
  }
  else  if(mode=="time"){
    if(showTime==true){
      if(Tn<=20&&Tn>=9){
        if(enteredSession.Date==date2string){
          if(Tn>date2.getHours()){
          setEnteredSession({...enteredSession,TimeFrom:Tn})
          alert("Please note: all time slots are on the hour picked, and not by minutes")
          console.log(fDate +' (' +fTime+')');
          }
          else{
            console.log(date2.getHours())
            console.log(date2string)
        
            alert("please pick a time atleast an hour ahead")
           }
        }
        else{
          setEnteredSession({...enteredSession,TimeFrom:Tn})
          alert("Please note: all time slots are on the hour picked, and not by minutes")
          console.log(fDate +' (' +fTime+')');
        }
      }
      else{
        alert("Please pick a time between 9 AM and 7 PM, and atleast an hour ahead of time")
      }
    }
    else{
      alert("Please Select Date first")
    }
  }
    }
    else{
      setShow(false);
    }
   }

    function sessionBook(ptype,pid){
if(enteredSession.LanguageFrom==''||enteredSession.LanguageTo==''||enteredSession.Date==''||enteredSession.TimeFrom==0||enteredSession.Duration==0|| enteredSession.Type==""){
  alert('please fill all fields');
}
else if(enteredSession.LanguageFrom==enteredSession.LanguageTo){
  alert('Language From and Language To Must be Different');
}
// else if(enteredSession.ClientEmail==undefined){
//   alert('please log in');
// }
else{
  if (!netInfo.isConnected || !netInfo.isInternetReachable) {
    alert("Please Connect to the Internet")
  }
//   else{
//   Axios.post('http://10.0.2.2:8000/requestSession',{  
//               LanguageFrom: enteredSession.LanguageFrom,
//               LanguageTo: enteredSession.LanguageTo,
//               Date: enteredSession.Date,
//               TimeFrom: enteredSession.TimeFrom,
//               Duration:enteredSession.Duration,
//               ClientEmail:user.Email,
//             },{
//               headers:{authorization:'Bearer ' +token.token},
//             }
//             ).then((response)=>{
//               if(response.data.message==="Request sent, please check later for confirmation"){
//                 console.log(response.data.cor);
//                 alert(response.data.message);
//                 // props.goBackToHub();
//                 navigation.goBack()
//                 // navigation.navigate('verification', {userdata:response.data.udata}); 
//               }
//           }).catch((err) => {
//             if (err.response.status === 401) {
//               alert("please Login")
//               navigation.navigate("login")
//             } 
//             else if(err.response.status==500) {
//               alert("Please Connect to the Internet")
//             }
//             // console.log(reason.message)
//           })
// }
else{
  if(enteredSession.Type=="OverThePhone"){
    Axios.post('http://10.0.2.2:8000/requestSession',{  
      LanguageFrom: enteredSession.LanguageFrom,
      LanguageTo: enteredSession.LanguageTo,
      Date: enteredSession.Date,
      TimeFrom: enteredSession.TimeFrom,
      Duration:enteredSession.Duration,
      ClientEmail:user.Email,
      Type:enteredSession.Type,
      UserPhoneNumber:user.PhoneNumber,
      ClientName:user.Name,
      Payment:ptype,
      Amount: price,
      pid:pid
    },{
      headers:{authorization:'Bearer ' +token.token},
    }
    ).then((response)=>{
      if(response.data.message==="Request sent, please check later for confirmation"){
        console.log(response.data.cor);
        alert("Request sent, please check later for confirmation and wait for you call on the session day");
        // props.goBackToHub();
        // navigation.goBack()
        navigation.navigate('Draw',{screen:'Home'}); 
        // navigation.navigate('verification', {userdata:response.data.udata}); 
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
  else if(enteredSession.Type=="InPerson"){
    Axios.post('http://10.0.2.2:8000/requestSession',{  
      LanguageFrom: enteredSession.LanguageFrom,
      LanguageTo: enteredSession.LanguageTo,
      Date: enteredSession.Date,
      TimeFrom: enteredSession.TimeFrom,
      Duration:enteredSession.Duration,
      ClientEmail:user.Email,
      UserPhoneNumber:user.PhoneNumber,
      ClientName:user.Name,
      Type:enteredSession.Type,
      Payment:ptype,
      Amount: price,
      pid:pid



    },{
      headers:{authorization:'Bearer ' +token.token},
    }
    ).then((response)=>{
      if(response.data.message==="Request sent, please check later for confirmation"){
        console.log(response.data.cor);
        alert(response.data.message);
        // props.goBackToHub();
        // navigation.goBack()
        navigation.navigate('Draw',{screen:'Home'}); 
        // navigation.navigate('verification', {userdata:response.data.udata}); 
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
}
    }
if(isLoading==false){
   return(
   <View style={styles.inputContainer}>
        {/* <Image style={styles.image} source={require('../../../assets/images/add.png')} /> */}
        <Ionicons name="add-circle-outline"  size={125} style={{marginBottom:10,color:"#4267B3",backgroundColor:"#E9EBEE", borderColor:"#4267B7"}}/>
        {/* <TextInput style={styles.text} placeholder='Book a Session' onChangeText={sessionBookHandler} value={enteredSession}/> */}
        <SelectDropdown data={languages} buttonStyle={styles.text} defaultButtonText="Select Language From" onSelect={(selectedItem)=>{setEnteredSession({...enteredSession,LanguageFrom:selectedItem}); console.log(enteredSession.LanguageFrom)}}/>
        <SelectDropdown data={languages} buttonStyle={styles.text} defaultButtonText="Select Language To" onSelect={(selectedItem)=>{setEnteredSession({...enteredSession,LanguageTo:selectedItem}); console.log(enteredSession.LanguageTo)}}/>
        {/* <TextInput style={styles.text} placeholder='enter the Date for your session' onChangeText={(selectedItem)=>{setEnteredSession({...enteredSession,Date:selectedItem}); console.log(enteredSession.Date)}}/> */}
        {/* <TextInput style={styles.text} placeholder='enter the time for your session' onChangeText={(selectedItem)=>{setEnteredSession({...enteredSession,TimeFrom:selectedItem}); console.log(enteredSession.TimeFrom)}}/> */}
        {/* <View style={styles.button}>
        <Button title="Pick Date" onPress={()=> showMode('date')} color="#5e0acc"/>
        </View>
        <View style={styles.button}>
        <Button title="Pick Time" onPress={()=> showMode('time')} color="#5e0acc"/>
        </View> */}
          <View style={styles.appContainer}>
        <Text style={styles.button2} onPress={()=> showMode('date')}>Pick Date</Text>
        <Text style={styles.button2} onPress={()=> showMode('time')}>Pick Time</Text>
        </View>
        {show && (<DateTimePickerAndroid testID='dateTimePicker' value={date} mode={mode} is24Hour={false} display={Platform.OS ==='android'?'default' : 'default'} onChange={(event, date) => onPick(event, date)} />)}
        {/* <TextInput style={styles.text} placeholder='enter the Duration for your session' onChangeText={(selectedItem)=>{setEnteredSession({...enteredSession,Duration:selectedItem}); console.log(enteredSession.Duration)}}/> */}
        <SelectDropdown data={dur} buttonStyle={styles.text} defaultButtonText="Select Duration" onSelect={(selectedItem)=>{updateDur(selectedItem)}}/>
        <SelectDropdown data={Rtype} buttonStyle={styles.text} defaultButtonText="Select Type" onSelect={(selectedItem)=>{updateType(selectedItem)}}/>

        <View style={styles.buttonContainer}> 
        <View style={styles.button}>
        {/* <Button title="Book Session" onPress={sessionDisplayHandler} color="#5e0acc"/> */}
        {/* <Button title="Book Session" onPress={sessionBook} color="#0fa3b1"/> */}
        <Button title="Request" onPress={()=>setShowModal(true)} color="#4267B3"/>
        </View>
        <View style={styles.button}>
        <Button title="Cancel" onPress={()=>  navigation.navigate('Draw',{screen:'Home'})} color="#f31282"/>
        </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={showModal}>
            <View style={{backgroundColor:'#000000aa', flex:1}}>
                <View style={{backgroundColor:"#ffffff", marginTop:windowHeight-200, padding:40, borderTopEndRadius:20, borderTopStartRadius:20}}>
                <View style={{flexDirection:'row', marginBottom:25}}>
                <TouchableOpacity onPress={()=>{setShowModal(false)}}>
                <Ionicons name="close-outline" color="#000000" size={30} style={{marginRight:30, marginTop:-25, marginLeft:-28}}/>
                </TouchableOpacity>
                  <Text style={{alignSelf:"center", fontSize:20, fontWeight:'bold'}}>Select Your Payment Method</Text>
                </View>
               {   enteredSession.Type=="InPerson"? 
                <View style={{flexDirection:"row", alignSelf:"center", marginRight:20}}> 
                  <View style={{width:150, marginTop:0, marginHorizontal:15}}>
                    <TouchableOpacity  onPress={()=>{sessionBook("Cash","")}}>
                    <Text  style={button4}>Cash</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{width:150, marginTop:0, marginHorizontal:15, height:"300%"}}>
                    <TouchableOpacity  onPress={()=>{createPaymentIntent()}}>
                    <Text  style={button2}>Card</Text>
                    </TouchableOpacity>
                    </View>
        </View>:<View style={{flexDirection:"row", alignSelf:"center", marginRight:20}}> 
                    <View style={{width:150, marginTop:0, marginHorizontal:15, height:"300%"}}>
                    <TouchableOpacity  onPress={()=>{createPaymentIntent()}}>
                    <Text  style={button2}>Card</Text>
                    </TouchableOpacity>
                    </View>
        </View>
               }
                  
                </View>
            </View>
        </Modal>
        </View>
   )
      }
};
export default EnteredSession;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection:'column',
    // backgroundColor: '#f1e7e5',
    backgroundColor: '#E9EBEE',
    alignItems: 'center',
    justifyContent: 'center',
   // marginBottom:24,
    padding:16,
    // borderBottomColor:"#555555",
    // borderBottomWidth:1,
  },
  modal:{
    justifyContent: 'center',
      alignItems: 'center',
      margin: 0
  },
  text:{
   // marginRight:8,
    padding: 10,
    borderWidth:1,
    marginBottom:10,
    // borderColor:'#f1e7c0',
    borderColor:'#dddddd',
    borderRadius:6,
    width:'100%',
    // backgroundColor:'#f1e7d0',
    backgroundColor:'#90949C',
    color:'#120438'
  },
  buttonContainer:{
    flexDirection:"row",
  },
  button:{
    width:100,
    marginTop:8,
    marginHorizontal:8
  },
  image:{
    width:100,
    height:100,
    margin:20
  },
  appContainer:{
    paddingTop:0,
    paddingHorizontal:10,
    // paddingBottom:10,
    // marginBottom:8,

    width:'100%',
    // backgroundColor:'#1e085a',
    backgroundColor:'#f1e7e5',
  },
  button2: {
    width:"100%",
    backgroundColor: '#4267B3',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    // minWidth: 150,
    textAlign: 'center',
    marginBottom:10
}
});