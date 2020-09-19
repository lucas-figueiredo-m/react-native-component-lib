import React, { Component, useState, useEffect, useRef } from 'react';
import { ScrollView, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { styles } from './styles'

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const NavBar = ({ children, onTop, data, animatedEffect, showBar, backgroundColor, barColor, callbackRender }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [dimensions, setDimensions] = useState({ window, screen });
    const [xOffset, setXOffset]       = useState( new Animated.ValueXY() );

    const scroll = useRef();
    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    }

    useEffect( () => {
        Dimensions.addEventListener("change", onChange);

        return () => {
            Dimensions.removeEventListener("change", onChange);
        }
    }, [])

    const width = dimensions.window.width;

    return (
        <View style={[styles.root, { flexDirection: onTop ? 'column-reverse' : 'column'}]}>
            <ScrollView
            style={styles.mainContainer}
            horizontal={true}
            pagingEnabled={true}
            keyboardDismissMode='interactive'
            showsHorizontalScrollIndicator={false}
            ref={scroll}
            onScroll={ (event) => {
                Animated.spring(
                    xOffset, {
                        toValue: { x: event.nativeEvent.contentOffset.x / data.length, y: 0 },
                        useNativeDriver: false,
                        ...animatedEffect,
                }).start()

                if ( (event.nativeEvent.contentOffset.x % width).toFixed(3) == 0 ) {
                    setSlideIndex(event.nativeEvent.contentOffset.x / width)
                } 
            }} 
            >
                {
                    React.Children.map( children, (child, index) => {
                        return (
                            <View key={index} style={{ width: width }}>
                                {child}
                            </View>
                        ) 
                    })
                }


            </ScrollView>
            {
                showBar
                ?
                <View style={[styles.slideBackground, { backgroundColor: backgroundColor, width: width }]}>
                    <Animated.View style={[ styles.slideBackground, { width: width / data.length, backgroundColor: barColor }, xOffset.getLayout() ]} />
                </View>
                :
                null
            }
            
            <View style={[styles.navContainer, { backgroundColor: backgroundColor, width: width }]}>
                {
                    data.map( (item, index) => {
                        return (
                            <TouchableOpacity key={index}
                            onPress={ () => scroll.current.scrollTo({ x: index * width, animated: true })}
                            >
                                { callbackRender(slideIndex, index, item) }
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            
        </View>
    )
}

export default NavBar;