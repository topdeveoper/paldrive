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
import ExamScreen from './ExamScreen'
import TestProlbemScreen from './TestProlbemScreen'

export default function ExamScreenNavigator({navigation, route}) {
    // console.log(route)
  const Stack = createStackNavigator();

  const NavigateToStoryCamera = () => navigation.navigate('StoryCamera');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExamScreen"
        component={ExamScreen}
        initialParams={{ name: route.params.name}}
        options={({ route }) => ({ title: "abc" }),
        {
          headerStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            // backgroundColor: '#000'
          },
          headerTintColor: '#fff',
          headerTransparent: true,
          title: '',
          headerShown: true,
          headerLeft: null
        }}
      />
      <Stack.Screen
        name="TestProlbemScreen"
        component={TestProlbemScreen}
        // initialParams={{ name: route.params.name}}
        options={({ route }) => ({ title: "abc" }),
        {
          headerStyle: {backgroundColor: '#000', marginStart:10},
          headerTintColor: '#fff',
          headerTransparent: true,
          title: '',
          headerLeft: null
        }}
      />
    </Stack.Navigator>
  );
}
