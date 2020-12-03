import * as React from "react";
import { StyleSheet, TextInput as Input, TextInputProps } from "react-native";

const TextInput = props => {

    const { style, ...otherProps } = props;
    return (
        <Input
            caretHidden={false}
            selectionColor={"#428AF8"}
            style={[styles.textInput, style]}
            {...otherProps}
        />
    );

}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        height: 50,
        borderColor: "#BEBEBE",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
        borderRadius: 5,
        paddingLeft: 5
    }
});

export default TextInput;