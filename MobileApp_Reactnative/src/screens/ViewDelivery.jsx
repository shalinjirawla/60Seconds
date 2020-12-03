import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Alert, Dimensions, StyleSheet, ImageBackground, Modal } from 'react-native';
import { Slider } from 'react-native';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import SegmentedControlTabs from "react-native-segmented-control-tabs";
import RehersalSettings from "../components/RehersalSettings";
import { Buffer } from 'buffer';
import axios from 'axios';
import FullScreenLoader from '../components/FullScreenLoader';
import { connect } from 'react-redux'
import { postVideoRehearsalAPI } from '../store/actions/task';
import { NavigationActions } from "react-navigation";

const window = Dimensions.get('window');
const ratio = window.width / 421;
const DATA = {
    title: 'Your Rehearsed Video #3',
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
};

const ViewDelivery = ({ postVideoRehearsalAPI, navigation, task, videoSubmitResponse }) => {

    const [playVideo, setVideoShouldPlay] = useState(false);
    const [startTime, setStartTime] = useState("0:00");
    const [endTime, setEndTime] = useState("0:00");
    const [currentPosition, setCurrentPosition] = useState(0);
    const [maximumPosition, setMaximumPosition] = useState(1000);
    const [videoProps, setVideoProps] = useState({});
    const [isSliderMoving, setSliderMovememnt] = useState(false);
    const [playerInitialized, setInitializePlayer] = useState(false);
    const [totalDurationMillis, setPlayableDurationMillis] = useState(0);
    const [videoRate, setVideoRate] = useState(1.0);
    const [isModalVisible, setModalVisibility] = useState(false);
    const [isSettingsVisible, setSettingsVisibility] = useState(false);
    const [isFetching, shouldFetch] = useState(false);
    const [recordData, setRecordData] = useState('');
    const [isReplay, setIsReplay] = useState(false);

    useState(() => {
        if (isSliderMoving === true) {
            setVideoShouldPlay(false);
        }

    }, [isSliderMoving]);

    const handleSelectedIndex = index => {
        if (index === 0) {
            // keep recording
            _keepRecording();
        } else if (index === 1) {
            // submit recording
            _submitVideo();
        } else {
            // delete recording
            _deleteRecording();
        }
    };

    useEffect(() => {

        try {
            const { recordedUri, isReplay } = navigation.getParam("record");
            console.log("URI of recorded video = ", recordedUri)
            console.log("isReplay of recorded video = ", isReplay)
            setRecordData(recordedUri)
            setIsReplay(isReplay);
            // const { title, audience, situation, keywords, toEdit, scenario_id } = navigation.getParam('scenarioData');
        } catch (err) {
            console.log("Error geting url in viewDelivery = ", err);
        }
    }, [])

    useEffect(() => {
        if (videoSubmitResponse)
            redirectToHome()
    }, [videoSubmitResponse]);

    const _keepRecording = async () => {
        console.log("Keep Recording = ", endTime)

        try {
            if (isReplay) {
                Alert.alert("Saved", "Your recording has been stored.", [
                    {
                        text: "OK",
                        onPress: () => navigation.push("VideoRehearse")
                    }
                ]);
            } else {
                try {
                    // shouldFetch(true)
                    const videoId = recordData.split("demo_")[1].trim();
                    console.log("Is replay false videoid = ", videoId)
                    await FileSystem.moveAsync({
                        from: recordData,
                        to: `${FileSystem.documentDirectory}videos/${endTime}_demo_${videoId}`
                    }).then(() => {
                        console.log("file saved")
                        // shouldFetch(false);
                        Alert.alert("Saved", "Your recording has been stored.", [
                            {
                                text: "OK",
                                onPress: () => navigation.navigate("VideoRehearse")
                            }
                        ]);
                    })
                } catch (err) {
                    console.log("Error saving new file = ", err)
                }
            }
        } catch (err) {
            // shouldFetch(false)
            console.log("error saving file = ", err)
        }
    }

    /*const _submitVideo = async () => {
        console.log('_submitVideo called');
        try {
            shouldFetch(true)

            // var video = {
            //     uri: "file:///var/mobile/Containers/Data/Application/49E9C9C1-1CAA-41EF-8AFC-0577539B4623/Documents/ExponentExperienceData/%2540dilipthakur87%252F60Seconds/videos/0:04_demo_OWxH6SJje.mov",
            //     type: 'video/quicktime',
            //     name: 'demo_52nlVcvrK.mov',
            // };

            // var data = new FormData();
            // data.append("file", video);
            // var request = new XMLHttpRequest();
            // // request.withCredentials = true;

            // request.onreadystatechange = (e) => {
            // if (request.readyState !== 4) {
            //     shouldFetch(false)
            //     console.log("i am here")
            //     return;
            // }

            // if (request.status === 200) {
            //     console.log('success', request.responseText);
            //     // shouldFetch(false);
            // } else {
            //     console.warn('error = ',e);
            //     // shouldFetch(false)
            // }
            // };

            // request.open("POST", "https://thedlvrco-fileupload.azurewebsites.net/api/videocontainer?code=2srhX4IYBBsSJVMB3Smp7mpKrqdF52vv42/ShhlVFRRqasGq72utCw==");
            // request.setRequestHeader("Cookie", "ARRAffinity=45042edabf47d408b76e8c0b778fe632ccea2a55853ac46a7539bd40aff41d8c");
            // request.setRequestHeader("content-type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW")

            // request.send(data);

            var video = {
                uri: "file:///var/mobile/Containers/Data/Application/49E9C9C1-1CAA-41EF-8AFC-0577539B4623/Documents/ExponentExperienceData/%2540dilipthakur87%252F60Seconds/videos/0:04_demo_OWxH6SJje.mov",
                type: 'video/quicktime',
                name: 'demo_52nlVcvrK.mov',
            };

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", undefined);
            myHeaders.delete("Content-Type");

            var formdata = new FormData();
            formdata.append("file", video);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow',
            };

            fetch("https://thedlvrco-fileupload.azurewebsites.net/api/videocontainer?code=2srhX4IYBBsSJVMB3Smp7mpKrqdF52vv42/ShhlVFRRqasGq72utCw==", requestOptions)
                .then(response => {
                    response.json();
                    console.log("i am here")
                })
                .then(result => {
                    console.log("result = ", result);
                    shouldFetch(false)
                })
                .catch(error => {
                    console.log('error', error);
                    shouldFetch(false);
                });

            // console.log(recordData)
            // let formdata = new FormData();
            // formdata.append("file", video)

            // axios({
            //     url    : 'https://thedlvrco-fileupload.azurewebsites.net/api/videocontainer?code=2srhX4IYBBsSJVMB3Smp7mpKrqdF52vv42/ShhlVFRRqasGq72utCw==',
            //     method : 'POST',
            //     data   : formdata,
            //     withCredentials: true,
            //     headers: {
            //                 "Cookie": "ARRAffinity=e7ba26d1768bad1c048001a80b3c343a7dcba8bdbb672f7fbb224632090011b6",
            //                 "Content-Type": undefined
            //              }
            //          })
            //          .then((res) => {
            //             shouldFetch(false);
            //             console.log("response :", res);
            //          })
            //         .catch((err) => {
            //             shouldFetch(false);
            //             console.log("error from server :", err);
            //         })




            // shouldFetch(true)
            // const videoName = recordData.split('videos/')[1];
            // // console.log("video name = ", videoName);
            // // console.log('Submit called for = ',recordData);
            // const sasToken = "sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2020-04-30T11:45:42Z&st=2020-04-24T03:45:42Z&spr=https&sig=G46Cno9MxQMQF2G10Ud%2BZlds0FexARWs8%2BIC9FRapVM%3D";
            // const sasURi = `https://60secondsblobdev.blob.core.windows.net/videocontainer/${videoName}?${sasToken}`;

            // var date = new Date();
            // var currentDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

            // // const fileUri = 'file:///var/mobile/Containers/Data/Application/49E9C9C1-1CAA-41EF-8AFC-0577539B4623/Documents/ExponentExperienceData/%2540dilipthakur87%252F60Seconds/videos/0:04_demo_OWxH6SJje.mov';

            // const options = {
            //     encoding: FileSystem.EncodingType.Base64
            // };
            // console.log('Retrieving file in base64');
            // const fileBase64 = await FileSystem.readAsStringAsync(recordData, options);
            // console.log('Converting base64 to buffer');
            // const buffer = Buffer.from(fileBase64, 'base64');

            // console.log('Uploading file...');
            // await axios.put(sasURi, buffer, {
            //     headers: {
            //         "Access-Control-Allow-Origin": "*",
            //         "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            //         "Access-Control-Allow-Headers": "Origin, Content-Type, x-ms-*",
            //         'x-ms-blob-content-type': 'video/quicktime',
            //         "x-ms-date": currentDate,
            //         "x-ms-version": '2017-11-09',
            //         "x-ms-blob-type": "BlockBlob",
            //     }
            // })
            //     .then(response => { 
            //         // console.log("Response ", response);
            //         shouldFetch(false);
            //      })
            //     .catch(error => { 
            //         console.log(error); 
            //         console.log('error here!! = ', error);
            //         shouldFetch(false);
            //     });

        } catch (err) {
            console.log("_submitVideo error => ", err)
            shouldFetch(false);
        }
    }*/

    const _submitVideo = async () => {

        // shouldFetch(true);
        try {

            const videoId = recordData.split("demo_")[1].trim();
            const fileUri = recordData;
            const fileName = 'demo_' + videoId.replace(/\.[^/.]+$/, "");

            const sasToken = "?sv=2019-10-10&ss=bfqt&srt=sco&sp=rwdlacup&se=2020-12-31T11:23:04Z&st=2020-04-30T03:23:04Z&spr=https&sig=fns%2BID0eX8X0F75e7ATIzO%2FmfUlwmIFbHLpKsla6G7s%3D";
            const sasURi = `https://60secondsblobdev.blob.core.windows.net/videocontainer/${fileName}${sasToken}`;

            var date = new Date();
            var currentDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

            // hardcoded video file
            // const fileUri = 'file:///var/mobile/Containers/Data/Application/91B32D7B-AC02-4B3F-AC74-0DB8F3DBDFB4/Documents/ExponentExperienceData/%2540pavan168%252F60Seconds/videos/demo_WVUPrT28p.mov';

            const options = {
                encoding: FileSystem.EncodingType.Base64
            };
            console.log('Retrieving file in base64');
            const fileBase64 = await FileSystem.readAsStringAsync(fileUri, options);
            console.log('Converting base64 to buffer');
            const buffer = Buffer.from(fileBase64, 'base64');

            console.log('Uploading file...');
            const response = await axios.put(sasURi, buffer, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, x-ms-*",
                    'x-ms-blob-content-type': 'video/quicktime',
                    "x-ms-date": currentDate,
                    "x-ms-version": '2017-11-09',
                    "x-ms-blob-type": "BlockBlob",
                }
            })
                .then(response => { return response.status; })
                .catch(error => { return error.message; });

            // update API with api url
            if (response === 201) {
                let request = { id: 0, taskAssignmentId: task.taskAssignmentId, videoUrl: `https://60secondsblobdev.blob.core.windows.net/videocontainer/${fileName}` };
                postVideoRehearsalAPI(request, () => shouldFetch(false));
            }
            else
                shouldFetch(false), setModalVisibility(false), Alert.alert(response);


        } catch (err) {
            console.log("_submitVideo error => ", err.message)
            shouldFetch(false), setModalVisibility(false), Alert.alert(err.message);
        }
    }

    function redirectToHome() {
        console.log('redirectToHome called');
        setModalVisibility(true);
        // setInterval(() => {
        // console.log('redirectToHome INSIDE');
        // setModalVisibility(false);
        // navigation.navigate("Home", { refetch: true });

        // },
        // 3000);
        // setTimeout(someMethod,
        //     2000
        // )
        sleep(2000).then(() => navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' })));


    }

    // someMethod = () => navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }));

    const _deleteRecording = async () => {
        console.log("to delete = ", recordData)

        try {
            // shouldFetch(true);
            await FileSystem.deleteAsync(recordData).then((res) => {
                // shouldFetch(false);
                console.log("file deleted = ", res)
                Alert.alert("Deleted", "Your recording has been deleted.", [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("VideoRehearse")
                    }
                ]);
            }).catch((err) => {
                console.log("Error deleting = ", err)
            })

        } catch (error) {
            // shouldFetch(false);
            console.log(`Error Deleting the File. Error message : ${error}`);
        }

    }

    const onPlaybackStatusUpdate = data => {
        const { playableDurationMillis, durationMillis, positionMillis, didJustFinish, isLooping, isPlaying, isLoaded } = data;

        let startTimeMinutes = Math.floor(positionMillis / 1000 / 60);
        let startTimeSeconds = ((positionMillis % 60000) / 1000).toFixed(0);

        let endTimeMinutes = Math.floor(playableDurationMillis / 1000 / 60);
        let endTimeSeconds = ((playableDurationMillis - positionMillis % 60000) / 1000).toFixed(0);

        // update stats while playing
        if (isPlaying) {
            setStartTime(`${startTimeMinutes}:${startTimeSeconds < 10 ? '0' + startTimeSeconds : startTimeSeconds}`);
            playableDurationMillis !== undefined && setEndTime(`${endTimeMinutes}:${endTimeSeconds < 10 ? '0' + endTimeSeconds : endTimeSeconds}`);
            setCurrentPosition(positionMillis);
            setMaximumPosition(playableDurationMillis);
        }
        // stop video when finished
        if (didJustFinish && !isLooping) {
            setVideoShouldPlay(false);
        }
        // update player soon as the video is loaded
        if (isLoaded && !playerInitialized) {
            setInitializePlayer(true);
            setPlayableDurationMillis(durationMillis);
            let endTimeMinutes = Math.floor(durationMillis / 1000 / 60);
            let endTimeSeconds = ((durationMillis % 60000) / 1000).toFixed(0);
            setEndTime(`${endTimeMinutes}:${endTimeSeconds < 10 ? '0' + endTimeSeconds : endTimeSeconds}`);
        }
    }

    const onSlidingComplete = (time) => {
        setSliderMovememnt(false)

        let startTimeMinutes = Math.floor(time / 1000 / 60);
        let startTimeSeconds = ((time % 60000) / 1000).toFixed(0);

        let endTimeMinutes = Math.floor(totalDurationMillis / 1000 / 60);
        let endTimeSeconds = ((totalDurationMillis - time % 60000) / 1000).toFixed(0);

        setStartTime(`${startTimeMinutes}:${startTimeSeconds < 10 ? '0' + startTimeSeconds : startTimeSeconds}`);
        setEndTime(`${endTimeMinutes}:${endTimeSeconds < 10 ? '0' + endTimeSeconds : endTimeSeconds}`);
    }

    return (
        <>
            <View style={styles.container} >
                <ImageBackground source={require('../../assets/header_bar.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain', top: 0, justifyContent: 'center', }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 44 * window.width / 421
                    }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.navigate("VideoRehearse")} >
                            <Image
                                style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', }}
                                source={require('../../assets/icon-close.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontSize: 20 * ratio }}>{DATA.title}</Text>
                        <TouchableOpacity style={{}} onPress={() => setSettingsVisibility(true)}>
                            <Image
                                style={{ width: 25 * ratio, height: 25 * ratio, resizeMode: 'contain' }}
                                source={require('../../assets/icon-settings.png')}
                            />
                        </TouchableOpacity>

                    </View>
                    <Video
                        source={{ uri: recordData }}
                        rate={videoRate}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay={playVideo}
                        {...videoProps}
                        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                        style={{
                            position: 'absolute',
                            top: 89 * window.width / 416,
                            bottom: window.height - (90 * window.width / 416) - (126 * window.width / 421),
                            width: '100%',
                            height: window.height - 126
                        }}
                    >
                        <SegmentedControlTabs
                            values={[
                                <View>
                                    <Image
                                        style={{ width: 18 * ratio, height: 18 * ratio, resizeMode: 'contain', alignSelf: 'center', }}
                                        source={require('../../assets/tick_icon.png')}
                                    />
                                    <Text style={{ color: '#fff', fontSize: 12 * ratio, marginTop: 5 }}>Keep</Text>
                                </View>,
                                <View>
                                    <Image
                                        style={{ width: 18 * ratio, height: 18 * ratio, resizeMode: 'contain', alignSelf: 'center', }}
                                        source={require('../../assets/submit_icon.png')}
                                    />
                                    <Text style={{ color: '#fff', fontSize: 12 * ratio, marginTop: 5 }}>Submit</Text>
                                </View>,
                                <View>
                                    <Image
                                        style={{ width: 18 * ratio, height: 18 * ratio, resizeMode: 'contain', alignSelf: 'center', }}
                                        source={require('../../assets/delete_icon.png')}
                                    />
                                    <Text style={{ color: '#fff', fontSize: 12 * ratio, marginTop: 5 }}>Delete</Text>
                                </View>
                            ]}
                            handleOnChangeIndex={handleSelectedIndex}
                            activeIndex={0}
                            tabsContainerStyle={{
                                width: '80%',
                                height: 49 * window.width / 421,
                                backgroundColor: 'rgba(0,18,37,0.6)',
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20,
                                borderTopRightRadius: 20,
                                borderBottomRightRadius: 20,
                                alignSelf: 'center',
                                position: 'absolute',
                                bottom: 100 * ratio,
                                zIndex: 10
                            }}
                            lastTabStyle={{
                                borderTopRightRadius: 20,
                                borderBottomRightRadius: 20,

                            }}
                        />

                    </Video>
                </ImageBackground>
                <View style={{ height: 126 * window.width / 421, width: '100%', backgroundColor: "#1A3C5D", position: 'absolute', bottom: 0, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', }} onPress={() => setVideoRate(videoRate >= 1.5 ? (videoRate - .5) : videoRate)}>
                            <Image
                                style={{ width: 20, height: 20, resizeMode: 'contain', alignSelf: 'center' }}
                                source={require('../../assets/icon-rewind.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ zIndex: 10, justifyContent: 'center', alignSelf: 'center', }} onPress={() => !playVideo ? setVideoShouldPlay(true) : setVideoShouldPlay(false)}>
                            {playVideo ?
                                <Image
                                    style={{ width: 20, height: 20, resizeMode: 'contain', alignSelf: 'center', }}
                                    source={require('../../assets/icon-pause.png')}
                                />
                                :
                                <Image
                                    style={{ width: 20, height: 20, resizeMode: 'contain', alignSelf: 'center', }}
                                    source={require('../../assets/icon-play-player.png')}
                                />}
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', }} onPress={() => setVideoRate(videoRate < 10 ? (videoRate + .5) : videoRate)}>
                            <Image
                                style={{ width: 20, height: 20, resizeMode: 'contain', alignSelf: 'center', }}
                                source={require('../../assets/icon-forward.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 30, marginRight: 30 }}>
                        <Text style={{ color: '#7E8890', fontSize: 13 * ratio, marginTop: 5 }}>{startTime}</Text>
                        <Slider
                            maximumValue={maximumPosition}
                            onSlidingComplete={onSlidingComplete}
                            onTouchStart={() => {
                                setVideoShouldPlay(false);
                                setSliderMovememnt(true);
                            }}
                            value={currentPosition}
                            minimumTrackTintColor={'#FF5050'}
                            maximumTrackTintColor={'#7E8890'}
                            thumbStyle={styles.thumb}
                            trackStyle={styles.track}
                            style={{ width: '60%', borderRadius: 50 }}
                            thumbTintColor={'#FF4E4A'}
                            onValueChange={(time) => {
                                setVideoProps({ positionMillis: time });
                            }}
                            trackStyle={{ height: 50 }}
                        />
                        <Text style={{ color: '#7E8890', fontSize: 13 * ratio, marginTop: 5 }}>{endTime}</Text>
                    </View>
                </View>
            </View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 22
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: "rgba(20,94,153,0.9)",
                        borderRadius: 20,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        width: 364 * ratio,
                        height: 90 * ratio,
                        justifyContent: 'center'
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ width: 46 * ratio, height: 46 * ratio, resizeMode: 'contain', }}
                                source={require('../../assets/green_tick.png')}
                            />
                            <Text style={{ color: '#fff', fontSize: 14 * ratio, marginLeft: 10 }}>Video Submitted Successfully</Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <RehersalSettings isVisible={isSettingsVisible} onClose={(value) => setSettingsVisibility(value)} />
            <FullScreenLoader isFetching={isFetching} shouldFetch={shouldFetch} />
        </>
    );
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E1EEFE',
    },
    backgroundImage: {
        width: window.width,
        height: 89 * window.width / 414
    },
    track: {
        height: 80,
        borderRadius: 10,
        backgroundColor: 'red'
    },
    thumb: {
        borderRadius: 14,
        backgroundColor: 'red',
    },
});

const mapStateToProps = (state) => ({
    task: state.task.task,
    videoSubmitResponse: state.task.videoSubmitResponse
})

export default connect(mapStateToProps, { postVideoRehearsalAPI })(ViewDelivery);