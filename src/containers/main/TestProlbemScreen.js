
import React, { useEffect,useRef,useState } from 'react';
import {View,Text,TextInput,Alert,StyleSheet,ScrollView,Image,StatusBar,Dimensions,Touchable,FlatList,SafeAreaView,useWindowDimensions ,ActivityIndicator} from 'react-native';
import Axios from "axios";
import {TouchableOpacity} from 'react-native-gesture-handler';
import CheckAlert from "react-native-awesome-alert"
import images from '../../res/images';
import colors from '../../res/colors';
import { Divider } from 'react-native-elements';
import ExamScreenNavigator from '../main/ExamScreenNavigator';
import { WebView } from 'react-native-webview';
import HTML from "react-native-render-html";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import IconSquare from 'react-native-vector-icons/Feather';
import Loader from "react-native-modal-loader";
import { Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { RadioButton, Avatar, Button,IconButton, Card, Title, Paragraph,Caption,DividerSurface,DarkTheme,DefaultTheme} from 'react-native-paper';
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'
import MainScreen from './MainScreen';

const RNFS = require('react-native-fs');
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
export default function TestProlbemScreen({navigation, route}) {
    const [questions, setQuestions] = React.useState([])
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true)
    const[countryPass, setCountryPass] = React.useState('')
    const [userAnswer, setUserAnswer] = React.useState(0)
    const [confirmBtn, setConfirmBtn] = React.useState(0)
    const [isChecked, setIsChecked] = React.useState(0)
    const [isLoadingVisible, setIsLoadingVisible]=React.useState(false)
    const [answerChecked, setAnswerChecked] = React.useState(false)
    const [examResult, setExamResult] = React.useState([])
    const [correctAnswerID, setCorrectAnswerID] = React.useState([])
    const initialSeconds = 0;
    const initialMinute = 0;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [correctAnswerCnt, setCorrectAnswerCnt] = useState(0);
    const [iscompleteExamComponent, setIscompleteExamComponent] = React.useState(0)
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const currentmonths = months[new Date().getMonth()]
    const currentDate = new Date().getDate()
    const currentYear = new Date().getFullYear()
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds
    const [endTimes, setEndTimes] = useState('');
    const [startTime, setStartTime] = useState('');  
    const [displayAlert, setDisplayAlert] = useState(false); 
    const [theArray, setTheArray] = React.useState([]);
    const [correctPro, setCorrectPro] = React.useState([]);
    const timetype = hours<=11?"AM":"PM";
    const initialIndex = 0;
    const checkedRef = useRef(null);
    const [userCode, setUserCode] = useState(0);
    

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
    setUserCode(contents)
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });
  }, [])

    const backToMainPage = () => {
      const asynFetchDatas = async ()=>{
        var data = new FormData();
        data.append("test_id", route.params.id);
        data.append("coutry_id", route.params.countryIndex);
        data.append("user_id", userCode);
        data.append("test_problem_title", route.params.testtitle),
        data.append("correctAnswerCnt", correctAnswerCnt);
        data.append("checkedProArr", JSON.stringify(theArray));
        setIsLoading(true)
        await Axios({
            method: "post",
            url: "http://192.168.110.112:7190/paldrive/test_saved_log.php",
            data,
            validateStatus: (status) => {
                return true;
            },
            }).then(res=>{
              console.log("success data", res.data)
            }
        );
    }
    asynFetchDatas();
      navigation.navigate('MainScreen');
    };
    const isDisplayAlert=async (c)=>{
      setDisplayAlert(c)
    }
    const backToExamPage = async () => {
      const asyncFetchDataBack = async ()=>{
        var data = new FormData();
        data.append("test_id", route.params.id);
        data.append("coutry_id", route.params.countryIndex);
        data.append("user_id", userCode);
        data.append("test_problem_title", route.params.testtitle),
        data.append("correctAnswerCnt", correctAnswerCnt);
        data.append("checkedProArr", JSON.stringify(theArray));
        setIsLoading(true)
        await Axios({
            method: "post",
            url: "http://192.168.110.112:7190/paldrive/test_saved_log.php",
            data,
            validateStatus: (status) => {
                return true;
            },
            }).then(res=>{
              console.log("success data", res.data)
            }
        );
    }
    asyncFetchDataBack();
      navigation.goBack();
    };
    const _confirmBtn=(c)=>{
      if(isChecked == 0){
        setDisplayAlert(c)
      }
      else{
        setConfirmBtn(1);
        setCorrectPro([...correctPro, {coreectID:questions[userAnswer]?.answer_correct}]);
        setAnswerChecked(true)
      }
      
    }
    const confirmQuestion = (index) =>{
      if(answerChecked) return false
      if(questions[questionIndex]?.answer_correct == index){
        setUserAnswer(index)
        setIsChecked(index)
      }else{
        setUserAnswer(index)
        setIsChecked(index)
      }
    }
    const DATA = [
      {
        id: 1,
        title: 'Exam problems',
      },
    ];
    
    const nextIssue = () =>{
      setQuestionIndex(questionIndex+1)
      setExamResult([isChecked]);
      setTheArray([
          ...theArray,
          {
            checkedID: isChecked,
            proID: questionIndex,
            correctAnswerId:questions[questionIndex]?.answer_correct
          }
        ]);
      if(questions[questionIndex]?.answer_correct == userAnswer){
        setCorrectAnswerCnt(correctAnswerCnt+1);
        setCorrectAnswerID([
          ...correctAnswerID,
          {
            userAnswer
          }
        ]);
      }
    }
    useEffect(() => {
        const asynFetchData = async ()=>{
            var data = new FormData();
            route.params.countryIndex == 'li'?setCountryPass("https://paldrive.com/il/files"):setCountryPass("https://paldrive.com/ps/files");
            data.append("testid", route.params.id);
            setIsLoadingVisible(true)
            await Axios({
                method: "post",
                url: route.params.countryIndex == "ps"?'http://paldrive.com/ps/getTest_api.php':'http://paldrive.com/il/getTest_api.php',
                data,
                validateStatus: (status) => {
                    return true;
                },
                }).then(res=>{
                    setQuestions(res.data.data)
                    setIsLoadingVisible(false)
                }
            );
        }
        asynFetchData();
        const timerId = new Date().getTime();
        setStartTime(timerId)
   
  }, []);
      useEffect(()=>{
      if(questionIndex)
      if(questionIndex<questions.length){
        setConfirmBtn(0);
        setIsChecked(0);
        setUserAnswer(0);
        setAnswerChecked(false)
      }else{
        setIscompleteExamComponent(1)
        const endTime = new Date().getTime();
        setEndTimes(endTime);
      }
      },[questionIndex])
    const contentWidth = useWindowDimensions().width;
    const component = 
    [
      <TouchableOpacity activeOpacity={1} style={Styles.loginContainer2} onPress={() =>_confirmBtn(true)}>
          <Text style={Styles.loginText}>إجابه</Text>
      </TouchableOpacity>
      ,
      <TouchableOpacity activeOpacity={.8}  style={Styles.confirmContainer2} onPress={() =>nextIssue()}>
          <Text style={Styles.loginText}>السؤال التالي</Text>
      </TouchableOpacity>
    ];
    const Item = ({ title }) => (
    <View style={Styles.container}>
        <View style={{flexDirection:"column", justifyContent: "flex-start", paddingTop: 10}}>
        <SCLAlert
          theme="warning"
          show={displayAlert}
          title="تحذير"
          subtitle="الرجاء اختيار إجابة للسؤال"
          onRequestClose={()=>{}}
        >
          <SCLAlertButton theme="warning"  onPress={() => isDisplayAlert(false)}>تؤكد</SCLAlertButton>
        </SCLAlert>

          <TouchableOpacity activeOpacity={1} onPress={() => confirmQuestion(1)} style={Styles.questionContainer}>
            <Text style={answerChecked?isChecked==1?questions[questionIndex]?.answer_correct==isChecked?Styles.correctAnswer:Styles.inCorrectAnswer:questions[questionIndex]?.answer_correct==1?Styles.correctAnswer:null:null}>{questions[questionIndex]?.question_opt1}</Text>
            <RadioButton
              value={1}
              status={ userAnswer == 1 ? 'checked' : 'unchecked' }
            />
          </TouchableOpacity>
          <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }} />
          <TouchableOpacity ref={checkedRef} activeOpacity={1} onPress={() => confirmQuestion(2)} style={Styles.questionContainer}>
            <Text style={answerChecked?isChecked==2?questions[questionIndex]?.answer_correct==isChecked?Styles.correctAnswer:Styles.inCorrectAnswer:questions[questionIndex]?.answer_correct==2?Styles.correctAnswer:null:null}>{questions[questionIndex]?.question_opt2}</Text>
            <RadioButton
              value={2}
              status={ userAnswer == 2 ? 'checked' : 'unchecked' }
            />
          </TouchableOpacity>
          <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }} />
          <TouchableOpacity activeOpacity={.7} onPress={() => confirmQuestion(3)} style={Styles.questionContainer}>
            <Text style={answerChecked?isChecked==3?questions[questionIndex]?.answer_correct==isChecked?Styles.correctAnswer:Styles.inCorrectAnswer:questions[questionIndex]?.answer_correct==3?Styles.correctAnswer:null:null}>{questions[questionIndex]?.question_opt3}</Text>
            <RadioButton
              value={3}
              status={ userAnswer == 3 ? 'checked' : 'unchecked' }
            />
          </TouchableOpacity>
          <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }} />
          <TouchableOpacity activeOpacity={.7}  onPress={() => confirmQuestion(4)} style={Styles.questionContainer}>
            <Text  style={answerChecked?isChecked==4?questions[questionIndex]?.answer_correct==isChecked?Styles.correctAnswer:Styles.inCorrectAnswer:questions[questionIndex]?.answer_correct==4?Styles.correctAnswer:null:null}>{questions[questionIndex]?.question_opt3}</Text>
            <RadioButton
              value={4}
              status={ userAnswer == 4 ? 'checked' : 'unchecked' }
            />
          </TouchableOpacity>
        
          <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }} />
        </View>
    </View>
    );
    const ItemRst = ({ title }) => (
      <View>
            <Card style={Styles.resultSummery}>
                <Card.Content>
                <Paragraph style={{fontSize:18, color:"white", textAlign:'right'}}>{currentmonths} {currentDate}, {currentYear} {hours}:{min}:{new Date().getSeconds()} {timetype}:التاريخ</Paragraph>
                <Paragraph style={{fontSize:18, color:"white", textAlign:'right'}}>{"الوقت : "+(Math.floor((endTimes-startTime)/1000)-(Math.floor((endTimes-startTime)/(1000*60)))*60)+" دقيقة  "+Math.floor((endTimes-startTime)/(1000*60))+"ثواني"}</Paragraph>
                <Paragraph style={{fontSize:18, color:"white", textAlign:'right'}}>{"التفاصيل:"+" " +"قمت بالاجابة عن"+" "+correctAnswerCnt +" "+ "سؤال صحيح من اصل"+" "+ questions.length+" "+ "سؤال بنسبة " + " "+"("+ Number.parseFloat((correctAnswerCnt/questions.length)*100).toFixed(2) +"%" + ")"}
                </Paragraph>
                <Paragraph style={{fontSize:18, color:"white", textAlign:'right'}}>{"الإجابات الخاطئة:"}
                <Text style={{color:"#cc3300"}}>{questions.length - correctAnswerCnt}</Text></Paragraph>
                </Card.Content>
                <Card.Actions style={{marginTop:20}}>
                </Card.Actions>
            </Card>
            <Card style={Styles.cardContainer}>
                <Card.Title title="" subtitle=""/>
                 {theArray.map(item => (
                    <Card style={{backgroundColor:"white",width:"100%", marginBottom:10, margin: 0, padding: 0, flexDirection: 'row',
                    alignSelf: 'center',
                    marginBottom: 3,
                    marginTop: 3,
                    borderBottomWidth: 3,
                    borderBottomColor: '#4382FF',}}>
                        <HTML 
                        source={{ html: "<div style=\"marginBottom:20; color:'rgb(96, 15, 192)'\">"+questions[item.proID]?.question_text.replace("files", "'"+countryPass).replace("jpg", "jpg'").replace("alt=", "").replace("<img", "<img class='testIssue_img'").trim().replace("<br><br>", "").replace("<br>", "")+"</div><style> div {font-size: 10px!important;width:50px; display:flex;flex-direction:column; text-align:right} img{width:50px}</style>" }} contentWidth={contentWidth} style={{fontSize:88}}
                        tagsStyles={{div: {
                          fontSize: 20
                        }}}
                        />
            <TouchableOpacity activeOpacity={1}  style={Styles.resultContainer}>
            <Text style={item.checkedID==1?questions[item.proID]?.answer_correct==item.checkedID?Styles.correctAnswer:Styles.inCorrectAnswer:questions[item.proID]?.answer_correct==1?Styles.correctAnswer:null}>{questions[item.proID]?.question_opt1}</Text>
            {
              item.checkedID==1?questions[item.proID]?.answer_correct==item.checkedID?<Icon name="check-square-o" size={30} color="green" />:<Icons name="squared-cross" size={30} color="#900" />:questions[item.proID]?.answer_correct==1?<Icon name="check-square-o" size={30} color="green" />:<IconSquare name="square" size={30} color="black" />
            }
            </TouchableOpacity>
            <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }}/>
            <TouchableOpacity activeOpacity={1}  style={Styles.resultContainer}>
            <Text style={item.checkedID==2?questions[item.proID]?.answer_correct==item.checkedID?Styles.correctAnswer:Styles.inCorrectAnswer:questions[item.proID]?.answer_correct==2?Styles.correctAnswer:null}>{questions[item.proID]?.question_opt2}
            </Text>
            {
              item.checkedID==2?questions[item.proID]?.answer_correct==item.checkedID?<Icon name="check-square-o" size={30} color="green" />:<Icons name="squared-cross" size={30} color="#900" />:questions[item.proID]?.answer_correct==2?<Icon name="check-square-o" size={30} color="green" />:<IconSquare name="square" size={30} color="black" />
            }
            </TouchableOpacity>
            <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }}/>
            <TouchableOpacity activeOpacity={1}  style={Styles.resultContainer}>
            <Text style={item.checkedID==3?questions[item.proID]?.answer_correct==item.checkedID?Styles.correctAnswer:Styles.inCorrectAnswer:questions[item.proID]?.answer_correct==3?Styles.correctAnswer:null}>{questions[item.proID]?.question_opt3}
            </Text>
            {
              item.checkedID==3?questions[item.proID]?.answer_correct==item.checkedID?<Icon name="check-square-o" size={30} color="green" />:<Icons name="squared-cross" size={30} color="#900" />:questions[item.proID]?.answer_correct==3?<Icon name="check-square-o" size={30} color="green" />:<IconSquare name="square" size={30} color="black" />
            }
            </TouchableOpacity>
            <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }}/>
            <TouchableOpacity activeOpacity={1}  style={Styles.resultContainer}>
            <Text style={item.checkedID==4?questions[item.proID]?.answer_correct==item.checkedID?Styles.correctAnswer:Styles.inCorrectAnswer:questions[item.proID]?.answer_correct==4?Styles.correctAnswer:null}>{questions[item.proID]?.question_opt4}
            </Text>
            {
              item.checkedID==4?questions[item.proID]?.answer_correct==item.checkedID?<Icon name="check-square-o" size={30} color="green" />:<Icons name="squared-cross" size={30} color="#900" />:questions[item.proID]?.answer_correct==4?<Icon name="check-square-o" size={30} color="green" />:<IconSquare name="square" size={30} color="black" />
            }
            </TouchableOpacity>
            <Divider style={{ backgroundColor: 'black',opacity:0.2, height:1 }}/>
                    </Card>
                          ))}
          </Card>
            </View>
    );
    const renderItem = ({ item }) => (
      <Item title={item.title} />
    );
    const renderRstItem = ({ item }) => (
      <ItemRst title={item.title} />
    );
    const completeExamComponent = [
      <View style={{backgroundColor:"white", width:"100%", height:"100%"}}>
         <Loader title="Loading" 
      size="large"
      loading={isLoadingVisible} color="#ff66be" 
      opacity='0.9'/>
            <Header
              // leftComponent={<TouchableOpacity style={{backgroundColor:'red', marginTop:10, flex:1}} activeOpacity = {0.4} onPress={() =>  {navigation.navigate('MainScreen')}}><Icon name="home" size={24} color="white" /></TouchableOpacity>}
              centerComponent={{ text: route.params.testtitle, style: { color: 'white', fontWeight:'bold',marginRight:10, marginTop:3, fontSize:18, alignItems:'flex-start',flexDirection:'column' } }}
              rightComponent={{ text: (questionIndex+1).toString()+" من  "+questions.length, style: { color: '#3D6DCC', fontWeight:'bold', fontSize:15, alignItems:'flex-end',flexDirection:'column', marginTop:15 }}}
              containerStyle={{
                height:'12%',
                backgroundColor: '#FFC801',
                width:"100%",
                justifyContent: 'flex-end',
                borderBottomWidth:2,
                borderBottomColor: 'lightgrey',
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.6,
                elevation: 3,
              }}
            />
            <HTML 
                source={{ html: "<div style=\"marginTop:20; color:'rgb(200,33,12)'\">"+questions[questionIndex]?.question_text.replace("files", "'"+countryPass).replace("jpg", "jpg'").replace("alt=", "").replace("<img", "<img class='testIssue_img'").trim().replace("<br><br>", "").replace("<br>", "")+"</div><style> div {font-size: 120px!important; display:flex;flex-direction:column; text-align:right} </style>" }} contentWidth={contentWidth} style={{fontSize:88}}
                tagsStyles={{div: {
                  fontSize: 20
                }}}
                />
            <FlatList
            style={{ width:"100%", height:"100%", marginTop:20}}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
              <View>
                {component[confirmBtn]}
              </View>
             
          </View>,
          <View style={{backgroundColor:"white", width:"100%", height:"100%"}}>
           <Header
              barStyle = 'light-content'
              // leftComponent={{ icon: 'home', color: '#fff', marginTop:5 }}
              centerComponent={{ text: route.params.testtitle, style: { color: 'white', fontWeight:'bold', marginTop:3, fontSize:18, alignItems:'flex-start',flexDirection:'column' } }}
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
          <View>
          </View>
          <FlatList
          style={{ width:"100%", height:"100%"}}
          data={DATA}
          renderItem={renderRstItem}
          keyExtractor={item => item.id}
        />
            <View style={Styles.buttonGroup}>
              <Button style={{margin:3, width:"40%"}} icon="home-circle-outline"  mode="contained" onPress={() => backToMainPage()}>الصفحة الرئيسية</Button>
              <Button style={{margin:3, width:"40%",backgroundColor:"#E91E63"}} icon="refresh"  mode="contained" onPress={() => backToExamPage()}>قائمة الامتحانات</Button>
            </View>
        </View>
  ]
    return (
      <View>{completeExamComponent[iscompleteExamComponent]}</View>
  );
}
  
