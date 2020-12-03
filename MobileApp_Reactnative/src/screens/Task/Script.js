import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux'
import FullScreenLoader from '../../components/FullScreenLoader';

import { Colors } from '../../constants/Colors';
import { verticalScale } from 'react-native-size-matters';
import { wordCount } from '../../utils';
import { saveScript, getScriptFieldsAPI } from '../../store/actions/task'
import { handlePermission } from '../../utils/handlePermission'
import { TASK_UPDATE } from '../../constants/permissions'
import { SCRIPT_ACTION } from '../../constants/enum'


const window = Dimensions.get('window');
const ratio = window.width / 421;


const Script = ({ navigation, shouldFetch, task, setActiveIndex, scenario, script,
  saveScript, getScriptFieldsAPI, scriptFields, loading, setIsEdited }) => {

  const [fields, setFields] = useState({})
  const [numberOfwords, setNumberOfWords] = useState({})

  useEffect(() => {
    shouldFetch(false)
    getScriptFieldsAPI()
  }, [])

  useEffect(() => {
    let scriptContent = { ...script };
    let count = {};
    if (task) {
      scriptFields.forEach((field, i) => {

        let scriptField = task.script.taskScriptContents.find(i => i.id == field.id)
          ? task.script.taskScriptContents.find(i => i.id == field.id).scriptFieldvalue : ""

        count[field.id] = wordCount(scriptField)
        scriptContent[field.id] = scriptField
      })

    }

    setFields(scriptContent)
    setNumberOfWords(count)
  }, [script, scriptFields, task])

  const onFieldChange = (id, value) => {
    let counts = { ...numberOfwords }
    let newFields = { ...fields }
    newFields[id] = value;
    counts[id] = wordCount(value)
    setFields(newFields)
    setNumberOfWords(counts)
    if (task) {
      setIsEdited(true)
    }
  }

  const onSave = () => {
    saveScript(fields)
    if (task) {
      setActiveIndex(2);
    } else {
      navigation.navigate("SelectRecipient");
    }

  }

  const countTotalWords = () => {
    debugger;
    let total = 0
    Object.keys(numberOfwords).forEach(w => total = total + numberOfwords[w])
    return total;
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={30}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ paddingRight: 16, paddingLeft: 16 }}>

          <FullScreenLoader isFetching={Object.keys(script).length === 0 && loading} />

          {
            scriptFields.map((field, i) => {
              let value = fields[field.id]
              return (<InputText
                key={i}
                showSubText={i == 0}
                audience={i === 0 && scenario.audience}
                situation={i === 0 && scenario.situation}
                noOfwords={i === 0 && countTotalWords()}
                title={`${field.index} - ${field.title}`}
                onChangeText={(value) => onFieldChange(field.id, value)}
                value={value}
                disabled={task && task.lastScriptAction.action === SCRIPT_ACTION.SCRIPT_APPROVED}
              />)
            })
          }
          {
            handlePermission(
              TASK_UPDATE,
              <TouchableOpacity
                onPress={onSave}
                // disabled={openCall === "" && benefits === "" && objection === "" && close === ""}
                style={{
                  height: 45,
                  backgroundColor: '#3e98e0',
                  borderRadius: 5,
                  marginTop: 10,
                  marginBottom: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>Save</Text>
              </TouchableOpacity>
            )
          }

        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  );
};

const mapStateToProps = (state) => ({
  scenario: state.task.scenario,
  script: state.task.script,
  scriptFields: state.task.scriptFields,
  loading: state.task.getScriptFieldsLoading,
  task: state.task.task
})


export default connect(mapStateToProps, { saveScript, getScriptFieldsAPI })(Script);

const InputText = ({
  title,
  onChangeText,
  value,
  situation,
  audience,
  showSubText,
  disabled,
  noOfwords
}) => (
    <View style={{ marginBottom: verticalScale(20) }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <Text style={{ fontSize: 18, color: Colors.textColor, paddingBottom: 5 }}>
          {title}
        </Text>
        {showSubText && (
          <Text style={{ fontSize: 12, color: '#1469af', paddingBottom: 5 }}>
            {noOfwords} Words
          </Text>
        )}
      </View>
      <TextInput
        editable={!disabled}
        multiline
        onChangeText={(text) => onChangeText(text)}
        value={value}
        style={{
          padding: 5,
          fontSize: 18,
          color: '#1b3964',
          backgroundColor: !disabled ? 'white' : '#d4d4d4',
          borderBottomColor: '#9ea7be',
          borderBottomWidth: 2,
          borderRadius: 5,
          minHeight: verticalScale(50),
        }}
      />
      {showSubText && (
        <View
          style={{
            height: verticalScale(150),
            backgroundColor: '#d6dfe9',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            padding: 10,
            justifyContent: 'space-evenly',
          }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', color: '#536278' }}>Audience</Text>
            <Text style={{ color: '#536278' }}>{audience}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', color: '#536278' }}>Situation</Text>
            <Text style={{ color: '#536278' }}>{situation}</Text>
          </View>
        </View>
      )}
    </View>
  );
