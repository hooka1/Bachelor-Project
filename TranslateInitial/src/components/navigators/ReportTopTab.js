import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector,useDispatch } from 'react-redux';
import ClientResolved from '../screens/reports/ClientResolved';
import ClientUnresolved from '../screens/reports/ClientUnresolved';
import AdminResolved from '../screens/reports/AdminResolved';
import AdminSessionUnresolved from '../screens/reports/AdminSessionUnresolved';
import AdminSystemUnresolved from '../screens/reports/AdminSystemUnresolved';


const Tab= createMaterialTopTabNavigator();



const ReportTopTab = () => {
    const insets=useSafeAreaInsets();
    const {user}= useSelector(state=>state.userReducer);

    if(user.role==1){
  return (
<Tab.Navigator initialRouteName='Unresolved' screenOptions={{
    tabBarActiveTintColor:'#e91e63',
    tabBarLabelStyle:{fontSize:15, fontWeight:"bold", color:"#fff"},
    tabBarStyle:{backgroundColor:"#4267B3"},
    swipeEnabled:true,
    tabBarIndicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
}}>
<Tab.Screen name="Unresolved" component={ClientUnresolved} options={{ tabBarLabel:'Unresolved'}}/>
<Tab.Screen name="Resolved" component={ClientResolved} options={{ tabBarLabel:'Resolved'}}/>
</Tab.Navigator>
  )
}

if(user.role==3){
  return (
<Tab.Navigator initialRouteName='Session' screenOptions={{
    tabBarActiveTintColor:'#e91e63',
    tabBarLabelStyle:{fontSize:15, fontWeight:"bold", color:"#fff"},
    tabBarStyle:{backgroundColor:"#4267B3"},
    swipeEnabled:true,
    tabBarIndicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
}}>
<Tab.Screen name="Session" component={AdminSessionUnresolved} options={{ tabBarLabel:'Session Reports'}}/>
<Tab.Screen name="System" component={AdminSystemUnresolved} options={{ tabBarLabel:'System Reports'}}/>
<Tab.Screen name="Resolved" component={AdminResolved} options={{ tabBarLabel:'Resolved Reports'}}/>
</Tab.Navigator>
  )
}
}

export default ReportTopTab

const styles = StyleSheet.create({})