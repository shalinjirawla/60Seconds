import React, { useState, useEffect } from "react";
import {
    Text, View, TouchableOpacity, Image, Dimensions, StyleSheet, ImageBackground, ScrollView, Clipboard,
    ActivityIndicator, FlatList, Modal, Alert
} from 'react-native';
import { Video } from 'expo-av';
import moment from 'moment'
import { connect } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons';

import FullScreenLoader from "../components/FullScreenLoader";
import TextInput from "../components/TextInput";
import { getCommentsAPI, addCommentAPI, isLikeAPI, selectedGallery, deleteCommentAPI, fetchUsers, shareAPI } from '../store/actions/gallery'
import { updateLocale } from '../utils';

import ShareUser from './ShareUser'

updateLocale();

const window = Dimensions.get('window');
const ratio = window.width / 421;

const ViewDeliveryPitch = React.forwardRef((props, ref) => {

    const sasToken = "?sv=2019-10-10&ss=bfqt&srt=sco&sp=rwdlacup&se=2020-12-31T11:23:04Z&st=2020-04-30T03:23:04Z&spr=https&sig=fns%2BID0eX8X0F75e7ATIzO%2FmfUlwmIFbHLpKsla6G7s%3D";

    const [playVideo, setVideoShouldPlay] = useState(false);
    const [isVideoLoaded, setVideoLoaded] = useState(false);
    const [showTags, setShowTags] = useState(false)
    const [tagUsers, setTagUsers] = useState([])
    const [showShareModal, setShowShareModal] = useState(false)

    useEffect(() => {
        props.getCommentsAPI(props.task.taskAssignmentId, 1, 10)
        const taskAssignmentId = props.navigation.getParam('taskAssignmentId')
        props.selectedGallery(taskAssignmentId)
    }, [])


    const [comment, setComment] = useState('');
    let myRef = React.useRef()

    const onHandleVideoShouldPlay = () => {
        isVideoLoaded && myRef.presentFullscreenPlayer();
    }

    const onPlaybackStatusUpdate = data => {
        const { isLoaded } = data;
        if (!isVideoLoaded && isLoaded) {
            setVideoLoaded(true);
        }
    }

    const addComment = () => {
        setComment("")
        let commentTags = []
        // tagUsers.forEach(t => commentTags.push({ id: t, type: 'B' }))
        props.addCommentAPI({
            taskAssignmentId: props.task.taskAssignmentId,
            description: comment,
            createdBy: props.profile.id,
            commentTags: tagUsers,
            firstName: props.profile.firstName,
            lastName: props.profile.lastName
        })
    }

    const onCommentChange = (value) => {
        if (comment.length > value.length) {
            let tags = value.split('@')
            tags.forEach((t, index) => {

                if (t.length === 0) {
                    let users = [...tagUsers.slice(0, index - 1), ...tagUsers.slice(index)]
                    setTagUsers(users)
                }
            })
        } else {
            let tags = value.split('@')
            var last = value.substring(value.lastIndexOf("@") + 1, value.length);
            if (last && tags.length > 1 && tags.length - 1 > tagUsers.length) {
                setShowTags(true)
                props.fetchUsers(1, 10, last)
            } else {
                setShowTags(false)
            }
        }
        setComment(value)
    }

    const tagUser = (user) => {
        var rest = comment.substring(0, comment.lastIndexOf("@") + 1);
        let newCommet = `${rest}${user.name}`
        setComment(newCommet)
        setShowTags(false)
        let users = [...tagUsers, user]
        setTagUsers(users)
    }

    const share = (selectedRecipients) => {
        const shareUsers = []
        selectedRecipients.filter(s => s.selected).forEach(user => shareUsers.push(user.id))
        props.shareAPI(props.task.taskAssignmentId, shareUsers, () => setShowShareModal(false))

    }

    const deleteComment = (commentId) => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete this?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => props.deleteCommentAPI(commentId) }
            ],
            { cancelable: false }
        );

    }


    const Comment = ({ comment }) => {
        return (
            <View
                key={comment.id + ""}
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
                            source={require('../../assets/Profile_menu_active.png')}
                        />
                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Text style={{ fontSize: 14 * ratio, color: '#1B3964' }}>{comment.firstName} {comment.lastName}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 20
                    }}>
                        <Text style={{ fontSize: 14 * ratio, color: '#536278' }}>
                            {moment(moment.utc(comment.createdOn).toDate()).fromNow()}
                        </Text>
                    </View>
                </View>
                <View style={{
                    width: 361 * ratio,
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    marginTop: 12 * ratio,
                    position: 'relative'
                }}>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                color: '#1B3964',
                                lineHeight: 23,
                                fontSize: 14 * ratio,
                                margin: 20,
                                marginTop: 12 * ratio,
                                marginRight: 0
                                // flexWrap: 'wrap'
                            }}>
                            {comment.description}
                        </Text>
                    </View>
                    {
                        props.profile && props.profile.id === comment.createdBy &&
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => deleteComment(comment.id)}>
                            <MaterialIcons name="delete-forever" size={22} color="red" style={{ marginTop: -12 * ratio }} />
                        </TouchableOpacity>
                    }
                </View>
            </View>

        )
    }

    return (
        <View style={styles.container} >
            <FullScreenLoader isFetching={props.deleteCommentLoading} />
            <ImageBackground source={require('../../assets/header_bar.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain', top: 0, justifyContent: 'center' }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 44 * window.width / 421,
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', }}
                            source={require('../../assets/icon-back.png')}
                        />
                        <Text style={{ color: '#fff', fontSize: 20 * ratio, marginLeft: 10 }}>{'Gallery'}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <ScrollView style={{ marginBottom: 22 * ratio }}>
                <View
                    key={props.task.id}
                    style={{
                        width: 361 * ratio,
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        marginBottom: 10,
                        flexDirection: 'column',
                        alignSelf: 'center',
                        marginTop: 22 * ratio,
                        backgroundColor: '#F1F7FF',
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12
                    }}
                    onLayout={(event) => {
                    }} >
                    <Video
                        downloadFirst={false}
                        source={{ uri: `${props.task.videoRehearsalUrl}${sasToken}` }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay={false}
                        ref={component => {
                            myRef = component;
                        }}
                        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                        style={{ width: '100%', height: 215 * ratio, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                    >

                    </Video>
                    <View style={{ position: 'absolute', zIndex: 10, width: '100%', height: 215 * ratio }}>
                        <TouchableOpacity style={{ justifyContent: 'center', flex: 1 }} onPress={() => onHandleVideoShouldPlay()}>
                            {isVideoLoaded === false ?
                                <ActivityIndicator size="large" color="#536278" />
                                : playVideo ?
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
                            {moment(props.task.featuredOn).format("Do MM yyyy")}
                        </Text>
                        <Text
                            style={{
                                color: '#1469AF',
                                lineHeight: 29,
                                fontSize: 19
                            }}>
                            {props.task.taskTitle}
                        </Text>

                        {
                            Object.keys(props.task.scriptContents).map(scriptKey =>
                                <View key={props.task.scriptContents[scriptKey].id}>
                                    <Text style={{
                                        color: '#1B3964',
                                        lineHeight: 23,
                                        fontSize: 15,
                                        marginTop: 12 * ratio
                                    }}>
                                        {props.task.scriptContents[scriptKey].scriptFieldvalue}
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        height: 61 * ratio,
                        backgroundColor: '#FFFFFF',
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12
                    }}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                flex: 1,
                                flexDirection: 'row',
                            }}
                            disabled={props.isLikeLoading.indexOf(props.task.taskAssignmentId) > -1}
                            onPress={() => { props.isLikeAPI(props.task.taskAssignmentId, !props.task.isLiked) }}>
                            {
                                props.isLikeLoading.indexOf(props.task.taskAssignmentId) > -1 ?
                                    <ActivityIndicator size="small" /> :

                                    !props.task.isLiked ? <Image
                                        style={{
                                            width: 21 * ratio,
                                            height: 21 * ratio,
                                            alignSelf: 'center',
                                        }}
                                        source={require('../../assets/icon-like.png')}
                                    /> :
                                        <Image
                                            style={{
                                                width: 21 * ratio,
                                                height: 21 * ratio,
                                                alignSelf: 'center',
                                            }}
                                            source={require('../../assets/like-active.png')}
                                        />
                            }
                            <Text style={{
                                height: 15,
                                color: '#536278',
                                fontSize: 12,
                                alignSelf: 'center',
                                marginLeft: 5
                            }}>{props.task.likesCount > 0 ? `Likes (${props.task.likesCount})` : 'Like'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                flex: 1,
                                flexDirection: 'row',
                            }}
                            onPress={() => {
                                //Clipboard.setString(props.task.shareableUrl)
                                setShowShareModal(true)
                                props.fetchUsers(1, 10, "")
                            }}>
                            <Image
                                style={{
                                    width: 21 * ratio,
                                    height: 21 * ratio,
                                    alignSelf: 'center',
                                }}
                                source={require('../../assets/icon-reply.png')}
                            />
                            <Text style={{
                                height: 15,
                                color: '#536278',
                                fontSize: 12,
                                alignSelf: 'center',
                                marginLeft: 5
                            }}>Share</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                flex: 1,
                                flexDirection: 'row',
                            }}
                            onPress={() => {
                                let content = "";
                                Object.keys(props.task.scriptContents).map(scriptKey => {
                                    content += props.task.scriptContents[scriptKey].scriptFieldvalue + "\n"
                                })
                                Clipboard.setString(content)
                            }}>
                            <Image
                                style={{
                                    width: 21 * ratio,
                                    height: 21 * ratio,
                                    alignSelf: 'center',
                                }}
                                source={require('../../assets/icon-copy.png')}
                            />
                            <Text style={{
                                height: 15,
                                color: '#536278',
                                fontSize: 12,
                                alignSelf: 'center',
                                marginLeft: 5
                            }}>Copy</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                { /** comment submit */}
                <View
                    style={{
                        width: 361 * ratio,
                        borderRadius: 12,
                        marginBottom: 10,
                        flexDirection: 'column',
                        alignSelf: 'center',
                        marginTop: 22 * ratio
                    }}
                >
                    <Text
                        style={{
                            color: '#536278',
                            lineHeight: 28,
                            fontSize: 16 * ratio
                        }}>
                        Comment
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        height: 49 * ratio,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 12,
                    }}>
                        <TextInput
                            value={comment}
                            onChangeText={onCommentChange}
                            style={{
                                borderBottomColor: "#9EA7BE",
                                borderBottomWidth: 2,
                                width: '100%',
                                fontSize: 18 * ratio,
                                color: '#1B3964'
                            }}
                        />


                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                position: 'absolute',
                                right: 20,
                                top: 0,
                                bottom: 0,
                            }}
                            onPress={addComment}>
                            {
                                props.addCommentLoading ?
                                    <ActivityIndicator size="small" color="#40A5FF" /> :
                                    <Image
                                        style={{
                                            width: 20 * ratio,
                                            height: 20 * ratio,
                                        }}
                                        source={require('../../assets/icon-submit.png')}
                                    />
                            }

                        </TouchableOpacity>
                    </View>
                    {
                        showTags &&
                        <View style={{ flex: 1, backgroundColor: '#fff', top: 10, borderBottomRightRadius: 12, borderBottomLeftRadius: 12, paddingTop: 5, padding: 10 }}>

                            {
                                props.tagUsersLoading ?
                                    <ActivityIndicator size="small" color="#40A5FF" /> :
                                    props.tagUsers.map(user =>
                                        <TouchableOpacity onPress={() => tagUser(user)}>
                                            <Text>{user.name}</Text>
                                        </TouchableOpacity>
                                    )
                            }
                        </View>
                    }
                </View >
                {props.getcommentsloading && <ActivityIndicator size="large" color="#40A5FF" style={{ marginTop: 10 * ratio }} />}
                <FlatList
                    data={props.comments}
                    renderItem={({ item }) => <Comment comment={item} />}
                    keyExtractor={item => item.id + ""}
                />

            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showShareModal}
                onRequestClose={() => { }}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView]}>
                        <Text style={styles.modalText}>Select Users</Text>
                        <TouchableOpacity
                            style={styles.btnClose}
                            onPress={() => {
                                setShowShareModal(false);
                            }}
                        >
                            <Image
                                source={require('../../assets/cross.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        {props.tagUsersLoading && <ActivityIndicator size="large" color="#40A5FF" style={{ marginTop: 10 * ratio }} />}
                        <ShareUser
                            usersToShare={props.tagUsers}
                            submit={share}
                            loading={props.shareLoading}
                        />

                    </View>
                </View>
            </Modal>
        </View >
    );
})

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E1EEFE'
    },
    backgroundImage: {
        width: window.width,
        height: 89 * window.width / 414
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#1469AF',
        width: window.width - 50,
        height: window.height - 100,
        borderRadius: 20,
        padding: 15,
        // justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btnClose: {
        position: 'absolute',
        alignItems: 'flex-end',
        top: 10,
        right: 10,
        borderRadius: 20,
        padding: 10,
    },
    image: {
        width: 15,
        height: 15,
    },
    modalText: {
        fontSize: 16,
        color: '#fff'
    }
});

const mapStateToProps = (state) => {
    return {
        comments: state.gallery.comments,
        getcommentsloading: state.gallery.getCommentsLoading,
        getcommentsError: state.gallery.getcommentsError,
        addCommentLoading: state.gallery.addCommentLoading,
        addCommentError: state.gallery.addCommentError,
        isLikeLoading: state.gallery.isLikeLoading,
        task: state.gallery.gallery,
        isLikeLoading: state.gallery.isLikeLoading,
        deleteCommentLoading: state.gallery.deleteCommentLoading,
        profile: state.profile.profile,
        tagUsers: state.gallery.tagUsers,
        tagUsersLoading: state.gallery.tagUsersLoading,
        tagUsersError: state.gallery.tagUsersError,
        shareLoading: state.gallery.shareLoading
    }
}


export default connect(mapStateToProps, {
    getCommentsAPI, addCommentAPI, isLikeAPI, selectedGallery, deleteCommentAPI, fetchUsers, shareAPI
})(ViewDeliveryPitch);