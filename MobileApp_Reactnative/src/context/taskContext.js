import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import ApiCall from '../api/ApiCall';
import Settings from "../config/Settings";
import { POST, GET } from "../api/Services";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'addScenario':
            return { errorMessage: '', addScenarioResponse: action.payload };

        case 'getScenario':
            return { errorMessage: '', getScenarioData: action.payload };

        case 'getScript':
            return { errorMessage: '', getScriptData: action.payload };

        case 'addScript':
            return { errorMessage: '', addScriptResponse: action.payload };

        case 'updateScenario':
            return { errorMessage: '', updateScenarioStatus: action.payload };

        case 'updateScript':
            return { errorMessage: '', updateScriptResponse: action.payload };

        case 'getCompany':
            return { errorMessage: '', getCompanyResponse: action.payload };

        case 'deliverySettings':
            return { errorMessage: '', deliverySettingsResponse: action.payload };

        case 'add_error':
            return { ...state, errorMessage: action.payload };

        case 'GET_ALLTASKS':
            return { errorMessage: '', tasks: action.payload };

        case 'GET_RECIPIENTS':
            return { errorMessage: '', recipients: action.payload };

        case 'SUBMIT_RECIPIENTS_RESPONSE':
            return { errorMessage: '', submitRecipientsResponse: action.payload };

        case 'GET_SCRIPT_REVIEW':
            return { errorMessage: '', getScriptReviewResponse: action.payload };

        case 'ADD_FEEDBACK':
            return { errorMessage: '', addFeedbackResponse: action.payload };

        default:
            return state;
    }
}

const addScenario = dispatch => async ({ addScenarioFormatted }) => {

    // console.log('taskContext - addScenario = ', addScenarioFormatted)

    try {

        POST(`${Settings.BASE_URL}/scenario/addScenario`, addScenarioFormatted,
            async response => {

                // console.log("add scenario response data = ", response)
                if (response.status == "200") {
                    dispatch({
                        type: 'addScenario',
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: 'add_error',
                        errorMessage: "Scenario were not retrieved successfully.",
                        payload: []
                    })
                }
            });
    } catch (err) {
        // console.log("addScenario API error = ", err)

        dispatch({
            type: 'add_error',
            errorMessage: 'Scenario was not retrieved successfully.',
            payload: []
        })
    }
}

const getScenario = dispatch => async ({ scenario_id }) => {
    console.log('Id to get Scenario = ', scenario_id);

    try {

        POST(`${Settings.BASE_URL}/scenario/getscenario`,
            {
                Id: scenario_id
            },
            async response => {

                // console.log("get scenario state = ",response.data.responseObject)
                if (response.status == "200") {
                    dispatch({
                        type: 'getScenario',
                        payload: response.data.responseObject
                    })
                } else {
                    dispatch({
                        type: 'add_error',
                        errorMessage: "Scenario were not retrieved successfully.",
                        payload: []
                    })
                }
            });
    } catch (err) {
        console.log("getScenario API error = ", err)

        dispatch({
            type: 'add_error',
            errorMessage: 'Scenario was not retrieved successfully.',
            payload: []
        })
    }
}

const updateScenario = dispatch => async ({ editScenarioFormatted }) => {

    // console.log('Task title in taskContext - updateScenario = ', editScenarioFormatted)
    try {
        POST(`${Settings.BASE_URL}/scenario/updatescenario`, editScenarioFormatted
            , async response => {

                // console.log("Update scenario data = ",response.data.statusCode)
                if (response.status == "200") {
                    // console.log("Update scenario state = ", response.data)
                    dispatch({
                        type: 'updateScenario',
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: 'add_error',
                        errorMessage: "Updating Scenario Failed.",
                        payload: []
                    })
                }
            });
    } catch (err) {
        // console.log("updateScenario API error = ", err)

        dispatch({
            type: 'add_error',
            errorMessage: 'Scenario was not updated successfully.',
            payload: []
        })
    }
}

