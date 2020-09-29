import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    root: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        paddingBottom: height * 0.02,
        zIndex: 1,
        elevation: 24
    },

    drawerView: {
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 25,
        elevation: 24
    },

    childrenStyle: {
        flex: 1,
        zIndex: 1
    },

    sideContainer: {
        flex: 15,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    centralContainer: {
        flex: 70,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

})
