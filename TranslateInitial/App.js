import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet,TextInput, Button,View,FlatList,Text,AppRegistry } from 'react-native';
import Welcome from './src/components/screens/Welcome';
import Login from './src/components/screens/Login';
import Signup from './src/components/screens/Signup';
import Home from './src/components/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Verification from './src/components/screens/Verification';
import ForgotPassword from './src/components/screens/ForgotPassword';
import VerifyEmail from './src/components/screens/VerifyEmail';
import ChangeForgottenPassword from './src/components/screens/ChangeForgottenPassword';
import EnteredSession from './src/components/screens/EnteredSession';
import Navbar from './src/components/navigators/Navbar';
import Drawer from './src/components/navigators/Drawer';
//import Drawer from './src/components/screens/Drawer';
import {Provider} from 'react-redux';
import { Store } from './src/redux/store';
import Topbar from './src/components/navigators/Topbar';
import AddUserHome from './src/components/screens/AddUserHome';
import AssignTranslator from './src/components/screens/AssignTranslator';
import TranslatorLanguages from './src/components/screens/TranslatorLanguages';
import IntroScreens from './src/components/screens/IntroScreens';
import AdminSeeUsersTopbar from './src/components/navigators/AdminSeeUsersTopBar';
import UserDetails from './src/components/screens/admin/UserDetails';
import SessionDetails from './src/components/screens/SessionDetails'
import ReportTopTab from './src/components/navigators/ReportTopTab';
import ReportType from './src/components/screens/reports/ReportType';
import UnreportedPrevious from './src/components/screens/reports/UnreportedPrevious';
import ReportDetails from './src/components/screens/reports/ReportDetails';
import ResolveReport from './src/components/screens/reports/ResolveReport';
import { StripeProvider } from '@stripe/stripe-react-native';
import AddLanguage from './src/components/screens/admin/AddLanguage';

const Stack= createNativeStackNavigator();
 
export default function App() {

  return(
    <>
    <Provider store={Store}>
      <StatusBar style="light"/>
      <StripeProvider publishableKey="pk_test_51NBMhUHrbbS6btj2CIU5tbo1Muo53oKtdQk7eYeDvWIJa0ycIRuf5yyGJklhOeagzzUlcm3dSPiIXYG6hiax0jIZ00wB95BvIR">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="welcome" component={Welcome}
           options={
            {
              headerShown: false
            }
          }/>
          <Stack.Screen name="login" component={Login}
           options={
            {
              headerShown: false
            }
          }/>
          <Stack.Screen name="signup" component={Signup}
           options={
            {
              headerShown: false
            }
          }/>
          {/* <Stack.Screen name="home" component={Home}
           options={
            {
              headerShown: false
            }
          }/> */}
          <Stack.Screen name="verification" component={Verification}
           options={
            {
              headerShown: false
            }
          }/>
          <Stack.Screen name="forgot" component={ForgotPassword}
           options={
            {
              headerShown: false
            }
          }/>
           <Stack.Screen name="verifyEmail" component={VerifyEmail}
           options={
            {
              headerShown: false
            }
          }/>
            <Stack.Screen name="changePassword" component={ChangeForgottenPassword}
           options={
            {
              headerShown: false
            }
          }/>
           <Stack.Screen name="AddUserHome" component={AddUserHome}
           options={
            {
              headerShown: true,
              headerBackVisible:true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"Add User",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
            <Stack.Screen name="AssignTranslator" component={AssignTranslator}
           options={
            {
              headerShown: true,
              headerBackVisible:true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"Assign Translator",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
           <Stack.Screen name="TranslatorLanguages" component={TranslatorLanguages}
           options={
            {
              headerShown: true,
              headerBackVisible:true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"Your Languages",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
          <Stack.Screen name="report" component={ReportType}
           options={
            {
              headerShown: true,
              headerBackVisible:true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"Report",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
                 <Stack.Screen name="UserDetails" component={UserDetails}
           options={
            {
              headerShown: true,
              headerBackVisible:true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"User Details",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
           <Stack.Screen name="RequestSession" component={EnteredSession}
           options={
            {
              headerShown: true,
              headerBackVisible:true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"Request New Session",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
                    <Stack.Screen name="SessionDetails" component={SessionDetails}
           options={
            {
              headerShown: true,
              headerBackVisible:true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"Session Details",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
                        <Stack.Screen name="ReportDetails" component={ReportDetails}
           options={
            {
              headerShown: true,
              headerBackVisible:true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"Report Details",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
            <Stack.Screen name="UnreportedPrevious" component={UnreportedPrevious}
           options={
            {
              headerShown: true,
              headerBackVisible:true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"Previous Sessions",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
              <Stack.Screen name="AddLanguage" component={AddLanguage}
           options={
            {
              headerShown: true,
              headerBackVisible:true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"Add Language",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
                      <Stack.Screen name="ResolveReport" component={ResolveReport}
           options={
            {
              headerShown: true,
              headerBackVisible:true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"Resolve",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
            <Stack.Screen name="IntroScreens" component={IntroScreens}
           options={
            {
              headerShown: false,
             
            }
          }/>
            <Stack.Screen name="Tab" component={Navbar} screenOptions={{ headerShown: false}}  options={
            {
              headerShown: false
            }
          }/>
              <Stack.Screen name="Draw" component={Drawer} screenOptions={{ headerShown: false}}  options={
            {
              headerShown: false
            }
          }/>
            <Stack.Screen name="Top" component={Topbar} screenOptions={{ headerShown: true}}  options={
            {
              headerShown: true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"All Sessions",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>

            <Stack.Screen name="UserListTop" component={AdminSeeUsersTopbar} screenOptions={{ headerShown: true}}  options={
            {
              headerShown: true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"All Users",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>

            <Stack.Screen name="ReportTopTab" component={ReportTopTab} screenOptions={{ headerShown: true}}  options={
            {
              headerShown: true,
              headerTintColor:"#ffffff",
              headerTitleAlign:"center",
              headerTitle:"Reports",
              headerStyle:{backgroundColor:"#4267B3"}
            }
          }/>
      
        </Stack.Navigator>
      </NavigationContainer>
      </StripeProvider>
      </Provider>
    </>
  )
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
  },
  appContainer:{
    flex:1,
    paddingTop:50,
    paddingHorizontal:16,
    backgroundColor:'#1e085a',
  },
  listContainer:{
    flex:5,
  },
});
