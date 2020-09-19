import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, Animated, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles'

const ActionButton = ({ children, mainIcon, buttons, mainBackgroundColor, labelStyle, buttonRotation }) => {
    const [active, setActive]             = useState(false);
    const [rotateAnimation, setRotate]    = useState( new Animated.Value(0) );
    const [slideButtons, setSlideButtons] = useState( new Animated.Value(0) );
    const [textOpacity, setTextOpacity]   = useState( new Animated.Value(0) );
    const [viewOpacity, setViewOpacity]   = useState( new Animated.Value(0) );

    useEffect( () => {
        Animated.timing(rotateAnimation, {
            toValue: active ? 1 : 0,
            duration: 500,
            useNativeDriver: true
        }).start();

        Animated.timing(slideButtons, {
            toValue: active ? 1 : 0,
            duration: 500,
            useNativeDriver: false
        }).start()

        Animated.timing(textOpacity, {
            toValue: active ? 1 : 0,
            duration: 500,
            useNativeDriver: false
        }).start()

        Animated.timing(viewOpacity, {
            toValue: active ? 1 : 0,
            duration: 500,
            useNativeDriver: false
        }).start()
    })

    const spinButton = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', buttonRotation]
    })

    const slideButtonsCallback = (index) => {
        return {
            bottom: slideButtons.interpolate({
                inputRange: [0, 1],
                outputRange: [35, 140 + index*70]
            })
        }
    }

    const labelOpacity = textOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const shaderOpacity = viewOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.8]
    })

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, zIndex: 1 }}>
                { children }
            </View>
            
            <Animated.View style={[ { transform: [{ rotate: spinButton }]}, styles.mainButtonContainer]}>
                <TouchableHighlight
                underlayColor={mainBackgroundColor}
                onPress={ () => setActive(!active) }
                style={[styles.mainButtonContent, { backgroundColor: mainBackgroundColor }]}
                >
                    { mainIcon() }
                </TouchableHighlight>
            </Animated.View>

            {
                buttons
                ?
                buttons.map( (button, index) => {
                    return (
                        <Animated.View key={index} style={[ slideButtonsCallback(index), styles.secondaryButtonContainer ]}>
                            <Animated.View opacity={labelOpacity} style={ styles.labelContainer }>
                                <Text style={[ labelStyle, styles.labelText]}>{button.label}</Text>
                            </Animated.View>
                            
                            <TouchableOpacity
                            onPress={ button.onPress }
                            activeOpacity={0.6}
                            style={[ styles.secondaryButtonContent, { backgroundColor: button.backgroundColor }]}
                            >
                                { button.icon }
                            </TouchableOpacity>
                        </Animated.View>
                    )
                })
                :
                null
            }

            <Animated.View opacity={shaderOpacity} style={[StyleSheet.absoluteFill, { backgroundColor: 'black', zIndex: active ? 2 : 0 }]}>
                <TouchableOpacity onPress={ () => setActive(false)} style={{ flex: 1 }} />
            </Animated.View>
            
        </View>
        
    )
}

export default ActionButton;