import React, { useEffect } from 'react';
import {View,Text,TextInput,StyleSheet,ScrollView,Image,StatusBar,Dimensions,Touchable,FlatList,SafeAreaView,useWindowDimensions} from 'react-native';
import Axios from "axios";
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../../res/images';
import { RadioButton, Avatar, Button,IconButton, Card, Title, Paragraph,Caption,DividerSurface,DarkTheme,DefaultTheme} from 'react-native-paper';
import HTML from "react-native-render-html";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Entypo';
import ExamScreenNavigator from '../main/ExamScreenNavigator';
import IconSquare from 'react-native-vector-icons/Feather';
import { Header} from 'react-native-elements';
import { Divider } from 'react-native-elements';
import Loader from "react-native-modal-loader";
const RNFS = require('react-native-fs');
export default function ViewDetailLogScreen({navigation, route}) {
  const [testLogInfo, setTestLogInfo] = React.useState([]);
  const contentWidth = useWindowDimensions().width;
  const [countryPass, setCountryPass] = React.useState('');
  const [logInfoIndex, setLogInfoIndex] = React.useState(0);
  const [isLoadingVisible, setIsLoadingVisible] = React.useState(true)

  const Item = ({ item, index }) => (
    <Card style={{marginBottom:10}}>
    <Card.Content>
      <HTML 
        source={{ html: "<div style=\"marginBottom:20; color:'rgb(96, 15, 192)'\">"+item.question_text.replace("files", "'"+countryPass).replace("jpg", "jpg'").replace("alt=", "").replace("<img", "<img class='testIssue_img'").trim().replace("<br><br>", "").replace("<br>", "")+"</div><style> div {font-size: 10px!important;width:50px; display:flex;flex-direction:column; text-align:right} img{width:50px}</style>" }} contentWidth={contentWidth} style={{fontSize:88}}
        tagsStyles={{div: {
          fontSize: 20
        }}}
      />
      <TouchableOpacity activeOpacity={1}  style={Styles.resultContainer}>
            <Text style={route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID==1?item?.answer_correct==route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID?Styles.correctAnswer:Styles.inCorrectAnswer:item?.answer_correct==1?Styles.correctAnswer:null}>{item?.question_opt1}</Text>
            {
              route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID==1?item?.answer_correct==route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID?<Icon name="check-square-o" size={30} color="green" />:<Icons name="squared-cross" size={30} color="#900" />:item?.answer_correct==1?<Icon name="check-square-o" size={30} color="green" />:<IconSquare name="square" size={30} color="black" />
            }
      </TouchableOpacity>
      <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }} />
      <TouchableOpacity activeOpacity={1}  style={Styles.resultContainer}>
      <Text style={route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID==2?item?.answer_correct==route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID?Styles.correctAnswer:Styles.inCorrectAnswer:item?.answer_correct==2?Styles.correctAnswer:null}>{item?.question_opt2}</Text>
            {
             route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID==2?item?.answer_correct==route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID?<Icon name="check-square-o" size={30} color="green" />:<Icons name="squared-cross" size={30} color="#900" />:item?.answer_correct==2?<Icon name="check-square-o" size={30} color="green" />:<IconSquare name="square" size={30} color="black" />
            }
      </TouchableOpacity>
      <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }} />
      <TouchableOpacity activeOpacity={1}  style={Styles.resultContainer}>
      <Text style={route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID==3?item?.answer_correct==route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID?Styles.correctAnswer:Styles.inCorrectAnswer:item?.answer_correct==3?Styles.correctAnswer:null}>{item?.question_opt1}</Text>
            {
               route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID==3?item?.answer_correct==route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID?<Icon name="check-square-o" size={30} color="green" />:<Icons name="squared-cross" size={30} color="#900" />:item?.answer_correct==3?<Icon name="check-square-o" size={30} color="green" />:<IconSquare name="square" size={30} color="black" />
            }
      </TouchableOpacity>
      <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }} />
      <TouchableOpacity activeOpacity={1}  style={Styles.resultContainer}>
      <Text style={route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID==4?item?.answer_correct==route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID?Styles.correctAnswer:Styles.inCorrectAnswer:item?.answer_correct==4?Styles.correctAnswer:null}>{item?.question_opt1}</Text>
            {
               route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID==4?item?.answer_correct==route.params?.checkIDs[testLogInfo.indexOf(item)].checkedID?<Icon name="check-square-o" size={30} color="green" />:<Icons name="squared-cross" size={30} color="#900" />:item?.answer_correct==4?<Icon name="check-square-o" size={30} color="green" />:<IconSquare name="square" size={30} color="black" />
            }
      </TouchableOpacity>
      <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }} />
    </Card.Content>
  </Card>
  );
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
      />
    );
  };
useEffect(()=>{
    const asynFetchData = async ()=>{
        var data = new FormData();
        route.params?.countryIndex == 'li'?setCountryPass("https://paldrive.com/il/files"):setCountryPass("https://paldrive.com/ps/files");
        data.append("testid", route.params?.test_pro_id);
        setIsLoadingVisible(true)
        await Axios({
            method: "post",
            url: route.params?.countryIndex == "ps"?'http://paldrive.com/ps/getTest_api.php':'http://paldrive.com/il/getTest_api.php',
            data,
            validateStatus: (status) => {
                return true;
            },
            }).then(res=>{
                setTestLogInfo(res.data.data)
                setIsLoadingVisible(false)
            }
        );
    }
    asynFetchData();
    }, [])
  return (
    <View style={Styles.container}>
       <Loader title="Loading" 
        size="large"
        loading={isLoadingVisible} color="#ff66be" 
        opacity='0.5'/>
      <SafeAreaView style={Styles.container}>
        <Header
            centerComponent={{ text: "تاريخ الاختبار", style: { color: 'white', fontWeight:'bold', marginTop:3, fontSize:18, alignItems:'flex-start',flexDirection:'column' } }}
            containerStyle={Styles.header}
        />
          <FlatList
            data={testLogInfo}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
          />
      </SafeAreaView>
  </View>
  );
}
const Styles = StyleSheet.create({
  correctAnswer: {
    color: "green",
  },
  inCorrectAnswer: {
    color: "red"
  },
  resultContainer: {
    flexDirection: "row", 
    justifyContent: "flex-end", 
    alignItems: "center",
    height: 60,
  },
  title: {
    fontSize: 25,
    textAlign: 'right'
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
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: 'lightgrey',
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});
