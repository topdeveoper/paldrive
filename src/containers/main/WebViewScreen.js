import React, { useEffect } from 'react';
import {View,Text,Button,TextInput,StyleSheet,ScrollView,Image,StatusBar,Dimensions,Touchable,FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../../res/images';
import colors from '../../res/colors';
import WebView from 'react-native-webview'
import MainNavigator from '../main/MainNavigator';
import ExamScreenNavigator from '../main/ExamScreenNavigator';
import WebViewScreenNavigator from '../main/WebViewScreenNavigator';
import { Header} from 'react-native-elements';
import Loader from "react-native-modal-loader";
StatusBar.setBarStyle('light-content');
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function WebViewScreen({navigation}) {
  const [isLoadingVisible, setIsLoadingVisible] = React.useState(true)
  let loadingTime = setTimeout(() => setIsLoadingVisible(false), 3000)
  useEffect(() => {
    loadingTime
  }, [setIsLoadingVisible]);
  return (
    <View style={Styles.container}>
      <Loader title="Loading" 
      size="large"
      loading={isLoadingVisible} color="#ff66be" 
      opacity='0.8'/>
      <Header
          barStyle = 'light-content'
          // leftComponent={{ icon: 'home', color: '#fff', marginTop:5 }}
          centerComponent={{ text: "شارة مرور", style: { color: 'white', fontWeight:'bold', marginTop:3, fontSize:23, alignItems:'flex-start',flexDirection:'column' } }}
          containerStyle={Styles.header}
        />
       <WebView
      source={{ uri: 'http://paldrive.com/app/webview/signs.html' }}/> 
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152539',
  },
  header:{
    height:'12%',
    backgroundColor: '#FFC801',
    justifyContent: 'space-around',
    borderBottomWidth:2,
    borderBottomColor: 'lightgrey',
    borderColor: 'red',
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    elevation: 3,
  }
});