const Styles = StyleSheet.create({
  buttonGroup:{
        flexDirection: 'row',
        backgroundColor:'white',
        justifyContent: 'space-around',
  },
  resultSummery:{
    backgroundColor: "#4382FF",
    borderRadius: 0,
    shadowColor: "blue",
    shadowOpacity: 1.0,
    shadowRadius: 12,
    margin:0,
    shadowOffset: {width: 3, height: 3 },
  },
  cardContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    shadowColor: "blue",
    shadowOpacity: 1.0,
    shadowRadius: 12,
    marginTop:-20,
    shadowOffset: {width: 3, height: 3 },
  },
  correctAnswer: {
    color: "green"
  },
  inCorrectAnswer: {
    color: "red"
  },
  questionContainer: {
    flexDirection: "row", 
    justifyContent: "flex-end", 
    alignItems: "center",
    height: 60,
    marginLeft:10
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
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: 'white',
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  loginContainer2: {
    alignItems: 'center',
    height: 40,
    marginStart:"3%",
    marginTop:10,
    marginBottom:10,
    marginEnd:"3%",
    backgroundColor: "rgb(98, 184, 92)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  confirmContainer2: {
    alignItems: 'center',
    height: 40,
    marginStart:"3%",
    marginEnd:"3%",
    marginTop:10,
    marginBottom:10,
    backgroundColor: "#0095ff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  loginText: {
    color: 'white',
    fontSize:20,
    fontWeight:"bold"
  },
});
