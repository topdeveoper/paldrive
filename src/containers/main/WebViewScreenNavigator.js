import React, {lazy} from 'react';
import {View, Text, Image} from 'react-native';
import images from 'res/images';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import StoryCamera from './home/StoryCamera/StoryCamera';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DirectMessageScreen from './home/DirectMessage/DirectMessageScreen';
import StoryScreen from './home/story/StoryScreen';
import colors from '../../res/colors';
import MessageScreen from './home/MessageScreen/MessageScreen';
import SplashScreen from '../auth/SplashScreen'
import SignUpScreen from '../auth/SignUpScreen'
import WebViewScreen from './WebViewScreen'

export default function WebViewScreenNavigator({navigation}) {
    // console.log(route)
  const Stack = createStackNavigator();

  const NavigateToStoryCamera = () => navigation.navigate('StoryCamera');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        // initialParams={{ name: route.params.name}}
        options={
        {
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          headerTransparent: true,
          title: '',
          headerLeft: null
        }}
      />
      
    </Stack.Navigator>
  );
}