const addScript = dispatch => async ({ addScriptFormatted, taskTitle }) => {

    try {
        await POST(`${Settings.BASE_URL}/script/addscript`, addScriptFormatted, async responseScript => {
            if (responseScript.status == "200") {

                let request = {
                    "TaskTitle": taskTitle,
                    "ScriptId": responseScript.data.responseObject.scriptId,
                    "ScenarioId": addScriptFormatted.ScriptDetails.ScenarioId
                };

                await POST(`${Settings.BASE_URL}/task/addtask`, request, async responseTask => {
                    if (responseTask.status == "200") {
                        dispatch({
                            type: 'addScript',
                            payload: responseScript.data
                        })
                    }
                    else {
                        dispatch({
                            type: 'add_error',
                            errorMessage: "Updating Scenario Failed.",
                            payload: []
                        })
                    }
                });
            } else {
                dispatch({
                    type: 'add_error',
                    errorMessage: "Updating Scenario Failed.",
                    payload: []
                })
            }
        });

    } catch (err) {
        dispatch({
            type: 'add_error',
            errorMessage: 'Scenario was not updated successfully.',
            payload: []
        })
    }
}

const getScript = dispatch => async ({ script_id }) => {
    //console.log('Id to getScript = ', script_id);

    try {

        POST(`${Settings.BASE_URL}/script/getscript`,
            {
                Id: script_id
            },
            async response => {

                // console.log("get script state = ", response.data.responseObject)
                if (response.status == "200") {
                    dispatch({
                        type: 'getScript',
                        payload: response.data.responseObject
                    })
                } else {
                    dispatch({
                        type: 'add_error',
                        errorMessage: "Script was not retrieved successfully.",
                        payload: []
                    })
                }
            });
    } catch (err) {
        console.log("getScript API error = ", err)

        dispatch({
            type: 'add_error',
            errorMessage: 'Script was not retrieved successfully.',
            payload: []
        })
    }
}

const updateScript = dispatch => async ({ editScriptFormatted }) => {
    //console.log("Update script in taskContext data = ", editScriptFormatted)

    try {
        POST(`${Settings.BASE_URL}/script/updatescript`, editScriptFormatted
            , async response => {
                //console.log("Update Script response statuscode = ", response.data.statusCode)
                if (response.status == "200") {
                    //console.log("Update script response state = ", response.data)
                    dispatch({
                        type: 'updateScript',
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: 'add_error',
                        errorMessage: "Updating Script Failed.",
                        payload: []
                    })
                }
            });
    } catch (err) {
        console.log("updateScript API error = ", err)

        dispatch({
            type: 'add_error',
            errorMessage: 'Script was not updated successfully.',
            payload: []
        })
    }

    // try {
    //     const response = await ApiCall.post('api/script/updatescript', {
    //         "ScriptContents": [
    //             {
    //                 "ContentId": 10,
    //                 "ScriptId": 13,
    //                 "Title": "Start",
    //                 "Content": "so start with a Hi"
    //             },
    //             {
    //                 "ContentId": 10,
    //                 "ScriptId": 13,
    //                 "Title": "Middle",
    //                 "Content": "so start with a Middle"
    //             },
    //             {
    //                 "ContentId": 10,
    //                 "ScriptId": 13,
    //                 "Title": "End",
    //                 "Content": "so Then end  with an end"
    //             }

    //         ],
    //         "ScriptDetails": {
    //             "ScenarioId": 1,
    //             "Title": "some script",
    //             "State": 1,
    //             "StringText": "this is test Script",
    //             "CreatedBy": "Nitesh",
    //             "CreatedOn": "2014-05-06T22:24:55Z",
    //             "ScriptId": 13
    //         }
    //     }, {
    //         headers: { 'Content-Type': 'application/json' }
    //     });
    //     console.log("Response while updating script = ", response.data);

    //     dispatch({
    //         type: 'updateScript',
    //         payload: response.data.responseObject
    //     })

    // } catch (err) {
    //     dispatch({
    //         type: 'add_error',
    //         payload: `Something went wrong with updateScript. ${err}`
    //     })
    // }
}

