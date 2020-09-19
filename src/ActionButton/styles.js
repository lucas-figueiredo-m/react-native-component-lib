import { StyleSheet,
    Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    mainButtonContainer: {
        
        
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 35,
        right: 35,
        zIndex: 4
    },

    mainButtonContent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 50,
        elevation: 5,
    },

    secondaryButtonContainer: {
        right: 40,
        zIndex: 3,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    secondaryButtonContent: {
        width: 50,
        height: 50,
        borderRadius: 50,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },


    labelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    },

    labelText: {
        textAlign: 'right'
    },

    blackView: {
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
        height: 400,
        width: 400,
        alignSelf: 'center'
    }
})