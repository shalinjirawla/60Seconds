import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { Video } from 'expo-av';
import { connect } from 'react-redux'
import moment from 'moment'

import Layout from "../components/Layout";
import { getGalleriesAPI, selectedGallery } from '../store/actions/gallery'

const window = Dimensions.get('window');
const ratio = window.width / 421;

const Gallery = (props) => {

    const [playVideo, setVideoShouldPlay] = useState([]);

    useEffect(() => {
        props.getGalleriesAPI(1, 10)
    }, [])

    const playVideoAction = (index) => {
        let videos = playVideo;
        let videoIndex = playVideo.indexOf(index);
        if (videoIndex > -1) {
            videos = [
                ...playVideo.slice(0, videoIndex),
                ...playVideo.slice(videoIndex + 1)
            ]
        } else {
            videos = [...playVideo, index]

        }
        setVideoShouldPlay(videos)
    }

    const renderGalleryItem = (item, index) => {
        // console.log('item.videoRehearsalUrl ', item.videoRehearsalUrl)
        const sasToken = "?sv=2019-10-10&ss=bfqt&srt=sco&sp=rwdlacup&se=2020-12-31T11:23:04Z&st=2020-04-30T03:23:04Z&spr=https&sig=fns%2BID0eX8X0F75e7ATIzO%2FmfUlwmIFbHLpKsla6G7s%3D";
        return (
            <TouchableOpacity
                key={item.id + ""}
                style={{
                    width: Dimensions.get('window').width / 2 - 20,
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    marginBottom: 10,
                    flexDirection: 'column',
                    marginLeft: item.index % 2 === 0 ? 5 : 10,
                    marginRight: item.index % 2 === 0 ? 10 : 5,
                    marginTop: 5,
                    marginBottom: 5,
                }}
                onLayout={(event) => {
                }}
                onPress={() => {
                    props.selectedGallery(item.taskAssignmentId);
                    props.navigation.navigate('ViewDeliveryPitch', { taskAssignmentId: item.taskAssignmentId });
                }}
            >

                <Video
                    source={{ uri: `${item.videoRehearsalUrl}${sasToken}` }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={playVideo.indexOf(index) > -1}
                    style={{ width: '100%', height: 170, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                >

                </Video>

                <View style={{ position: 'absolute', zIndex: 10, width: '100%', height: 170 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', flex: 1 }} onPress={() => playVideoAction(index)}>
                        {playVideo.indexOf(index) > -1 ?
                            <Image
                                style={{ width: 50 * ratio, height: 50 * ratio, resizeMode: 'contain', alignSelf: 'center', }}
                                source={require('../../assets/icon-pause.png')}
                            />
                            :
                            <Image
                                style={{ width: 57 * ratio, height: 57 * ratio, resizeMode: 'contain', alignSelf: 'center', }}
                                source={require('../../assets/icon-play.png')}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <View style={{
                    margin: 20
                }}>

                    <Text
                        style={{
                            color: '#668196',
                            lineHeight: 28,
                            fontSize: 12
                        }}>
                        {moment(item.featuredOn).format("Do MM yyyy")}</Text>

                    <Text
                        style={{
                            color: '#1469AF',
                            lineHeight: 26,
                            textDecorationLine: 'underline',
                            fontSize: 17
                        }}>
                        {item.taskTitle}</Text>

                </View>

                <View style={{ flex: 1, flexDirection: 'row', height: 25, marginBottom: 20 }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            flex: 1,
                            flexDirection: 'row',
                        }}
                        onPress={() => { }}>
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain',
                                alignSelf: 'center'
                            }}
                            source={require('../../assets/icon-like.png')}
                        />
                        <Text style={{
                            height: 15,
                            color: '#536278',
                            fontSize: 12,
                            alignSelf: 'center',
                            marginLeft: 5
                        }}>{item.likesCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            flex: 1,
                            flexDirection: 'row',
                        }}
                        onPress={() => { }}>
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain',
                                alignSelf: 'center'
                            }}
                            source={require('../../assets/icon-reply.png')}
                        />
                        <Text style={{
                            height: 15,
                            color: '#536278',
                            fontSize: 12,
                            alignSelf: 'center',
                            marginLeft: 5
                        }}>{item.share}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            flex: 1,
                            flexDirection: 'row',
                        }}
                        onPress={() => { }}>
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain',
                                alignSelf: 'center'
                            }}
                            source={require('../../assets/icon-message.png')}
                        />
                        <Text style={{
                            height: 15,
                            color: '#536278',
                            fontSize: 12,
                            alignSelf: 'center',
                            marginLeft: 5
                        }}>{item.commentsCount}</Text>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        );
    }

    return (
        <Layout title='Gallery' notificationCount={props.galleries.length} {...props}>
            <ScrollView contentContainerStyle={{ marginTop: 15 }} showsVerticalScrollIndicator={false}>
                {props.loading && <ActivityIndicator size="large" color="#40A5FF" style={{ marginTop: 10 * ratio }} />}
                <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', marginBottom: 45 }}>
                    {props.galleries.map((item, index) => {
                        return renderGalleryItem(item, index);
                    })}
                </View>
            </ScrollView>
        </Layout >
    );
}

Gallery.navigationOptions = () => {
    return {
        title: 'Gallery',
        headerRight: null
    };
};

const mapStateToProps = (state) => ({
    galleries: state.gallery.galleries,
    loading: state.gallery.getGalleryLoading,
    error: state.gallery.getGalleryError
})

export default connect(mapStateToProps, { getGalleriesAPI, selectedGallery })(Gallery);