import React, { useEffect } from 'react';
import {View,Text,Button,TextInput,StyleSheet,ScrollView,Image,StatusBar,Dimensions,Touchable,FlatList,SafeAreaView} from 'react-native';
import { ListItem, Avatar, Header} from 'react-native-elements'
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../res/images';
import colors from '../../res/colors';
import ExamScreenNavigator from '../main/ExamScreenNavigator';
import TestProlbemScreen from './TestProlbemScreen';
import Loader from "react-native-modal-loader";
import { Icon } from 'react-native-material-ui';
import Icons from 'react-native-vector-icons/AntDesign';
import CrossIcon from 'react-native-vector-icons/Entypo';

const RNFS = require('react-native-fs');

export default function ExamScreen({navigation, route}) {
  const [testlists, setTestlists] = React.useState(); 
  const [message, setMessage]= React.useState(true);
  const [isLoadingVisible, setIsLoadingVisible]=React.useState(false)
  const testlist = [];
  const [testIDItems, setTestIDItems] = React.useState([]);
  const [userCode, setUserCode] = React.useState('')
  const [selectedId, setSelectedId] = React.useState(null);
  const checkTested = (item)=>{
    if(!testIDItems){
      return false
    }else{
        for(var i = 0; i< testIDItems.length; i++){
          if(item.testid == testIDItems[i].test_id) return true
        }
        return false
    }
    return false
  }
  const Item = ({ item, onPress, style }) => (
    // testIDItems.map(items => (
      <ListItem 
      keyExtractor={(item) => item.testid}
      key={Math.random().toString()}
      
      topDivider
      opacity={0.4}
      onPress={() =>{
          navigation.navigate('TestProlbemScreen',{
            id:item.testid,
            testtitle:item.test_name,
            countryIndex:message
          })
        }}
      >
        <ListItem.Chevron key={Math.random().toString()} name={"arrow-left"}/>
        <ListItem.Content key={Math.random().toString()} style={{flexDirection: "row", justifyContent:'space-between', width: "100%"}}>
        {checkTested(item)?<ListItem.Title key={Math.random().toString()}><Icons name="check" size={30} color="green" /></ListItem.Title>:<ListItem.Title key={Math.random().toString()}><CrossIcon name="cross" size={30} color="red" /></ListItem.Title>}
        <ListItem.Title key={Math.random().toString()}>{item.test_name}</ListItem.Title>
        </ListItem.Content>
    </ListItem>
    // ))

    
  );
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        style={ (item.testid%2)?Styles.listViewFForm:Styles.listViewSForm }
      />
    );
  };
    useEffect(()=>{
      const OSDocument = Platform.OS =="android"?RNFS.DocumentDirectoryPath:RNFS.MainBundlePath;
      const path = OSDocument + '/test.txt';
      RNFS.readDir(OSDocument) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
    for(var i = 0; i<result.length; i++){ 
      if(result[i].name == "test.txt"){
        return Promise.all([RNFS.stat(result[i].path), result[i].path]);
      }
    }
  })
  .then((statResult) => {
    if(typeof statResult!="undefined")
    if (statResult[0].isFile()) {
      return RNFS.readFile(statResult[1], 'utf8');
    }
    return false;
  })
  .then((contents) => {
      console.log("continues", typeof parseInt(contents))
      setUserCode(parseInt(contents))
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });

      setIsLoadingVisible(true)
      // fetch user code
          axios.get(route.params.name == 'li'?'http://paldrive.com/il/getTestlist_api.php':'http://paldrive.com/ps/getTestlist_api.php')
          .then(response => {
              setTestlists(response.data.data);
              route.params.name == 'li'?setMessage('li'):setMessage('ps')
              setIsLoadingVisible(false)
          }, error => {
            setIsLoadingVisible(false)
            console.log(error);
          });
    }, [])
    
    useEffect(()=>{
      asynFetchDatas()
    }, [testlists]);

    const asynFetchDatas = async ()=>{
      var data = new FormData();
      // data.append("test_id", item);
      data.append("user_id", userCode);
      // console.log("user_id", contents)
      data.append("countryID", route.params.name);
      data.append("testIds", JSON.stringify(testlists));
      await axios({
          method: "post",
          url: "http://192.168.110.112:7190/paldrive/test_pass_api.php",
          data,
          validateStatus: (status) => {
              return true;
          },
          }).then(res=>{
            console.log('usercode;')
            console.log("success data", res.data.data)
            setTestIDItems(res.data.data)
            console.log("testIDItems", testIDItems)
          }
      );
  }
    console.log(message)
    const imageComponent = <Image source={images.logo} style={{width: "50%", resizeMode:"contain", height:50}} />
  return (
    <View style={Styles.container}>
      <Loader title="Loading" 
      size="large"
      loading={isLoadingVisible} color="#ff66be" 
      opacity='0.5'/>
      <Header
              barStyle = 'light-content'
              centerComponent={imageComponent}
              containerStyle={{
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
              }}
            />
      <SafeAreaView style={styles.container}>
        <FlatList
            data={testlists}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
        />
        </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 6,
      marginVertical: 0,
    },
    title: {
      fontSize: 20,
      textAlign: 'right'
    },
  });
  
const Styles = StyleSheet.create({
listViewFForm:{
    backgroundColor:"lightgrey",
    textAlign: 'right'
},
  container: {
    flex: 1,
    backgroundColor: '#152539',
  },
  passwordContainer: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});
