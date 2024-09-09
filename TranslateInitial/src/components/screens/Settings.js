import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TextInput, Button,View,FlatList,Text } from 'react-native';
import { button1,button2 } from '../../common/button';
import { useSelector,useDispatch } from 'react-redux';


 const Settings =  ({navigation,route}) => {

    const {token}= useSelector(state=>state.userReducer);
  const {user}= useSelector(state=>state.userReducer);

 



  function seeProfile(){
    navigation.navigate('Draw',{screen:'Profile'})
    console.log(user)
  }
  function seeReports(){
    navigation.navigate('ReportTopTab'); 
    console.log(user)
  }
  function addLang(){
    navigation.navigate('AddLanguage'); 
    console.log(user)
  }

 
if(user.role==2){
  return (
    <>
    <StatusBar style="dark"/>
    <View style={styles.appContainer}>
    <Text style={button2} onPress={seeProfile}>Profile</Text>
    <Text style={button1} onPress={()=>navigation.navigate('welcome')}>Logout</Text>
    </View>
    </>
  );
 }
else{
  return (
    <>
    <StatusBar style="dark"/>
    <View style={styles.appContainer}>
    <Text style={button2} onPress={seeProfile}>Profile</Text>
    {
      user.role==1?<Text style={button2} onPress={seeReports}>My Reports</Text>:<Text style={button2} onPress={seeReports}>Reports</Text>
    }
    {
      user.role==1?<></>:<Text style={button2} onPress={addLang}>Add Language</Text>
    }
    <Text style={button1} onPress={()=>navigation.navigate('welcome')}>Logout</Text>
    </View>
    </>
  );
  }
  
  
  
}

export default Settings

const styles = StyleSheet.create({

    appContainer:{
      flex:1,
      paddingTop:50,
      paddingHorizontal:16,
      // backgroundColor:'#f1e7e5',
    },
    listContainer:{
      flex:5,
    },
  });
  