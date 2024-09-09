import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RequestedSession from '../screens/RequestedSession';
import AcceptedSession from '../screens/AcceptedSession';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector,useDispatch } from 'react-redux';
import TranslatorRequests from '../screens/TranslatorRequests';
import TranslatorApproved from '../screens/TranslatorApproved';
import AdminAllRequest from '../screens/AdminAllRequest';
import AdminAllAccepted from '../screens/AdminAllAccepted';
import PreviousSession from '../screens/PreviousSession'
import TranslatorPrevious from '../screens/TranslatorPrevious'
import AdminAllPrevious from '../screens/AdminAllPrevious'
import AdminAllAssigned from '../screens/AdminAllAssigned';
import RequestsTop from './RequestsTop';
import ApprovedTopBar from './ApprovedTopBar';

const Tab= createMaterialTopTabNavigator();



const Topbar = () => {
    const insets=useSafeAreaInsets();
    const {user}= useSelector(state=>state.userReducer);

    if(user.role==1){
  return (
<Tab.Navigator initialRouteName='Requests' screenOptions={{
    tabBarActiveTintColor:'#e91e63',
    tabBarLabelStyle:{fontSize:15, fontWeight:"bold", color:"#fff"},
    tabBarStyle:{backgroundColor:"#4267B3"},
    swipeEnabled:true,
    tabBarIndicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
}}>
<Tab.Screen name="Requests" component={RequestedSession} options={{ tabBarLabel:'Requests'}}/>
<Tab.Screen name="Accepted" component={ApprovedTopBar} options={{ tabBarLabel:'Accepted Sessions'}}/>
<Tab.Screen name="Previous" component={PreviousSession} options={{ tabBarLabel:'Previous Sessions'}}/>
</Tab.Navigator>
  )
}
if(user.role==2){
  return (
<Tab.Navigator initialRouteName='Requests' screenOptions={{
    tabBarActiveTintColor:'#e91e63',
    tabBarLabelStyle:{fontSize:15, fontWeight:"bold", color:"#fff"},
    tabBarStyle:{backgroundColor:"#4267B3"},
    swipeEnabled:true,
    tabBarIndicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
}}>
<Tab.Screen name="Requests" component={TranslatorRequests} options={{ tabBarLabel:'Requests'}}/>
<Tab.Screen name="Accepted" component={ApprovedTopBar} options={{ tabBarLabel:'Accepted Sessions'}}/>
<Tab.Screen name="Previous" component={TranslatorPrevious} options={{ tabBarLabel:'Previous Sessions'}}/>
</Tab.Navigator>
  )
}
if(user.role==3){
  return (
<Tab.Navigator initialRouteName='Requests' screenOptions={{
    tabBarActiveTintColor:'#e91e63',
    tabBarLabelStyle:{fontSize:15, fontWeight:"bold", color:"#fff"},
    tabBarStyle:{backgroundColor:"#4267B3"},
    swipeEnabled:true,
    tabBarIndicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
}}>
<Tab.Screen name="Requests" component={RequestsTop} options={{ tabBarLabel:'Requests'}}/>
<Tab.Screen name="Accepted" component={AdminAllAccepted} options={{ tabBarLabel:'Accepted Sessions'}}/>
<Tab.Screen name="Previous" component={AdminAllPrevious} options={{ tabBarLabel:'Previous Sessions'}}/>
</Tab.Navigator>
  )
}
}

export default Topbar

const styles = StyleSheet.create({})