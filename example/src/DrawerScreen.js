import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';
// import { TextField } from 'react-native-component-lib';
import { Drawer } from 'react-native-component-lib';

const Page2 = (props) => {

    const drawerChildren = () => {
        return (
            <TouchableOpacity
            onPress={ () => props.navigation.goBack() }
            style={styles.backButton}
            >
                    <Text>Voltar</Text>
                </TouchableOpacity>
        )
    }
 
    return (
        <View style={{ flex: 1, backgroundColor: 'white'}}>
            <Drawer
            backgroundColor={'#37027D'}
            drawerRight={true}
            headerHeight={20}
            drawerIcon={ () => <Ionicon name='ios-menu' size={36} color={'white'} /> }
            headerText={ () => <Text style={{ color: 'white' }}>Component Lib</Text> }
            drawerChildren={ () => drawerChildren() }
            //secondaryIcon={ () => <MenuIcon fill={'black'} stroke={'white'} /> }
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity>
                        <Ionicon name='ios-menu' size={36} color={'black'} />
                    </TouchableOpacity>
                </View>
                
            </Drawer>
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

export default Page2