import React, { useEffect } from 'react';
import {View,Text,TextInput,StyleSheet,ScrollView,Image,StatusBar,Dimensions,Touchable,FlatList,SafeAreaView} from 'react-native';
import Axios from "axios";
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../../res/images';
import { RadioButton, Avatar, Button,IconButton, Title, Paragraph,Caption,DividerSurface,DarkTheme,DefaultTheme} from 'react-native-paper';
import colors from '../../res/colors';
import ExamScreenNavigator from '../main/ExamScreenNavigator';
import ViewDetailLogScreen from './ViewDetailLogScreen';
import { Header} from 'react-native-elements';
import CardView from 'react-native-cardview'
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';
// import ExamScreen from '../main/ExamScreenNavigator';
const RNFS = require('react-native-fs');
export default function ViewTestLogScreen({navigation}) {
  const [testLogInfo, setTestLogInfo] = React.useState([]);
  const Item = ({ item, onPress, style }) => (
  <View style={{marginStart:10, marginEnd:10}}>
    <TouchableOpacity onPress={() =>{
      navigation.navigate('ViewDetailLogScreen',{
        id:item.index,
        testtitle:item.test_problem_title,
        countryIndex:item.country_id,
        checkIDs:item.checkIDs,
        test_pro_id:item.test_pro_id
      })
    }}>
        <Card style={{
          borderColor: 'green',
          shadowColor: 'green',
          borderTopWidth:2,
          marginRight:10,
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.9,
          backgroundColor:'red',
          elevation: 10}}>
        <CardTitle>
        <Text style={styles.title}>{item.test_problem_title}</Text>
      </CardTitle>
    </Card>
    </TouchableOpacity>
</View>
  );
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        style={ (item.index%2)?Styles.listViewFForm:Styles.listViewSForm }
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
    const asynFetchDatas = async ()=>{
        var data = new FormData();
        data.append("user_id", contents);
        await Axios({
            method: "post",
            url: "http://192.168.110.112:7190/paldrive/test_get_logs_api.php",
            data,
            validateStatus: (status) => {
                return true;
            },
            }).then(res=>{
                setTestLogInfo(res.data.data)
            }
        );
    }
    asynFetchDatas();
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });
    }, [])
    console.log()
  return (
    <View style={Styles.container}>
       <Header
              centerComponent={{ text: "تاريخ الاختبار", style: { color: 'white', fontWeight:'bold', marginTop:3, fontSize:18, alignItems:'flex-start',flexDirection:'column' } }}
              containerStyle={styles.header}
            />
      <SafeAreaView style={styles.container}>
        <FlatList
            data={testLogInfo}
            style={{width:"100%"}}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
        </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
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
    },
    container: {
    flex: 1,
    flexDirection:'column',
    alignItems:'flex-start'
    },
    item: {
      padding: 6,
      marginVertical: 0,
    },
    title: {
      fontSize: 20,
      textAlign: 'right',
      backgroundColor: 'transparent'
    },
    button: {
      marginRight: 10
    }
  });
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor: 'lightgrey',
  },
  
});
