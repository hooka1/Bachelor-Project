import { StatusBar } from 'expo-status-bar';
import {useEffect,useState} from 'react';
import { StyleSheet,TextInput, Button,View,FlatList,Text,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { button1,button2 } from '../../common/button';
import { useSelector,useDispatch } from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import Axios from 'axios';



 const IntroScreens =  ({navigation,route}) => {

    const {token}= useSelector(state=>state.userReducer);  // const [user,setUser]=useState();
  const {user}= useSelector(state=>state.userReducer);
  const[isLoading,setIsLoading]=useState(true);
  const slidesClient=[{
    key:"1",
    title:`Hello ${user.Name}`,
    text:"Welcome to the TranslateCo official Application",
    image:require('../../../assets/startscreen.png'),
    backgroundColor:"red"
  },
  {
    key:"2",
    title:"This is your Home",
    image:require('../../../assets/images/clienthome.png'),
    text:"This is your Home page where you have access to requesting a session, seeing all Sessions requested currently and previously by you, access Settings at the bottom Tab, as well as seeing your Profile",
    backgroundColor:"red"
  },
  {
    key:"3",
    title:"Request a New Session!!",
    image:require('../../../assets/images/Clientrequest.png'),
    text:"This is where you can make a request for a new session by simply following the entry pattern displayed here.",
    backgroundColor:"red"
  },
  {
    key:"4",
    title:"See Your Requests!!",
    image:require('../../../assets/images/clientsessions.png'),
    text:"Here is where you can see all of your requested, accepted, and previous sessions",
    backgroundColor:"red"
  },
  {
    key:"5",
    title:"All you need in a DrawBar!!",
    image:require('../../../assets/images/clientdraw.png'),
    text:"This is the Drawbar which you can access by dragging the screen from the left, and within it you can make a report, Logout, go to the Home page, or view your profile as you also could on the Home screen.",
    backgroundColor:"red"
  },
  {
    key:"6",
    title:"Your Profile Page",
    image:require('../../../assets/images/Clientprofile.png'),
    text:"This is your profile page where you can see your details as well as edit your details by pressing on the icon at the top right.",
    backgroundColor:"red"
  },
  {
    key:"7",
    title:"Edit your Profile!!",
    image:require('../../../assets/images/Clienteditp.png'),
    text:"This is the screen you are taken to after pressing the edit icon in the profile screen, and here you can edit your personal details as well as change your password.",
    backgroundColor:"red"
  },
  {
    key:"8",
    title:"Report a Problem!!",
    image:require('../../../assets/images/clientreport.png'),
    text:"Incase you face any issue, you can report it by pressing the Report button in the DrawBar, which will take you to this screen where you can either report a previous session or a system issue.",
    backgroundColor:"red"
  },
  {
    key:"9",
    title:"Settings",
    image:require('../../../assets/images/clientsettings.png'),
    text:"This is your Settings screen which can be accessed fromn the Bottom Tab Bar that is visible at the Home Screen, and here you can see your profile, previous reports' status, or Logout",
    backgroundColor:"red"
  },
]
const slidesTranslator=[{
  key:"1",
  title:`Hello ${user.Name}`,
  text:"Welcome to the TranslateCo official Application",
  image:require('../../../assets/startscreen.png'),
  backgroundColor:"red"
},
{
  key:"2",
  title:"This is your Home",
  image:require('../../../assets/images/thome.png'),
  text:"This is your Home page where you have access to viewing all requests assigned to you, as well as seeing your profile",
  backgroundColor:"red"
},
{
  key:"3",
  title:"See Your Requests!!",
  image:require('../../../assets/images/tsessions.png'),
  text:"Here is where you can see all requested, accepted, and previous sessions that were assigned to you or accepted by you.",
  backgroundColor:"red"
},
{
  key:"4",
  title:"DrawBar!!",
  image:require('../../../assets/images/tdraw.png'),
  text:"This is the Drawbar which you can access by dragging the screen from the left, and within it you can Logout, go to the Home page, or view your profile as you also could on the Home screen.",
  backgroundColor:"red"
},
{
  key:"5",
  title:"Your Profile Page",
  image:require('../../../assets/images/tprofile.png'),
  text:"This is your profile page where you can see your details, add more languages to your arsenal by pressing the add languages button, as well as edit your details by pressing on the icon at the top right.",
  backgroundColor:"red"
},
{
  key:"6",
  title:"Edit your Profile!!",
  image:require('../../../assets/images/teditp.png'),
  text:"This is the screen you are taken to after pressing the edit icon in the profile screen, and here you can edit your personal details as well as change your password.",
  backgroundColor:"red"
},
{
  key:"7",
  title:"Add Languages!!",
  image:require('../../../assets/images/taddlang.png'),
  text:"This is the screen accessed from Profile where you can add more languages to your arsenal, add languages by choosing from dropdown and pressing add",
  backgroundColor:"red"
},
{
  key:"8",
  title:"Settings",
  image:require('../../../assets/images/tsettings.png'),
  text:"This is your Settings screen which can be accessed fromn the Bottom Tab Bar that is visible at the Home Screen, and here you can see your profile, or Logout",
  backgroundColor:"red"
},


]
const slidesAdmin=[{
  key:"1",
  title:`Hello ${user.Name}`,
  text:"Welcome to the TranslateCo official Application",
  image:require('../../../assets/startscreen.png'),
  backgroundColor:"red"
},
{
  key:"2",
  title:"This is your Home",
  image:require('../../../assets/images/adminhome.png'),
  text:"This is your Home page where you have access to viewing all requests in the system, adding users to the system, seeing all users in the system, and seeing your profile",
  backgroundColor:"red"
},
{
  key:"3",
  title:"See System Requests!!",
  image:require('../../../assets/images/adminsessions.png'),
  text:"Here is where you can see all requested, accepted, and previous sessions in the system and take action on them by assigning them to translators or cancelling them if no one is available",
  backgroundColor:"red"
},
{
  key:"4",
  title:"Add more Users!!",
  image:require('../../../assets/images/adminadduser.png'),
  text:"Here is where you can add new users to the system, and on this screen by pressing the button referring to the type of user you will be taken to a screen to fill in their information.",
  backgroundColor:"red"
},
{
  key:"5",
  title:"See All Users in the System!!",
  image:require('../../../assets/images/adminuserlist.png'),
  text:"This is the screen that has all the users in the System with each type in their own Top Tab, and here you can take action on users by seeing their details or removing them from the System.",
  backgroundColor:"red"
},
{
  key:"6",
  title:"DrawBar!!",
  image:require('../../../assets/images/admindraw.png'),
  text:"This is the Drawbar which you can access by dragging the screen from the left, and within it you can Logout, go to the Home page, or view your profile as you also could on the Home screen.",
  backgroundColor:"red"
},
{
  key:"7",
  title:"Your Profile Page",
  image:require('../../../assets/images/adminprofile.png'),
  text:"This is your profile page where you can see your details as well as edit your details by pressing on the icon at the top right.",
  backgroundColor:"red"
},
{
  key:"8",
  title:"Edit your Profile!!",
  image:require('../../../assets/images/admineditp.png'),
  text:"This is the screen you are taken to after pressing the edit icon in the profile screen, and here you can edit your personal details as well as change your password.",
  backgroundColor:"red"
},
{
  key:"9",
  title:"Settings",
  image:require('../../../assets/images/adminsettings.png'),
  text:"This is your Settings screen which can be accessed fromn the Bottom Tab Bar that is visible at the Home Screen, and here you can see your profile, all reports, add more languages to the system, or Logout",
  backgroundColor:"red"
},
{
  key:"10",
  title:"Add Languages!!",
  image:require('../../../assets/images/adminaddlang.png'),
  text:"This is the screen accessed from Settings where you can add more languages to the system; However, all language additions must first be agreed on by the whole board so dont add without permission.",
  backgroundColor:"red"
},
]

const renderSlide=({item})=>{
return (
<View style={styles.slide}>
<Text style={styles.imageTitle}>{item.title}</Text>
<Image style={styles.imageStyle} source={item.image}/>
<Text style={styles.imageText}>{item.text}</Text>

</View>
)
}

  useEffect(() => {
    getUser();
    console.log(user);
   },[user]);
  const getUser = async () => {

      
      // setUser(currentUser);
     setIsLoading(false);

  };



  function TurnOffSlider(){
    Axios.put('http://10.0.2.2:8000/FirstTime',{
        _id:token.token
    },{
      headers:{authorization:'Bearer ' +token.token},
    }
    )
    navigation.navigate('Draw',{screen:'Home'}); 
}

  

  if(isLoading==false){
  if(user.role==1){
  return (
    <>
    <StatusBar style="dark"/>
    <View style={styles.appContainer}>
   <AppIntroSlider
      style={styles.slide}
      data={slidesClient}
      renderItem={renderSlide}
      showPrevButton={true}
      onDone={()=>{TurnOffSlider()}}
      />
    
    </View>
    </>
  );
    }
  else if(user.role==2){
    return (
      <>
       <StatusBar style="dark"/>
    <View style={styles.appContainer}>
   <AppIntroSlider
      style={styles.slide}
      data={slidesTranslator}
      renderItem={renderSlide}
      showPrevButton={true}
      onDone={()=>{TurnOffSlider()}}
      />
    
    </View>
      </>
    );
      }
  else if(user.role==3){
      return (
        <>
         <StatusBar style="dark"/>
    <View style={styles.appContainer}>
   <AppIntroSlider
      style={styles.slide}
      data={slidesAdmin}
      renderItem={renderSlide}
      showPrevButton={true}
      onDone={()=>{TurnOffSlider()}}
      />
    
    </View>
        </>
      );
        }
  }
}

export default IntroScreens

const styles = StyleSheet.create({

    appContainer:{
      flex:1,
      // paddingTop:50,
      // paddingHorizontal:16,
      // marginBottom:25,


      // backgroundColor:'#f1e7e5',
    },
    listContainer:{
      flex:5,
    },
    imageStyle:{
      width:"60%",
      height:"65%",
      borderRadius:10,
      marginLeft:0,
      borderColor:"#ffffff",
      alignSelf:"center"
    },
    slide:{
      backgroundColor:"#4267B3",
    },
    imageText:{
      color:"#ffffff",
      fontSize:20,
      marginTop:5,
      marginBottom:10,
      // marginLeft:30,
      textAlign:'center',
      // alignSelf:"center"
    },
    imageTitle:{
      color:"#ffffff",
      fontSize:20,
      fontWeight:"bold",
      marginTop:30,
      marginBottom:20,
      // marginLeft:30,
      textAlign:'center',
      // alignSelf:"center"
    }
  });
  