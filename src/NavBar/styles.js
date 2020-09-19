import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
    },

    mainContainer: {
        flex: 1
    },

    navContainer: {
        height: height * 0.075,
        // width: width,
        //position: 'absolute',
        // bottom: 0,
        elevation: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
        // borderTopWidth: 2,
        // borderTopColor: colors.lightGrey
    },

    slideBackground: {
        height: height * 0.005,
        elevation: 20,
    },

    children: {
        width: width
    }
})