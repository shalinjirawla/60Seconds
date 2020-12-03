import React, { useState, useEffect } from 'react';
import {
  View, KeyboardAvoidingView, Dimensions
} from 'react-native';
import Header from '../components/NewTask/Header';
import FullScreenLoader from '../components/FullScreenLoader';
import Scenario from './Task/Scenario';
import Script from './Task/Script';
import TaskReview from './Task/TaskReview';
import { connect } from 'react-redux'
import { getTaskAssignmentById } from '../store/actions/task'

// const window = Dimensions.get('window');
// const ratio = window.width / 421;
// const KEYBOARD_VERTICAL_OFFSET = 200 * ratio;

const Task = ({ navigation, getTaskAssignmentById, task, loading, error, taskActionIsCreate }) => {

  const [isFetching, shouldFetch] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isNewTask, setIsNewTask] = useState(true);
  const [taskEdited, setTask] = useState(null);
  const [isEdited, setIsEdited] = useState(false)

  useEffect(() => {
    const params = navigation.state.params || null;
    if (params && params.taskDetails)
      getTaskAssignmentById(params.taskDetails.taskId, params.taskDetails.taskAssignmentId);
  }, []);

  useEffect(() => {
    shouldFetch(loading);
  }, [loading])

  useEffect(() => {
    if (task !== null)
      setTask(task), setActiveIndex(2);
  }, [task])

  useEffect(() => {
    const params = navigation.state.params || null;

    if (params && params.activeIndex) {
      setActiveIndex(params.activeIndex);
      setIsNewTask(false);
    } else setActiveIndex(0), setIsNewTask(true);

  }, [navigation.state])

  useEffect(() => {
    if (!isNewTask && activeIndex === 3) {
      navigation.navigate('Rehearse', {});
    }
    else if (!isNewTask && activeIndex === 4) {
      navigation.navigate('VideoRehearse', {});
    }
  }, [activeIndex]);
  return (
    <View style={{ backgroundColor: '#E1EEFE', flex: 1 }}>
      <Header
        savePressed={() => console.log('pressed')}
        cancelPressed={() => navigation.navigate('Home')}
        currentTab={activeIndex}
        navigation={navigation}
        setActiveIndex={(index) => setActiveIndex(index)}
      />
      {/* <KeyboardAvoidingView style={{ flex: 1 }}
        // keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
        behavior="position"
        enabled> */}


      {activeIndex === 0 && <Scenario navigation={navigation} shouldFetch={shouldFetch} setActiveIndex={(index) => setActiveIndex(index)} />}
      {activeIndex === 1 && <Script
        navigation={navigation}
        shouldFetch={shouldFetch}
        setIsEdited={setIsEdited}
        setActiveIndex={(index) => setActiveIndex(index)} />
      }
      {activeIndex === 2 && <TaskReview
        navigation={navigation}
        shouldFetch={shouldFetch}
        isEdited={isEdited}
        setActiveIndex={(index) => setActiveIndex(index)} task={taskEdited} />
      }
      {/* </KeyboardAvoidingView> */}
      <FullScreenLoader isFetching={isFetching} shouldFetch={shouldFetch} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  task: state.task.task,
  loading: state.task.taskLoading,
  error: state.task.taskError,
  taskActionIsCreate: state.task.taskActionIsCreate
})

// export default Task;
export default connect(mapStateToProps, { getTaskAssignmentById })(Task);