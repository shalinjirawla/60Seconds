import * as React from "react";
import { StyleSheet, Text as RNText, TextInputProps } from "react-native";

const Text = props => {

    const { style, ...otherProps } = props;
    return (
        <RNText style={[styles.textInput, style]} {...otherProps}>
            {props.value}
        </RNText>
    );

}

const styles = StyleSheet.create({
    textInput: {
    }
});

export default Text;