import { StyleSheet,TextInput, Button,View, Modal,Image,Text, ScrollView} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useState } from 'react';
import Axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {useNetInfo} from "@react-native-community/netinfo";


function AddUser(props){
    const [user,setUser]=useState({
        Name:"",
        Username:"",
        Email:"",
        Password:"",
        dob:"",
        role:props.role,
        PhoneNumber:"",
    });

   const navigation=useNavigation();
   const netInfo = useNetInfo();

    function Add(){
if(user.Name==''||user.Username==''||user.Email==''||user.Password==""||user.dob==""||user.PhoneNumber==""){
  alert('please fill all fields');
}
else if(user.role==undefined){
  alert('error');
}
else{
  if (!netInfo.isConnected || !netInfo.isInternetReachable) {
    alert("Please Connect to the Internet")
  }
    else if(user.role==1){
        Axios.post('http://10.0.2.2:8000/addClient',{  
            Name: user.Name,
            Username: user.Username,
            Email:user.Email,
            Password: user.Password,
            dob:user.dob,
            PhoneNumber:user.PhoneNumber,
          },{
            headers:{authorization:'Bearer ' +props.token},
          }
          ).then((response)=>{
            if(response.data.error){
              alert(response.data.error);
            }
            else{
              alert("Client successfully created")  
              props.goBackToHub();
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
    else if(user.role==2){
        Axios.post('http://10.0.2.2:8000/addTranslator',{  
            Name: user.Name,
            Username: user.Username,
            Email:user.Email,
            Password: user.Password,
            dob:user.dob,
            PhoneNumber:user.PhoneNumber,
          },{
            headers:{authorization:'Bearer ' +props.token},
          }
          ).then((response)=>{
            if(response.data.error){
              alert(response.data.error);
            }
            else{
              alert("Translator successfully created")  
              props.goBackToHub();
            }
        }).catch((err) => {
          if (err.response.status === 401) {
            alert("please Login")
            navigation.navigate("login")
          } 
          else if(err.response.status==500) {
            alert("Please Connect to the Internet")
            navigation.navigate("login")
          }
          // console.log(reason.message)
        })
    }
    else if(user.role==3){
        Axios.post('http://10.0.2.2:8000/addAdmin',{  
            Name: user.Name,
            Username: user.Username,
            Email:user.Email,
            Password: user.Password,
            dob:user.dob,
            PhoneNumber:user.PhoneNumber,
          },{
            headers:{authorization:'Bearer ' +props.token},
          }
          ).then((response)=>{
            if(response.data.error){
              alert(response.data.error);
            }
            else{
              alert("Admin successfully created")  
              props.goBackToHub();
            }
        }).catch((err) => {
          if (err.response.status === 401) {
            alert("please Login")
            navigation.navigate("login")
          } 
          else if(err.response.status==500) {
            alert("Please Connect to the Internet")
            navigation.navigate("login")
          }
          // console.log(reason.message)
        })
    }
 
}
    }

if(props.role==1){
   return(
    <Modal visible={props.showModal} animationType="slide" >
   <View >
   <ScrollView style={styles.s2}>
   <View style={styles.inputContainer}>
   <Text style={styles.h1}>Add Client</Text>
   <Ionicons name="add-circle-outline"  size={125} style={{marginBottom:20,color:"#4267B3",backgroundColor:"#E9EBEE", borderColor:"#4267B7"}}/>
        <TextInput style={styles.text} placeholder='enter Client Name' onChangeText={(selectedItem)=>{setUser({...user,Name:selectedItem}); console.log(user.Name)}} placeholderTextColor={"#000000"}/>
        <TextInput style={styles.text} placeholder='enter Client Username' onChangeText={(selectedItem)=>{setUser({...user,Username:selectedItem}); console.log(user.Username)}} placeholderTextColor={"#000000"}/>
        <TextInput style={styles.text} placeholder='enter Client Email' onChangeText={(selectedItem)=>{setUser({...user,Email:selectedItem}); console.log(user.Email)}} placeholderTextColor={"#000000"}/>
        <TextInput style={styles.text} placeholder='enter Client Password' onChangeText={(selectedItem)=>{setUser({...user,Password:selectedItem}); console.log(user.Password)}} placeholderTextColor={"#000000"}/>
        <TextInput style={styles.text} placeholder='enter Client Date of Birth' onChangeText={(selectedItem)=>{setUser({...user,dob:selectedItem}); console.log(user.dob)}} placeholderTextColor={"#000000"}/>
        <TextInput style={styles.text} placeholder='enter Client Phone Number' onChangeText={(selectedItem)=>{setUser({...user,PhoneNumber:selectedItem}); console.log(user.PhoneNumber)}} placeholderTextColor={"#000000"}/>
        <View style={styles.buttonContainer}> 
        <View style={styles.button}>
        <Button title="Add " onPress={Add} color="#4267B3"/>
        </View>
        <View style={styles.button}>
        <Button title="Cancel" onPress={props.goBackToHub} color="#f31282"/>
        </View>
        </View>
        </View>
        </ScrollView>
        </View>
        </Modal>
   )
}
else if(props.role==2){
    return(
     <Modal visible={props.showModal} animationType="slide" >
      <View >
   <ScrollView style={styles.s2}>
    <View style={styles.inputContainer}>
    <Text style={styles.h1}>Add Translator</Text>
    <Ionicons name="add-circle-outline"  size={125} style={{marginBottom:20,color:"#4267B3",backgroundColor:"#E9EBEE", borderColor:"#4267B7"}}/>
         <TextInput style={styles.text} placeholder='enter Translator Name' onChangeText={(selectedItem)=>{setUser({...user,Name:selectedItem}); console.log(user.Name)}} placeholderTextColor={"#000000"}/>
         <TextInput style={styles.text} placeholder='enter Translator Username' onChangeText={(selectedItem)=>{setUser({...user,Username:selectedItem}); console.log(user.Username)}} placeholderTextColor={"#000000"}/>
         <TextInput style={styles.text} placeholder='enter Translator Email' onChangeText={(selectedItem)=>{setUser({...user,Email:selectedItem}); console.log(user.Email)}} placeholderTextColor={"#000000"}/>
         <TextInput style={styles.text} placeholder='enter Translator Password' onChangeText={(selectedItem)=>{setUser({...user,Password:selectedItem}); console.log(user.Password)}} placeholderTextColor={"#000000"}/>
         <TextInput style={styles.text} placeholder='enter Translator Date of Birth' onChangeText={(selectedItem)=>{setUser({...user,dob:selectedItem}); console.log(user.dob)}} placeholderTextColor={"#000000"}/>
         <TextInput style={styles.text} placeholder='enter Translator Phone Number' onChangeText={(selectedItem)=>{setUser({...user,PhoneNumber:selectedItem}); console.log(user.PhoneNumber)}} placeholderTextColor={"#000000"}/>
         <View style={styles.buttonContainer}> 
         <View style={styles.button}>
         <Button title="Add " onPress={Add} color="#4267B3"/>
         </View>
         <View style={styles.button}>
         <Button title="Cancel" onPress={props.goBackToHub} color="#f31282"/>
         </View>
         </View>
         </View>
         </ScrollView>
        </View>
         </Modal>
    )
 }
 else if(props.role==3){
    return(
     <Modal visible={props.showModal} animationType="slide" >
        <View >
   <ScrollView style={styles.s2}>
    <View style={styles.inputContainer}>
    <Text style={styles.h1} >Add Admin</Text>
    <Ionicons name="add-circle-outline"  size={125} style={{marginBottom:20,color:"#4267B3",backgroundColor:"#E9EBEE", borderColor:"#4267B7"}}/>
         <TextInput style={styles.text} placeholder='enter Admin Name' onChangeText={(selectedItem)=>{setUser({...user,Name:selectedItem}); console.log(user.Name)}} placeholderTextColor={"#000000"}/>
         <TextInput style={styles.text} placeholder='enter Admin Username' onChangeText={(selectedItem)=>{setUser({...user,Username:selectedItem}); console.log(user.Username)}} placeholderTextColor={"#000000"}/>
         <TextInput style={styles.text} placeholder='enter Admin Email' onChangeText={(selectedItem)=>{setUser({...user,Email:selectedItem}); console.log(user.Email)}} placeholderTextColor={"#000000"}/>
         <TextInput style={styles.text} placeholder='enter Admin Password' onChangeText={(selectedItem)=>{setUser({...user,Password:selectedItem}); console.log(user.Password)}} placeholderTextColor={"#000000"}/>
         <TextInput style={styles.text} placeholder='enter Admin Date of Birth' onChangeText={(selectedItem)=>{setUser({...user,dob:selectedItem}); console.log(user.dob)}} placeholderTextColor={"#000000"}/>
         <TextInput style={styles.text} placeholder='enter Admin Phone Number' onChangeText={(selectedItem)=>{setUser({...user,PhoneNumber:selectedItem}); console.log(user.PhoneNumber)}} placeholderTextColor={"#000000"}/>
         <View style={styles.buttonContainer}> 
         <View style={styles.button}>
         <Button title="Add " onPress={Add} color="#4267B3"/>
         </View>
         <View style={styles.button}>
         <Button title="Cancel" onPress={props.goBackToHub} color="#f31282"/>
         </View>
         </View>
         </View>
         </ScrollView>
        </View>
         </Modal>
    )
 }
};
export default AddUser;

// const styles = StyleSheet.create({
//     inputContainer: {
//       flex: 1,
//       flexDirection:'column',
//       backgroundColor: '#311b6b',
//       alignItems: 'center',
//       justifyContent: 'center',
//      // marginBottom:24,
//       padding:16,
//       // borderBottomColor:"#555555",
//       // borderBottomWidth:1,
//     }, 
//     text:{
//      // marginRight:8,
//       padding: 10,
//       borderWidth:1,
//       marginBottom:8,
//       borderColor:'#e4d0ff',
//       borderRadius:6,
//       width:'100%',
//       backgroundColor:'#e4d0ff',
//       color:'#120438'
//     },
//     buttonContainer:{
//       flexDirection:"row",
//     },
//     button:{
//       width:100,
//       marginTop:16,
//       marginHorizontal:8
//     },
//     image:{
//       width:100,
//       height:100,
//       margin:20
//     },
//     h1: {
//         fontSize: 30,
//         color: '#fff',
//       },
//   });



  const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      flexDirection:'column',
      // backgroundColor: '#f1e7e5',
      backgroundColor: '#E9EBEE',
      alignItems: 'center',
      justifyContent: 'center',
     marginTop:15,
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
      marginBottom:8,
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
      marginTop:16,
      marginHorizontal:8
    },
    image:{
      width:100,
      height:100,
      margin:20
    },
    h1: {
      fontSize: 30,
      color: '#4267B3',
    },
    s2:{
      display:'flex',
      backgroundColor: '#E9EBEE',
      width:'100%',
      height:'100%',
      // borderTopLeftRadius:30,
      // borderTopRightRadius:30,
      // padding:16,
     },
  
  });