const getCompany = dispatch => async ({ company_id }) => {
    try {
        const response = await ApiCall.psot('api/company/getcompany', {
            "CompanyId": company_id
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        dispatch({
            type: 'getCompany',
            payload: response.data.responseObject
        })

    } catch (error) {
        dispatch({
            type: 'add_error',
            payload: `Something went wrong with getCompany to get scriptTitles. ${error}`
        })
    }
}

const getAllTasks = dispatch => async () => {

    try {

        POST(`${Settings.BASE_URL}/task/getalltasks`,
            {
                Id: 1
            },
            async response => {

                if (response.status == "200") {
                    dispatch({
                        type: 'GET_ALLTASKS',
                        payload: response.data.objectList
                    })
                } else {
                    dispatch({
                        type: 'GET_ALLTASKS',
                        errorMessage: "Tasks were not retrieved successfully.",
                        payload: []
                    })
                }
            });
    } catch (err) {
        dispatch({
            type: 'GET_ALLTASKS',
            errorMessage: 'Tasks were not retrieved successfully.',
            payload: []
        })
    }
}

const getRecipients = dispatch => async () => {

    try {

        const user = await AsyncStorage.getItem('user');
        const { sub, email } = JSON.parse(user);

        POST(`${Settings.BASE_URL}/user/getrecipients`,
            {
                UserId: sub,
                UserEmail: email
            },
            async response => {

                if (response.status == "200" && response.data.statusCode === 1) {
                    dispatch({
                        type: 'GET_RECIPIENTS',
                        payload: response.data.objectList
                    })
                } else {
                    dispatch({
                        type: 'GET_RECIPIENTS',
                        errorMessage: "Recipients were not retrieved successfully.",
                        payload: []
                    })
                }
            });
    } catch (err) {
        dispatch({
            type: 'GET_RECIPIENTS',
            errorMessage: "Recipients were not retrieved successfully.",
            payload: []
        })
    }
}

const submitRecipients = dispatch => async (recipients) => {

    try {
        POST(`${Settings.BASE_URL}/user/submitRecipients`,
            {
                ListEmailNotificationDetails: recipients
            },
            async response => {
                if (response.status == "200" && response.data.statusCode === 1) {
                    dispatch({
                        type: 'SUBMIT_RECIPIENTS_RESPONSE',
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: 'SUBMIT_RECIPIENTS_RESPONSE',
                        errorMessage: response.data.message,
                        payload: response.data
                    })
                }
            });
    } catch (err) {
        dispatch({
            type: 'SUBMIT_RECIPIENTS_RESPONSE',
            errorMessage: "Recipients were not submitted successfully.",
            payload: null
        })
    }
}

const updateDeliverySettings = dispatch => async (deliverySettings) => {
    dispatch({
        type: 'deliverySettings',
        payload: deliverySettings
    })
}

const getScriptReview = dispatch => async ({ scriptId }) => {
    try {

        GET(`${Settings.BASE_URL}/script/getscriptReview/${scriptId}`,
            async response => {
                if (response.status == "200") {
                    dispatch({
                        type: 'GET_SCRIPT_REVIEW',
                        payload: response.data.responseObject
                    });
                } else {
                    dispatch({
                        type: 'GET_SCRIPT_REVIEW',
                        errorMessage: "Could not download script to review",
                        payload: null
                    });
                }
            });
    } catch (err) {
        dispatch({
            type: 'GET_SCRIPT_REVIEW',
            errorMessage: err.message,
            payload: null
        });
    }
}

const addFeedback = dispatch => async (request) => {

    try {
        POST(`${Settings.BASE_URL}/activity/addfeedback`,
            request,
            async response => {
                if (response.status == "200" && response.data.statusCode === 1) {
                    dispatch({
                        type: 'ADD_FEEDBACK',
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: 'ADD_FEEDBACK',
                        errorMessage: response.data.message,
                        payload: null
                    })
                }
            });
    } catch (err) {
        dispatch({
            type: 'ADD_FEEDBACK',
            errorMessage: "Feedbacks were not received.",
            payload: null
        })
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { addScenario, getScenario, getScript, addScript, updateScenario, updateScript, getAllTasks, getRecipients, submitRecipients, updateDeliverySettings, getScriptReview, addFeedback },
    {
        addScenarioResponse: null, errorMessage: '', getScenarioData: null, getScriptData: null, addScriptResponse: null, updateScenarioStatus: null, updateScriptResponse: null, getCompanyResponse: null, tasks: null, recipients: null, submitRecipientsResponse: null,
        deliverySettingsResponse: {
            font: 24,
            theme: 'blue',
            background: 'plain',
            speed: 10.00,
            autocueStatus: true
        },
        getScriptReviewResponse: null,
        addFeedbackResponse: null
    }
)