import * as React from "react";
import { StyleSheet, Switch as RNSwitch, View } from "react-native";
import Text from "./Text";

const Switch = props => {

    const { style, label, ...otherProps } = props;
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            <RNSwitch
                onValueChange={props.onValueChange}
                value={props.value}
                {...otherProps}
                style={[styles.container, style]}
            />
            {label && <Text style={{ color: "rgb(82, 99, 118)", fontSize: 18, marginLeft: 10, textAlign: 'center', }} value={label} />}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    }
});

export default Switch;