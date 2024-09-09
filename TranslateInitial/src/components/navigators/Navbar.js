import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator, BottomTabBar} from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import EnteredSession from '../screens/EnteredSession'
import Ionicons from 'react-native-vector-icons/Ionicons'
const homeName='home';
const reqName='Request';
const setName='Settings';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector,useDispatch } from 'react-redux';
import Settings from '../screens/Settings'
import Topbar from './Topbar'



const Tab= createBottomTabNavigator();
const Stack= createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
function SettingsScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Settings1" component={Settings} />
    </Stack.Navigator>
  );
}

const Navbar = ({route,navigation}) => {
  const {user}= useSelector(state=>state.userReducer);

if(user.role==1){
  return (

    <Tab.Navigator initialRouteName={"home"}
    screenOptions={({route})=>({
  tabBarIcon:({focused,color,size})=>{
      let iconName;
  let rn= route.name;
  if(rn==homeName){
      iconName=focused?'home':'home-outline'
  }
  if(rn==reqName){
    iconName=focused?'add-circle':'add-circle-outline'
}
if(rn==setName){
  iconName=focused?'settings':'settings-outline'
}

  return <Ionicons name={iconName} size={size} color={color}/>
  }, tabBarStyle:{position:'absolute'},
  headerShown:false, tabBarInactiveTintColor: '#616771',
  tabBarActiveTintColor: '#4267B3',
})}  
>
    {/* <Tab.Screen name={"home"} component={Home}/> */}
    <Tab.Screen name={"home"} component={HomeScreen} options={{title:"Home"}}/>
 <Tab.Screen name={"Settings"} component={SettingsScreen}/>
    </Tab.Navigator>

  )
}
if(user.role==3){
  return (

    <Tab.Navigator initialRouteName={"home"}
    screenOptions={({route})=>({
  tabBarIcon:({focused,color,size})=>{
      let iconName;
  let rn= route.name;
  if(rn==homeName){
      iconName=focused?'home':'home-outline'
  }
  if(rn==reqName){
    iconName=focused?'add-circle':'add-circle-outline'
}
if(rn==setName){
  iconName=focused?'settings':'settings-outline'
}

  return <Ionicons name={iconName} size={size} color={color}/>
  }, tabBarStyle:{position:'absolute'},
  headerShown:false, tabBarInactiveTintColor: '#616771',
  tabBarActiveTintColor: '#4267B3',
})}  
>
    {/* <Tab.Screen name={"home"} component={Home}/> */}
    <Tab.Screen name={"home"} component={HomeScreen} options={{title:"Home"}}/>
    <Tab.Screen name={"Settings"} component={SettingsScreen}/>

    </Tab.Navigator>

  )
}

if(user.role==2){
  return (

    <Tab.Navigator initialRouteName={"home"}
    screenOptions={({route})=>({
  tabBarIcon:({focused,color,size})=>{
      let iconName;
  let rn= route.name;
  if(rn==homeName){
      iconName=focused?'home':'home-outline'
  }
  if(rn==reqName){
    iconName=focused?'add-circle':'add-circle-outline'
}
if(rn==setName){
  iconName=focused?'settings':'settings-outline'
}

  return <Ionicons name={iconName} size={size} color={color}/>
  }, tabBarStyle:{position:'absolute'},
  headerShown:false, tabBarInactiveTintColor: '#616771',
  tabBarActiveTintColor: '#4267B3',
})}  
>
    {/* <Tab.Screen name={"home"} component={Home}/> */}
    <Tab.Screen name={"home"} component={HomeScreen} options={{title:"Home"}}/>
    <Tab.Screen name={"Settings"} component={SettingsScreen}/>

    </Tab.Navigator>

  )
}
}

export default Navbar

const styles = StyleSheet.create({})