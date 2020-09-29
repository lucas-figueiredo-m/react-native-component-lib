import React, { useState, useEffect, useRef } from 'react';
import { View, Animated,
    PanResponder, Dimensions,
    TouchableOpacity, StyleSheet,
    Text
} from 'react-native'
import { styles } from './styles'

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const Drawer = ({ backgroundColor, drawerIcon, headerComponent, secondaryIcon, drawerRight, children, drawerChildren, headerHeight, onSecondaryPress }) => {
    const [dimensions, setDimensions]          = useState({ window, screen });
    const [active, setActive]                  = useState(false);

    const viewOpacity     = useRef( new Animated.Value(0) ).current;
    const drawerPosition  = useRef( new Animated.ValueXY({ x: drawerRight ? window.width : -window.width * 0.8, y: 0}) ).current;


    const onChange = ({ window, screen }) => setDimensions({ window, screen });
    

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove   : (event, gesture) => {
            if ( drawerRight ) {
                if ( gesture.moveX > width - drawerWidth ) {
                    drawerPosition.setValue({ x: gesture.moveX, y: 0 })
                }
            } else {
                if ( gesture.moveX < drawerWidth ) {
                    drawerPosition.setValue({ x: gesture.moveX - drawerWidth, y: 0 })
                }    
            }
            
        },
        onPanResponderRelease: (event, gesture) => {
            if ( drawerRight ) {
                if ( gesture.moveX > width - drawerWidth/2) {
                    Animated.timing(
                        drawerPosition, {
                            toValue: { x: width, y: 0 },
                            duration: 250,
                            useNativeDriver: false,
                    }).start()
                    setActive(false)
                } else {
                    Animated.timing(
                        drawerPosition, {
                            toValue: { x: width - drawerWidth, y: 0 },
                            duration: 250,
                            useNativeDriver: false,
                    }).start()
                }
            } else {
                if ( gesture.moveX < drawerWidth/2) {
                    Animated.timing(
                        drawerPosition, {
                            toValue: { x: -drawerWidth, y: 0 },
                            duration: 250,
                            useNativeDriver: false,
                    }).start()
                    setActive(false)
                } else {
                    Animated.timing(
                        drawerPosition, {
                            toValue: { x: 0, y: 0 },
                            duration: 250,
                            useNativeDriver: false,
                    }).start()
                }
            }
            
        }
        
    });

    useEffect( () => {
        Animated.timing(viewOpacity, {
            toValue: active ? 1 : 0,
            duration: 250,
            useNativeDriver: false
        }).start();
    })

    useEffect( () => {
        Dimensions.addEventListener("change", onChange);
        return () => Dimensions.removeEventListener("change", onChange)
    }, [])

    const width  = dimensions.screen.width;
    const height = dimensions.screen.height;
    const drawerWidth = width * 0.8

    const shaderOpacity = viewOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.8]
    })

    const onMenuOpen = () => {
        setActive(!active)
        Animated.timing(
            drawerPosition, {
                toValue: { x: drawerRight ? width - drawerWidth : 0, y: 0 },
                duration: 500,
                useNativeDriver: false,
        }).start()
    }
    

    return (
        <View style={styles.root}>

            <View style={[ styles.header, { width, height: headerHeight , backgroundColor: backgroundColor, flexDirection: drawerRight ? 'row-reverse' : 'row' }]}>
            
                <View style={styles.sideContainer}>
                    <TouchableOpacity
                    style={styles.sideContainer}
                    onPress={onMenuOpen}
                    >
                        { drawerIcon() }    
                    </TouchableOpacity>  
                </View>
                
                
                <View style={styles.centralContainer}>
                    {headerComponent}
                </View>

                <View style={styles.sideContainer}>
                    {
                        secondaryIcon
                        ?
                        <TouchableOpacity
                        onPress={onSecondaryPress}
                        style={styles.sideContainer}
                        >
                            { secondaryIcon() }
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>
            </View>

            <View style={styles.childrenStyle}>
                { children }
            </View>

            <Animated.View
            {...panResponder.panHandlers}
            style={[ styles.drawerView, { height: height, width: drawerWidth, transform: drawerPosition.getTranslateTransform() } ]}>
                { drawerChildren() }
            </Animated.View>

            <Animated.View opacity={shaderOpacity} style={[StyleSheet.absoluteFill, { backgroundColor: 'black', zIndex: active ? 2 : 0 }]}>
                <TouchableOpacity
                onPress={ () => {
                    setActive(false)
                    Animated.timing(
                        drawerPosition, {
                            toValue: { x: drawerRight ? width : -drawerWidth, y: 0 },
                            duration: 500,
                            useNativeDriver: false,
                    }).start()
                }}
                style={{ flex: 1 }}
                />
            </Animated.View>
            
        </View>
    )
}

export default Drawer;