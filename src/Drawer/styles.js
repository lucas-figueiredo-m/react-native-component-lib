import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    root: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: width * 0.05,
        zIndex: 1
    },

    drawerView: {
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 4
    },

    childrenStyle: {
        flex: 1,
        zIndex: 1
    }
})
