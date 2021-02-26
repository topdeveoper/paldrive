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
import WebViewScreenNavigator from './WebViewScreenNavigator';
import ExamScreenNavigator from './ExamScreenNavigator';
import SplashScreen from '../auth/SplashScreen'
import SignUpScreen from '../auth/SignUpScreen'
import MainScreen from './MainScreen'
import ViewTestLogScreen from './ViewTestLogScreen'
import TestScreen from './main/Main'
import ViewDetailLogScreen from './ViewDetailLogScreen'

export default function MainNavigator({navigation}) {
  const Stack = createStackNavigator();
  const NavigateToStoryCamera = () => navigation.navigate('StoryCamera');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          headerTransparent: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="ExamScreenNavigator"
        component={ExamScreenNavigator}
        options={{
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          headerTransparent: true,
          title: '',
          headerLeft: null
        }}
      />
      <Stack.Screen
        name="WebViewScreenNavigator"
        component={WebViewScreenNavigator}
        options={{
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          headerTransparent: true,
          title: '',
          headerLeft: null
        }}
      />
      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          headerTransparent: true,
         
          title: '',
          headerLeft: null
        }}
      />
      <Stack.Screen
        name="ViewTestLogScreen"
        component={ViewTestLogScreen}
        options={{
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          headerTransparent: true,
          title: '',
        }}ViewDetailLogScreen
      />
      <Stack.Screen
        name="ViewDetailLogScreen"
        component={ViewDetailLogScreen}
        options={{
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          headerTransparent: true,
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}
