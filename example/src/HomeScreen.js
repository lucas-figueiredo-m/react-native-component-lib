import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen(props) {

    const ButtonList = [
        {
            label: 'TextInput',
            onPress: () => props.navigation.navigate('inputs')
        },
        {
            label: 'Drawer',
            onPress: () => props.navigation.navigate('drawerScreen')
        },
        {
            label: 'NavBar',
            onPress: () => props.navigation.navigate('navBarScreen')
        },
        {
            label: 'ActionButton',
            onPress: () => props.navigation.navigate('actionButtonScreen')
        }
    ]

    return (
        <View style={styles.container}>
            {
                ButtonList.map( (button, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={button.onPress} style={styles.button}>
                            <Text>{button.label}</Text>
                        </TouchableOpacity>
                    )}
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    button: {
        width: 100,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        backgroundColor: 'red'
    }
});