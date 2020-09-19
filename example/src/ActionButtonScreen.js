import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
// import { TextField } from 'react-native-component-lib';
import { ActionButton } from 'react-native-component-lib'

const Page1 = (props) => {

    const data = [
        {
            icon: <Ionicon name='ios-person' size={30} color='white' />,
            backgroundColor: 'blue',
            onPress: () => console.log('Item 1'),
            label: 'Perfil'
        },
        {
            icon: <Ionicon name='ios-information' size={30} color='white' />,
            backgroundColor: 'green',
            onPress: () => console.log('Item 2'),
            label: 'Sobre o app'
        },
        {
            icon: <Ionicon name='ios-log-out' size={30} color='white' />,
            backgroundColor: 'black',
            onPress: () => console.log('Item 3') ,
            label: 'Sair'
        }
    ]
 
    return (
        <View style={{ flex: 1, backgroundColor: 'white'}}>
            <ActionButton
            mainIcon={ () => <Ionicon name='ios-menu' size={36} color={'white'} /> }
            mainBackgroundColor={'#37027D'}
            buttons={ data }
            labelStyle={styles.labelStyle}
            buttonRotation='-180deg'
            >
                <TouchableOpacity
                onPress={ () => props.navigation.goBack() }
                style={styles.backButton}
                >
                    <Text>Voltar</Text>
                </TouchableOpacity>

            </ActionButton>
        </View>
        
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    labelStyle: {
        color: 'white'
    },

    backButton: {
        width: 100,
        height: 50,
        backgroundColor: 'aqua',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    }
})

export default Page1