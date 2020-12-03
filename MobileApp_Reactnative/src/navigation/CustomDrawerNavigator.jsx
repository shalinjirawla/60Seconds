import React from "react";
import { View, Image, Text, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const window = Dimensions.get('window');

const CustomDrawerNavigator = props => {

    return (
        < View style={[styles.container]} >
            <ImageBackground source={require('../../assets/menu_background.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain', top: 0, }}>
                <View style={{ marginLeft: '40%', marginTop: '20%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ height: 16, width: 52, color: '#6085BB', fontSize: 14, fontWeight: '500', lineHeight: 16 }}>MENU</Text>
                        <TouchableOpacity onPress={props.navigation.toggleDrawer} style={{ position: 'absolute', right: 0 }}>
                            <Image
                                style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#FD6F2A', marginRight: 20 }}
                                source={require(`../../assets/cross.png`)}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        {props.navigation.state.routes.map((item) => {
                            const { drawerIcon, drawerIconSelected } = props.descriptors[item.routeName].options;
                            return (
                                <TouchableOpacity
                                    key={item.key}
                                    onPress={() => {
                                        props.navigation.toggleDrawer();
                                        props.navigation.navigate(item.routeName, [{ isStatusBarHidden: false }, item.params !== undefined ? { ...item.params } : {}]);
                                    }
                                    }
                                >
                                    <View style={[{ height: 50, flexDirection: 'row', width: '100%', marginVertical: 20, color: '#6085BB' }, props.activeItemKey === item.routeName ? { borderRightWidth: 5, borderRightColor: '#FD6F2A', backgroundColor: '#E7F4FF', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 } : {}]}>
                                        <Image
                                            style={{ width: 50, height: 50, resizeMode: 'contain' }}
                                            source={props.activeItemKey === item.routeName ? drawerIconSelected : drawerIcon}
                                        />
                                        <Text style={{
                                            color: '#6085BB',
                                            fontSize: 16,
                                            fontWeight: '300',
                                            margin: 15,
                                        }}>{item.routeName}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ImageBackground>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#1469AF',
    },
    icons: {
        width: 30
    },
    backgroundImage: {
        width: window.width,
        height: 1522 * window.width / 828
    },
});

export default CustomDrawerNavigator;