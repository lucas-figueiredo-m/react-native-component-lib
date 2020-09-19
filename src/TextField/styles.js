import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({

    secureComponent: {
        position: 'absolute',
        right: 0,
        bottom: height * 0.01
    },

    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    errorText: {
        marginLeft: width * 0.02
    }
})