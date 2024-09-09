import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Background from '../../../assets/images/background.png';
import welcome from '../../../assets/images/w2.png';
import { button1, button2 } from '../../common/button'
import Axios from 'axios';
import { bwmessage, errormessage, formgroup, head1, head2, input, input2, input3, label, link, link2 } from '../../common/form'
import {useNetInfo} from "@react-native-community/netinfo";

const VerifyEmail = ({ navigation, route }) => {
    const { userdata } = route.params;

    const [errormsg, setErrormsg] = useState(null);
    const [userCode, setUserCode] = useState('XXXX');
    const [actualCode, setActualCode] = useState(null);
    const netInfo = useNetInfo();

    useEffect(() => {
        setActualCode(userdata[0]?.VerificationCode);
    }, [])

    const Sendtobackend = () => {
        // console.log(userCode);
        // console.log(actualCode);
        if (!netInfo.isConnected || !netInfo.isInternetReachable) {
            alert("Please Connect to the Internet")
            return;
          }
        else if (userCode == 'XXXX' || userCode == '') {
            setErrormsg('Please enter the code');
            return;
        }

        else if (userCode == actualCode) {
            // console.log('correct code');
            const fdata = {
                Email: userdata[0]?.Email,
            }

            console.log(fdata);
            alert('Email Verified');
            navigation.navigate('changePassword', {udata:fdata}); 
            
        }
        else if (userCode != actualCode) {
            setErrormsg('Incorrect code');
            return;
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
                    <Text style={bwmessage}>A Code has been sent to you on your email</Text>
                    {
                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                    }

                    <View style={formgroup}>
                        <Text style={label}>Code</Text>
                        <TextInput style={input3}
                            placeholder="Enter 6 digit Verification Code"

                            secureTextEntry={true}

                            onChangeText={(text) => setUserCode(text)}
                            onPressIn={() => setErrormsg(null)}

                        />
                    </View>
                    
                    <Text style={button2}
                        onPress={() => Sendtobackend()}
                    >Verify</Text>

                   
                </View>
            </View>
        </View>
    )
}

export default VerifyEmail

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