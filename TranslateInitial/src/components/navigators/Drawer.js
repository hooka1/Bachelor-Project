import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Profile from '../screens/Profile'
import Navbar from './Navbar';
import DrawerDesign from '../screens/DrawerDesign';
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { createStackNavigator } from '@react-navigation/stack';
import EditProfile from '../screens/EditProfile';
import ReportAll from '../screens/reports/ReportAll';
import { useSelector,useDispatch } from 'react-redux';


const drawer= createDrawerNavigator();
const ProfileStack= createStackNavigator();
const ReportStack=createStackNavigator();

const ProfileStackScreen=({navigation})=>(
  <ProfileStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor:'#4267B3',
      shadowColor:'#fff',
      elevation:0
    },
    headerTintColor:'#fff',
    headerTitleStyle:{
      fontWeight:'bold',
    }
  }}>
<ProfileStack.Screen
name="profile"
component={Profile}
options={{
  headerTitleAlign:'center',
  headerLeft:()=>(
    <Ionicons.Button
    name="menu-outline"
    size={25}
    backgroundColor="#4267B3"
    color="#fff"
    onPress={()=>navigation.openDrawer()}
    />
  ),
  headerRight:()=>(
    <MaterialCommunityIcons.Button
    name="account-edit"
    size={25}
    backgroundColor="#4267B3"
    color="#fff"
    onPress={()=>navigation.navigate('EditProfile')}
    />
  )
}}
/>
<ProfileStack.Screen name="EditProfile" options={{title:"Edit Profile", headerTitleAlign:'center'}} component={EditProfile}/>
  </ProfileStack.Navigator>
)

const ReportStackScreen=({navigation})=>(
  <ReportStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor:'#4267B3',
      shadowColor:'#fff',
      elevation:0
    },
    headerTintColor:'#fff',
    headerTitleStyle:{
      fontWeight:'bold',
    }
  }}>
<ReportStack.Screen
name="report1"
component={ReportAll}
options={{
  headerTitleAlign:'center',
  headerTitle:'Report',
  headerLeft:()=>(
    <Ionicons.Button
    name="menu-outline"
    size={25}
    backgroundColor="#4267B3"
    color="#fff"
    onPress={()=>navigation.openDrawer()}
    />
  )
}}
/>
  </ReportStack.Navigator>
)

const Drawer = ({navigation}) => {

  const {user}= useSelector(state=>state.userReducer);

  if(user.role==1){
    return (
      <drawer.Navigator initialRouteName="Home" useLegacyImplementation={false}  screenOptions={{
            headerShown: false,
            drawerLabelStyle:{marginLeft:-25, fontFamily:"Roboto", fontSize:15},
            drawerActiveBackgroundColor:'#3b5998',
            drawerActiveTintColor:'#fff',
            drawerInactiveTintColor:'#333'
          }} drawerContent={props=><DrawerDesign {...props}/>} >
         <drawer.Screen name="Home" component={Navbar} options={{
          drawerIcon:({color})=>(
            <Ionicons name="home-outline" size={22} color={color}/>
          )
         }} />
        {/* <drawer.Screen name="profile" component={Profile} options={{
          drawerIcon:({color})=>(
            <Ionicons name="person-outline" size={22} color={color}/>
          )
         }}/> */}
          <drawer.Screen name="Profile" component={ProfileStackScreen} options={{
          drawerIcon:({color})=>(
            <Ionicons name="person-outline" size={22} color={color}/>
          )
         }}/>
           <drawer.Screen name="Report" component={ReportStackScreen} options={{
          drawerIcon:({color})=>(
            <Feather name="flag" color={color} size={22} />
            )
         }}/>
      </drawer.Navigator>
      )
  }
  else{
    return (
      <drawer.Navigator initialRouteName="Home" useLegacyImplementation={false}  screenOptions={{
            headerShown: false,
            drawerLabelStyle:{marginLeft:-25, fontFamily:"Roboto", fontSize:15},
            drawerActiveBackgroundColor:'#3b5998',
            drawerActiveTintColor:'#fff',
            drawerInactiveTintColor:'#333'
          }} drawerContent={props=><DrawerDesign {...props}/>} >
         <drawer.Screen name="Home" component={Navbar} options={{
          drawerIcon:({color})=>(
            <Ionicons name="home-outline" size={22} color={color}/>
          )
         }} />
        {/* <drawer.Screen name="profile" component={Profile} options={{
          drawerIcon:({color})=>(
            <Ionicons name="person-outline" size={22} color={color}/>
          )
         }}/> */}
          <drawer.Screen name="Profile" component={ProfileStackScreen} options={{
          drawerIcon:({color})=>(
            <Ionicons name="person-outline" size={22} color={color}/>
          )
         }}/>
      </drawer.Navigator>
      )
  }
}

export default Drawer

const styles = StyleSheet.create({})