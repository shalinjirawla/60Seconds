import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
import moment from "moment";

import MessageModal from '../../components/MessageModal'
import { updateTaskAPI, getFeedbacksAPI } from '../../store/actions/task'

const window = Dimensions.get('window');
const ratio = window.width / 421;

const TaskReview = ({ navigation, shouldFetch, setActiveIndex, task, isEdited, script, scenario, updateTaskAPI, loading,
  getFeedbacksAPI, feedbacks, getFeedbacksLoading }) => {

  const [comment, setComment] = useState('');
  // const [feedbacks, setFeedbacks] = useState([]);
  const { scriptId, taskTitle } = { scriptId: 24, taskTitle: 'test' };//navigation.state.params;
  const [isViewOnly, setView] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (task)
      setView(true);
  }, [task]);
  // const [feedbacks, setFeedbacks] = useState([]);


  useEffect(() => {
    if (task) {
      // console.log(task)
      getFeedbacksAPI(task.taskAssignmentId, task.scenario.id, 1, 10)
    }
  }, [task])

  const onUpdate = () => {
    let scriptContents = [];
    Object.keys(script).forEach(scriptId => scriptContents.push({
      scriptFieldId: Number.parseInt(scriptId),
      scriptFieldvalue: script[scriptId]
    }))

    task.scenario.scenarioTitle = task.scenario.title
    let newTask = {
      taskAssignmentId: task.taskAssignmentId,
      scenario: task.scenario,
      scriptContents: scriptContents,
    }
    updateTaskAPI(task.taskId, newTask, () => {
      setIsModalVisible(true)
      navigation.navigate('Home')
    })

  }


  const getTimeSince = (date) => {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = Math.floor((new Date() - date));

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  return (
    <>

      <ScrollView
        style={{ marginBottom: 22 * ratio, backgroundColor: '#E1EEFE' }}
        keyboardShouldPersistTaps="never"
      >
        <View
          key={0}
          style={{
            width: '100%',
            borderRadius: 12,
            // marginBottom: 10,
            flexDirection: 'column',
            alignSelf: 'center',
            // marginTop: 23 * ratio,
            backgroundColor: '#E1EEFE',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12
          }}
          onLayout={(event) => {
          }} >

          {/** script contents */}
          <View key={1} style={{
            margin: 20
          }}>
            <Text
              style={{
                color: '#1469AF',
                lineHeight: 34,
                fontSize: 20 * ratio,
                fontWeight: 'bold'
              }}>
              {task && task.scenario.title}
            </Text>
            <View style={{ borderTopWidth: 1, borderColor: '#C7DBF3', marginTop: 10 * ratio }} />
            <MessageModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} message="Task updated successfully" />

            {
              isEdited ?
                Object.keys(script).map((field, index) =>
                  <React.Fragment key={`script-${index}`}>
                    <Text

                      style={{
                        color: '#1B3964',
                        lineHeight: 34 * ratio,
                        fontSize: 20 * ratio,
                        marginTop: 12 * ratio
                      }}>
                      {script[field]}
                    </Text>
                    {Object.keys(script).length - 1 !== index && <View style={{ borderTopWidth: 1, borderColor: '#C7DBF3', marginTop: 10 * ratio }} />}
                  </React.Fragment>
                )
                : task && task.script.taskScriptContents && task.script.taskScriptContents.map((content, index) =>
                  <React.Fragment key={`script-${index}`}>
                    <Text

                      style={{
                        color: '#1B3964',
                        lineHeight: 34 * ratio,
                        fontSize: 20 * ratio,
                        marginTop: 12 * ratio
                      }}>
                      {content.scriptFieldvalue}
                    </Text>
                    {task.script.taskScriptContents.length - 1 !== index && <View style={{ borderTopWidth: 1, borderColor: '#C7DBF3', marginTop: 10 * ratio }} />}
                  </React.Fragment>
                )}
          </View>

          { /** Action bar */}
          <View
            key={2}
            style={{
              flexDirection: 'column',
              height: 150 * ratio,
              backgroundColor: '#A1B8CF'
            }}>

            {/** text */}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View
                style={{
                  marginLeft: 25 * ratio, marginTop: 20 * ratio, height: 60 * ratio,
                  flexDirection: 'column'
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    textAlign: 'left'
                  }}>
                  {'Submitted'}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    flex: 1
                  }}>
                  {task && moment(task.script.updatedOn ? task.script.updatedOn : task.script.createdOn).format('MMM DD, YYYY')}
                </Text>
              </View>

              <View
                style={{
                  marginRight: 25 * ratio, marginTop: 20 * ratio, height: 60 * ratio,
                  flexDirection: 'column'
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    textAlign: 'right'
                  }}>
                  {task && task.lastScriptAction.action === "SCRIPT_APPROVED" ? 'Approved' : 'Pending'}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    flex: 1,
                    textAlign: 'right'
                  }}>
                  {task && moment(task.lastScriptAction.createdOn).format('MMM DD, YYYY')}
                </Text>
              </View>
            </View>

            {/** Buttons */}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  height: 56 * ratio,
                  flex: 1,
                  borderRadius: 8,
                  marginLeft: 20 * ratio,
                  marginRight: 20 * ratio
                }}
                onPress={() => setActiveIndex(3)}>
                <Image
                  style={{
                    width: 21 * ratio,
                    height: 21 * ratio,
                    alignSelf: 'center',

                  }}
                  resizeMode="contain"
                  source={require('../../../assets/Audio_Rehearse_active_icon.png')}
                />
                <Text style={{
                  height: 21,
                  color: '#536278',
                  fontSize: 18,
                  alignSelf: 'center',
                  marginLeft: 10,
                  // backgroundColor: 'red',
                  textAlignVertical: 'center',
                  justifyContent: 'center'
                }}>{'Rehearse'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!isEdited}
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  backgroundColor: isEdited ? 'white' : '#d4d4d4',
                  height: 56 * ratio,
                  flex: 1,
                  borderRadius: 8,
                  marginRight: 20 * ratio
                }}
                onPress={onUpdate}>
                {loading ? <ActivityIndicator size="small" color="#40A5FF" /> :
                  <Image
                    style={{
                      width: 21 * ratio,
                      height: 21 * ratio,
                      alignSelf: 'center',

                    }}
                    resizeMode="contain"
                    source={require('../../../assets/icon-submit.png')}
                  />
                }
                <Text style={{
                  height: 20,
                  color: '#536278',
                  fontSize: 18,
                  alignSelf: 'center',
                  marginLeft: 10
                }}>{isEdited ? 'Update' : 'Submit'}
                </Text>
              </TouchableOpacity>

            </View>
          </View>

        </View>

        { /** comment submittion disabled for salesperson */}
        {/* <View
          key={1}
          style={{
            width: 361 * ratio,
            borderRadius: 12,
            marginBottom: 10,
            flexDirection: 'column',
            alignSelf: 'center',
            marginTop: 22 * ratio
          }}
          onLayout={(event) => {
          }} >
          <Text
            style={{
              color: '#536278',
              lineHeight: 28,
              fontSize: 16 * ratio
            }}>
            {'Feedback'}
          </Text>

          <View style={{
            flexDirection: 'row',
            height: 49 * ratio,
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
          }}>
            <TextInput
              value={comment}
              onChangeText={value => setComment(value)}
              style={{
                borderBottomColor: "#9EA7BE",
                borderBottomWidth: 2,
                width: '100%',
                fontSize: 18 * ratio,
                color: '#1B3964'
              }}
              multiline={true}
            >

            </TextInput>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                position: 'absolute',
                right: 20,
                top: 0,
                bottom: 0,
              }}
              onPress={() => onHandleCommentSubmit()}>
              <Image
                style={{
                  width: 20 * ratio,
                  height: 20 * ratio,
                }}
                source={require('../../../assets/icon-submit.png')}
              />
            </TouchableOpacity>
          </View>
        </View > */}

        { /** Comment */}

        {getFeedbacksLoading && <ActivityIndicator size="large" color="#40A5FF" style={{ margin: 20 }} />}

        {
          feedbacks.map((feedback, index) =>
            <View
              key={`feedback-${index}`}
              style={{
                width: 361 * ratio,
                backgroundColor: '#fff',
                borderRadius: 12,
                flexDirection: 'column',
                alignSelf: 'center',
                marginTop: 22 * ratio,
                justifyContent: 'space-between'
              }}>
              <View
                style={{
                  width: 361 * ratio,
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20
                }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                  <Image
                    style={{ width: 34 * ratio, height: 34 * ratio, resizeMode: 'contain' }}
                    source={require('../../../assets/Profile_menu_active.png')}
                  />
                  <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                    <Text style={{ fontSize: 14 * ratio, color: '#1B3964' }}>{feedback.firstName} {feedback.lastName}</Text>
                  </View>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 20
                }}>
                  <Text style={{ fontSize: 14 * ratio, color: '#536278' }}>{`${getTimeSince(new Date(feedback.createdOn))}`}</Text>
                </View>
              </View>
              <Text
                style={{
                  color: '#1B3964',
                  lineHeight: 23,
                  fontSize: 14 * ratio,
                  marginTop: 12 * ratio,
                  margin: 20
                }}>
                {feedback.description}
              </Text>
            </View>
          )}


      </ScrollView>

      {/* <TouchableOpacity
          style={{
            width: 63,
            position: 'absolute',
            bottom: 20,
            right: 20,
            height: 63,
            borderRadius: 100,
          }}
          onPress={() => null}
        >
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={require('../../../assets/Main_Menu_icon-Menu.png')}
          />
        </TouchableOpacity>
      </View>
      <FullScreenLoader isFetching={isFetching} shouldFetch={shouldFetch} /> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  script: state.task.script,
  scenario: state.task.scenario,
  task: state.task.task,
  loading: state.task.updateTaskLoading,
  feedbacks: state.task.feedbacks,
  getFeedbacksLoading: state.task.getFeedbacksLoading
})

export default connect(mapStateToProps, { updateTaskAPI, getFeedbacksAPI })(TaskReview);