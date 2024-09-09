import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Background from '../../../assets/images/background.png';
import welcome from '../../../assets/images/w2.png';
import { button1, button2 } from '../../common/button'
import Axios from 'axios';
import { bwmessage, errormessage, formgroup, head1, head2, input, input3, label, link, link2 } from '../../common/form'
import {useNetInfo} from "@react-native-community/netinfo";

const ForgotPassword = ({navigation}) => {
    const [clientData,setClientData]=useState({
        Email:'',
      });
      const [errormsg, setErrormsg] = useState(null);
      const netInfo = useNetInfo();

      const Sendtobackend = () => {
        if (!netInfo.isConnected || !netInfo.isInternetReachable) {
            alert("Please Connect to the Internet")
          }
          else{
            Axios.post('http://10.0.2.2:8000/verifyEmail',{
                Email: clientData.Email,
          }
              ).then((response)=>{
                if(response.data.message==="Verification Code Sent to your Email"){
                  console.log(response.data.udata);
                  alert(response.data.message);
                  navigation.navigate('verifyEmail', {userdata:response.data.udata}); 
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
    }
}

  return (
    <View style={styles.container}>
    <Image style={styles.patternbg} source={Background} />

    <View style={styles.container1} >
        <View style={styles.s1}>
            <Image style={styles.logo} source={welcome} />
            <Text style={styles.h1} onPress={()=>navigation.navigate('welcome')}>TranslateCo, Inc.</Text>
            <Text style={styles.small1} onPress={()=>navigation.navigate('welcome')}>Translating in person or at home</Text>
        </View>
        <View style={styles.s2}>

            <Text style={head1}>Verification</Text>
            <Text style={bwmessage}>Please Enter your Email</Text>
            {
                errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
            }

            <View style={formgroup}>
                <Text style={label}>Email:</Text>
                <TextInput style={input3}
                    placeholder="Enter your Email"

                    onChangeText={(text) => setClientData({...clientData,Email:text})}
                    onPressIn={() => setErrormsg(null)}

                />
            </View>
            <Text style={button2}
                onPress={() => Sendtobackend()}
            >Send code to my email</Text>
        </View>
    </View>
</View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    patternbg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    s1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
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
    s2: {
        display: 'flex',
        backgroundColor: '#fff',
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
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
    logo: {
        height: 80,
        resizeMode: 'contain',
    }
})