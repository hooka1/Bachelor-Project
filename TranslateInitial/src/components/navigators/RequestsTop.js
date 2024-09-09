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

const Tab= createMaterialTopTabNavigator();



const RequestsTop = () => {
    const insets=useSafeAreaInsets();
    const {user}= useSelector(state=>state.userReducer);


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
<Tab.Screen name="Requested" component={AdminAllRequest} options={{ tabBarLabel:'Not Assigned'}}/>
<Tab.Screen name="Assigned" component={AdminAllAssigned} options={{ tabBarLabel:'Assigned'}}/>
</Tab.Navigator>
  )
}
}

export default RequestsTop

const styles = StyleSheet.create({})