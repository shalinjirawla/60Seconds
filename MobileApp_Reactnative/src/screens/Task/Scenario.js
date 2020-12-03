import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux'
import { verticalScale } from 'react-native-size-matters';

import { Colors } from '../../constants/Colors';
import { saveScenario, getScriptFieldsAPI } from '../../store/actions/task'

import AutoTags from 'react-native-tag-autocomplete';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Storage from '../../api/Storage';

const window = Dimensions.get('window');
const ratio = window.width / 421;

const Scenario = ({ navigation, saveScenario, setActiveIndex, shouldFetch, scenario, task, getScriptFieldsAPI }) => {

  const [title, setTitle] = useState(task ? task.scenario.title : scenario.scenarioTitle);
  const [audience, setAudience] = useState(task ? task.scenario.audience : scenario.audience);
  const [situation, setSituation] = useState(task ? task.scenario.situation : scenario.situation);
  const [isViewOnly, setView] = useState(false);

  const [keywords, setKeywords] = useState(task ? task.scenario.scenarioKeywords.map((keyword) => keyword.name).join(' ') : scenario.keywords);
  const [suggestions, setSuggestions] = useState([]);
  const [tagsSelected, setTags] = useState([]);

  loadKeywords = async () => {
    let keywords = await Storage.get("keywords");
    setSuggestions(JSON.parse(keywords));
  }

  useEffect(() => {
    shouldFetch(false);
    getScriptFieldsAPI()
    loadKeywords();
  }, []);

  useEffect(() => {
    if (task)
      setView(true);
  }, [task]);

  const onSave = () => {
    Keyboard.dismiss();
    setActiveIndex(1);
    saveScenario({
      scenarioTitle: title,
      audience: audience,
      situation: situation,
      scenarioKeywords: tagsSelected,
    })
    navigation.navigate("Script");
  }

  const onNext = () => {
    Keyboard.dismiss();
    saveScenario({
      scenarioTitle: title,
      audience: audience,
      situation: situation,
      scenarioKeywords: keywords,
    })
    setActiveIndex(1);
  }


  const handleDelete = index => {
    let tagsSelectedNew = tagsSelected;
    tagsSelectedNew.splice(index, 1);
    setTags([...tagsSelectedNew]);
  }

  const handleAddition = suggestion => {
    if (tagsSelected.find(item => item.name === suggestion.name))
      return;
    setTags([...tagsSelected, suggestion]);
  }

  const onCustomTagCreated = keyword => {

    if (keyword === "")
      return;


    let newKeyword = { id: null, name: keyword };
    setTags([...tagsSelected, newKeyword]);
  }

  const createTagOnSpace = keyword => {
    console.log('createTagOnSpace', keyword);
  }

  const renderTags = (keyword) => {
    const tagsOrientedBelow = true;

    const tagMargins = tagsOrientedBelow
      ? { marginBottom: 5 }
      : { marginTop: 5 };

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', alignItems: "center", paddingTop: 10 }}>
        {tagsSelected.map((t, i) => {
          return (
            <TouchableHighlight
              key={i.toString()}
              style={[tagMargins, {
                backgroundColor: "rgb(244, 244, 244)",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                marginLeft: 5,
                borderRadius: 40,
                padding: 8,
                backgroundColor: '#3e98e0',
              }]}
              onPress={() => handleDelete(i)}
            >
              <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>{t.name}</Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={30}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView
        style={{ backgroundColor: '#e1eefe' }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >

        <View style={{ flex: 1, paddingRight: 16, paddingLeft: 16 }}>
          <InputText
            title="Title"
            editable={!isViewOnly}
            onChangeText={(value) => setTitle(value)}
            value={title}
          />
          <InputText
            title="Audience"
            editable={!isViewOnly}
            onChangeText={(value) => setAudience(value)}
            value={audience}
          />
          <InputText
            title="Situation"
            editable={!isViewOnly}
            onChangeText={(value) => setSituation(value)}
            value={situation}
          />

          {isViewOnly ?
            <InputText
              title="Keywords"
              editable={!isViewOnly}
              // onChangeText={(value) => setKeywords(value)}
              value={keywords}
            />
            :
            <>
              <Text style={{ fontSize: 18, color: Colors.textColor, paddingBottom: 5, height: 30 }}>
                {'Keywords'}
              </Text>
              <AutoTags
                suggestions={suggestions}
                tagsSelected={tagsSelected}
                handleAddition={handleAddition}
                handleDelete={handleDelete}
                onCustomTagCreated={onCustomTagCreated}
                createTagOnSpace={createTagOnSpace}
                placeholder="Keywords"
                tagsOrientedBelow={true}
                renderTags={renderTags}
                inputContainerStyle={{
                  borderRadius: 0,
                  paddingLeft: 5,
                  height: 47,
                  width: '100%',
                  justifyContent: "center",
                  backgroundColor: '#fff',
                }}
                containerStyle={{
                  width: '100%',
                  borderBottomColor: '#9ea7be',
                  borderBottomWidth: 2,
                  borderRadius: 5,
                  height: 50,
                  backgroundColor: "#fff",

                }}
                listStyle={{ paddingLeft: 5, zIndex: 100 }}
                style={{ fontSize: 18, borderWidth: 0, zIndex: 100 }}
                autoCorrect={false}
                renderSuggestion={(item, id) => (
                  <Text key={`id-${id}`} style={{ fontSize: 18, lineHeight: 40 }}>{item.name}</Text>
                )
                }
                autoFocus={false}
              />
            </>
          }

          <TouchableOpacity
            onPress={isViewOnly ? onNext : onSave}
            disabled={title === "" && audience === "" && situation === "" && keywords === ""}
            style={{
              height: 45,
              backgroundColor: '#3e98e0',
              borderRadius: 5,
              marginTop: verticalScale(20),
              marginBottom: verticalScale(20),
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: -1
            }}>
            <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>
              Next
              </Text>
          </TouchableOpacity>

        </View>
      </ScrollView >
    </KeyboardAvoidingView >
  );
};
const mapStateToProps = (state) => ({
  scenario: state.task.scenario,
  task: state.task.task
})

export default connect(mapStateToProps, { saveScenario, getScriptFieldsAPI })(Scenario);

const InputText = ({ title, onChangeText, value, editable }) => (
  <View style={{ marginBottom: verticalScale(20), height: 80 }}>
    <Text style={{ fontSize: 18, color: Colors.textColor, paddingBottom: 5, height: 30 }}>
      {title}
    </Text>
    <TextInput
      editable={editable}
      multiline
      onChangeText={(text) => onChangeText(text)}
      value={value}
      style={{
        padding: 5,
        fontSize: 18,
        color: '#1b3964',
        backgroundColor: editable ? 'white' : '#d4d4d4',
        borderBottomColor: '#9ea7be',
        borderBottomWidth: 2,
        borderRadius: 5,
        // minHeight: verticalScale(40),
        height: 50
      }}
    />
  </View>
);
