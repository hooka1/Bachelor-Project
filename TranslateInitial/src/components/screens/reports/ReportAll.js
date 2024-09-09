import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TextInput, Button,View,FlatList,Text } from 'react-native';
import { button1,button2 } from '../../../common/button';
import { useSelector,useDispatch } from 'react-redux';


 function ReportAll({navigation,route}){

    const {token}= useSelector(state=>state.userReducer);
  const {user}= useSelector(state=>state.userReducer);

 



  function reportSession(){
    navigation.navigate('UnreportedPrevious')
    console.log(user)
  }
  function reportSystem(){
    navigation.navigate('report',{ ReportType:"System"})
    console.log(user)
  }

 

  return (
    <>
    <StatusBar style="dark"/>
    <View style={styles.appContainer}>
    <Text style={button2} onPress={reportSession}>Report Session</Text>
    <Text style={button2} onPress={reportSystem}>Report System</Text>
    </View>
    </>
  );
  
  
  
}

export default ReportAll

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
  