import React, {useRef, useState, useEffect} from 'react';
import {View,Text,TextInput,StyleSheet,ScrollView,Image,StatusBar,Dimensions,Touchable,FlatList,Platform,SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../../res/images';
import axios from 'axios';
import colors from '../../res/colors';
import { RadioButton, Avatar, Button,IconButton, Card, Title, Paragraph,Caption,DividerSurface,DarkTheme,DefaultTheme} from 'react-native-paper';
import MainNavigator from '../main/MainNavigator';
import ExamScreenNavigator from '../main/ExamScreenNavigator';
import WebViewScreenNavigator from '../main/WebViewScreenNavigator';
import ViewTestLogScreen from './ViewTestLogScreen';
import { useNavigation } from '@react-navigation/native';
import AwesomeButton from "react-native-really-awesome-button";
import { Header, Divider} from 'react-native-elements';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import FlatListSlider from './main/FlatListSlider';

const RNFS = require('react-native-fs');
const {width: screenWidth} = Dimensions.get('window');
const data = [
    {
      image:
      images.slider1,
    },
    {
      image:
      images.slider2,
    },
    {
      image:
      images.slider3,
    }
  ]
const MainScreen = props => {
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);
  const [logBtn, setLogBtn] = React.useState(false);
  const [validate, setValidate] = React.useState(false); 
  const [userCode, setUserCode] = React.useState('');
  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  
  useEffect(()=>{
    const OSDocument = Platform.OS =="android"?RNFS.DocumentDirectoryPath:RNFS.MainBundlePath;
    const path = OSDocument + '/test.txt';
    RNFS.readDir(OSDocument) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
          // DELETE SAVED FILE TO DEVICE

          // return RNFS.unlink(path)
          // .then(() => {
          //   console.log('FILE DELETED');
          // })
          // // `unlink` will throw an error, if the item to unlink does not exist
          // // [{"ctime": null, "isDirectory": [Function isDirectory], "isFile": [Function isFile], "mtime": 2021-02-21T19:43:48.000Z, "name": "ReactNativeDevBundle.js", "path": "/data/user/0/com.instagram/files/ReactNativeDevBundle.js", "size": 8864824}]
          // .catch((err) => {
          //   console.log(result, "file is deleted");
          // });
    for(var i = 0; i<result.length; i++){ 
      if(result[i].name == "test.txt"){
        return Promise.all([RNFS.stat(result[i].path), result[i].path]);
      }
    }
  })
  .then((statResult) => {
    if(typeof statResult!="undefined")
    if (statResult[0].isFile()) {
      setLogBtn(true)
      return RNFS.readFile(statResult[1], 'utf8');
    }
    setLogBtn(false)
    return false;
  })
  .then((contents) => {
    if(contents){
      console.log("continues", contents)
    }
    else{
     //axiios part
     axios.get('http://192.168.110.112:7190/paldrive/test_user_register.php')
     .then(async response => {
         setUserCode(response.data)
         console.log("response.data", response.data)
         RNFS.writeFile(path, response.data.toString(), 'utf8')
         .then((success) => {
         console.log(success)
         })
         .catch((err) => {
           console.log(err.message);
         });
     }, error => {
       console.log(error);
     });
console.log("reg");
    }
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });

  }, [])
  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={item.illustration}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
      </View>
    );
  };
  const _signInAsync = async (index) => {
    setValidate(true);
    navigation.navigate('ExamScreenNavigator', {'name':index})
  };
  const linkwebview =  async() => {
    navigation.navigate('WebViewScreenNavigator');
  };
  const viewTestlog =async ()=>{
    navigation.navigate('ViewTestLogScreen');
    console.log("viewTestlog")
  }
  const imageComponent = <Image source={images.logo} style={{width: "50%", resizeMode:"contain", height:50}} />
    
    return (
          <View style={styles.container}>
         <Header
              barStyle = 'light-content'
              centerComponent={imageComponent}
              containerStyle={{
                backgroundColor: '#FFC801',
                justifyContent: 'space-around',
                borderBottomColor: 13,
                borderColor: '#ddd',
                borderBottomWidth: 0,
                shadowColor: '#ddd',
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.9,
                elevation: 3,
              }}
            />
            {/* <Divider style={{ backgroundColor: '#D92119', height:2 }} /> */}
      <View style={{backgroundColor:"#152539", opacity:0.9}}>
        <SafeAreaView style={{backgroundColor:'white'}}>
        <ScrollView>
          <View style={styles.separator} />
          <FlatListSlider
            data={data}
            timer={5000}
            indicatorContainerStyle={{position:'absolute', bottom: 20}}
            indicatorActiveColor={'#8e44ad'}
            indicatorInActiveColor={'#ffffff'}
            indicatorActiveWidth={30}
            animation
          />
        </ScrollView>
      </SafeAreaView>
      </View>
        <View style={styles.mainEnterBtn}>
          <View style={{marginBottom:20, marginTop:20}}>
            <TouchableOpacity activeOpacity={0.8} onPress={() =>_signInAsync("li")}>
            <AwesomeButtonRick type="secondary"
                style={{marginBottom:10}}
                borderRadius={5}
                backgroundDarker={'#9F9F9F'}
                borderColor={'white'}
                stretch={true}
                borderWidth={0}
                paddingTop={-10}
                raiseLevel={0}
                onPress={() =>_signInAsync("li")}
                backgroundColor={"#FFC801"}>
                <Text style={{color:"black", fontSize:20, fontWeight:'bold'}}>إمتحانات التؤوريا الفلسطينية</Text></AwesomeButtonRick></TouchableOpacity>
          </View>
          <View style={{marginBottom:20, marginTop:20}}>
            <TouchableOpacity activeOpacity={0.8} onPress={() =>_signInAsync("ps")}>
              <AwesomeButtonRick type="secondary"
              style={{marginBottom:10}}
              borderRadius={5}
              paddingTop={-10}
              // borderWidth={1}
              springRelease={false}
              borderWidth={0}
              raiseLevel={0}
              backgroundDarker={'#9F9F9F'}
              borderColor={'white'}
              stretch={true}
              
              backgroundColor={'rgb(92, 184, 92)'}>
              <Text style={{color:"black", fontSize:20, fontWeight:'bold'}}>إمتحانات التؤوريا الفلسطينية</Text></AwesomeButtonRick></TouchableOpacity>
          </View>

          <View style={{marginBottom:20, marginTop:20}}>
              <TouchableOpacity activeOpacity={0.8} onPress={() =>linkwebview()}>
              <AwesomeButtonRick type="secondary"
                style={{marginBottom:10}}
                borderRadius={5}
                backgroundDarker={'#9F9F9F'}
                borderColor={'white'}
                borderWidth={0}
                paddingTop={-10}
                raiseLevel={0}
                stretch={true}
                onPress={() =>linkwebview()}
                backgroundColor={'white'}>
                <Text style={{color:"black", fontSize:20, fontWeight:'bold'}}>شرح إشارات المرور</Text></AwesomeButtonRick>
                </TouchableOpacity>
          </View>

          <View style={{marginBottom:0, marginTop:20}}>
            <TouchableOpacity activeOpacity={0.8} onPress={() =>viewTestlog()}>
              <AwesomeButtonRick type="secondary"
              style={{marginBottom:1}}
              borderRadius={5}
              backgroundDarker={'#9F9F9F'}
              borderColor={'white'}
              stretch={true}
              paddingTop={-10}
              borderWidth={0}
              raiseLevel={0}
              onPress={() =>viewTestlog()}
              backgroundColor={'#F47133'}>
              <Text style={{color:"black", fontSize:20, fontWeight:'bold'}}>تاريخ الاختبار</Text></AwesomeButtonRick></TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection:"row", justifyContent:'center', marginTop:20}}>
          <Text style={{color:"white", fontSize:16}}>حول</Text><Text style={{color:"white", fontSize:16}}> | </Text>
          <Text style={{color:"white", fontSize:16}}>اتصل بنا</Text><Text style={{color:"white", fontSize:16}}> | </Text>
          <Text style={{color:"white", fontSize:16}}>مشاركة</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:'center'}}>
          <Text style={{color:"white", fontSize:16, marginTop:10}}>&#169;Paldrive.com</Text>
        </View>
    </View>
 
    );
  };
  
  export default MainScreen;
const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
  container: {
    flex: 1,
    width:screenWidth
  },
  item: {
    width: screenWidth - 85,
    height: screenWidth - 125,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 3}),
    marginTop: Platform.select({ios: 0, android: 10}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    marginBottom:10,
    marginTop:10
  },
  container: {
    flex: 1,
    backgroundColor: '#152539',
  },
  mainEnterBtn:{
    marginTop:"5%",
    marginStart:"10%",
    marginEnd:"10%",
    flexDirection:"column",
    justifyContent:"space-around",
    height:"35%",
  }
});
