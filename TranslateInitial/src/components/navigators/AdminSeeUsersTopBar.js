import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import UserList from '../screens/admin/UserList';


const Tab= createMaterialTopTabNavigator();
const Stack= createStackNavigator();

const c=1;
const t=2;
const a=3;

function ClientScreen() {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Client" component={UserList}   initialParams={{role: c}} />
      </Stack.Navigator>
    );
  }
  function TranslatorScreen() {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Translator" component={UserList} initialParams={{role: t}} />
      </Stack.Navigator>
    );
  }
  function AdminScreen() {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Admin" component={UserList} initialParams={{role: a}} />
      </Stack.Navigator>
    );
  }

const AdminSeeUsersTopbar = ({route, navigation}) => {

  return (
<Tab.Navigator initialRouteName='Clients' screenOptions={{
    tabBarActiveTintColor:'#e91e63',
    tabBarLabelStyle:{fontSize:15, fontWeight:"bold", color:"#fff"},
    tabBarStyle:{backgroundColor:"#4267B3"},
    swipeEnabled:true,
    tabBarIndicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
}}>
<Tab.Screen name="Clients" component={ClientScreen} options={{ tabBarLabel:'Clients'}}/>
<Tab.Screen name="Translators" component={TranslatorScreen} options={{ tabBarLabel:'Translators'}}/>
<Tab.Screen name="Admins" component={AdminScreen} options={{ tabBarLabel:'Admins'}}/>

</Tab.Navigator>
  )


}

export default AdminSeeUsersTopbar

const styles = StyleSheet.create({})