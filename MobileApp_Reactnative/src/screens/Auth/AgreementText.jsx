import React from "react";
import { Text } from 'react-native';

const AgreementText = () => {

    return (

        <Text style={{
            color: "rgb(82, 99, 118)",
            fontSize: 12,
            alignItems: 'center',
            textAlign: 'center',
        }}>By signing up you agree to: <Text style={{ textDecorationLine: 'underline' }}>Terms of Services</Text> and <Text style={{ textDecorationLine: 'underline' }}>Privacy Policy</Text> in a sentence.</Text>
    );

}


export default AgreementText;