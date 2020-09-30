import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Animated,
    TouchableOpacity, Modal, Keyboard,
    Dimensions, ScrollView, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import { styles } from './styles'

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const PickerItem = ({ label, value, searchLabel, itemStyle }) => {
    return (
        <View style={{ alignItems: 'center', marginVertical: 5 }}>
            <Text style={itemStyle}>{label}</Text>
        </View>
    )
}

const Picker = ({ children, onValueChange, leftIcon, searchIcon, cleanupIcon, pickerStyle, labelStyle, searchStyle, selectedValue }) => {
    const [active, setActive]                 = useState(false);
    const [filterString, setFilterString]     = useState('');

    const viewOpacity     = useRef( new Animated.Value(0) ).current;
    const slideView       = useRef( new Animated.ValueXY({ x: 0, y: screen.height }) ).current;
    const rotateAnimation = useRef( new Animated.Value(0) ).current;    

    const shaderOpacity = viewOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.8]
    })

    const spinIcon = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    const pickerAnimation = (active) => {
        Animated.parallel([
            Animated.timing(viewOpacity, {
                toValue: active ? 1 : 0,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(rotateAnimation, {
                toValue: active ? 1 : 0,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(slideView, {
                toValue: { x: 0, y: active ? searchIcon ? screen.height * 0.4 : screen.height * 0.6 : screen.height},
                duration: 500,
                useNativeDriver: false
            })

        ]).start()
    }

    const activateModal = () => {
        setActive(true)
        setTimeout( () => {
            pickerAnimation(true)
        }, 100)
        
    }

    const dismissModal = () => {
        pickerAnimation(false)
        setTimeout( () => {
            setActive(false)
            setFilterString('')
        }, 500)
    }

    const onItemChoose = ( value) => {
        onValueChange(value)

        pickerAnimation(false)
        setTimeout( () => {
            setActive(false)
            setFilterString('')
        }, 500)
    }

    // useEffect( () => {
    //     labelText()
    // }, [])

    const labelText = () => {
        const childrenArray = React.Children.toArray(children);
        
        if (childrenArray.length == 0) return '';
        
        const filteredChildren = childrenArray.filter( (element, index) => {
            return element.props.value == selectedValue
        })

        if (filteredChildren.length == 0) return childrenArray[0].props.label
        else return filteredChildren[0].props.label
    }

    const removeAccent = (text) => {
        text = text.toString().toLowerCase();
        text = text.replace(new RegExp('[ÁÀÂÃáàâã]','gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊéèê]','gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎíìî]','gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕóòôõ]','gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛúùû]','gi'), 'u');
        return text;  
    }

    return (
        <View>
            <TouchableOpacity style={[ pickerStyle, styles.pickerContainer]} onPress={ activateModal }>
                <Text style={labelStyle}>{ labelText() }</Text>
                
                {
                    leftIcon
                    ?
                    <Animated.View style={{ transform: [{ rotateX: spinIcon }] }}>
                        {leftIcon}
                    </Animated.View>
                    :
                    null
                }
                
                
            </TouchableOpacity>
            
            <Modal
            animationType='none'
            transparent={true}
            visible={active}
            statusBarTranslucent={true}
            >
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'} keyboardVerticalOffset={0}>
                    <Animated.View opacity={shaderOpacity} style={[ styles.shaderView, { zIndex: active ? 2 : 0 }]}>
                        <TouchableOpacity onPress={ dismissModal } style={{ flex: 1 }} />
                    </Animated.View>

                    <Animated.View style={[{ height: screen.height * 0.4, transform: slideView.getTranslateTransform() }, styles.listContainer ]}>
                        {
                            searchIcon
                            ?
                            <View style={styles.searchContainer}>
                                <View style={{ flex: 1 }}>
                                    {searchIcon}
                                </View>
                                
                                <TextInput
                                placeholder='Digite para pesquisar ...'
                                style={[styles.searchInput, searchStyle]}
                                value={filterString}
                                
                                onChangeText={ (text) => setFilterString(text) }
                                />
                                {
                                    filterString == ''
                                    ?
                                    <View style={{ flex: 1 }} />
                                    :
                                    <TouchableOpacity onPress={ () => setFilterString('') } style={{ flex: 1 }}>
                                        {cleanupIcon}
                                    </TouchableOpacity>
                                }
                                
                            </View>
                            :
                            null
                        }
                        
                        <View style={{ flex: 1 }}>
                            <ScrollView contentContainerStyle={styles.scrollContainer}>
                                {
                                    React.Children.map( children, (child, index) => {
                                        if ( filterString == '' ) {
                                            return (
                                                <TouchableOpacity
                                                key={index}
                                                style={styles.pickerItemContainer}
                                                onPress={ () => onItemChoose( child.props.value) }
                                                >
                                                    { child }
                                                </TouchableOpacity>
                                            )
                                        } else {
                                            if ( removeAccent(child.props.label).includes( removeAccent(filterString) ) ) {
                                                return (
                                                    <TouchableOpacity
                                                    key={index}
                                                    style={styles.pickerItemContainer}
                                                    onPress={ () => onItemChoose(child.props.value) }
                                                    >
                                                        { child }
                                                    </TouchableOpacity>
                                                )
                                            }
                                        }
                                    })
                                }
                            </ScrollView>
                        </View>
                        
                    </Animated.View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}

Picker.Item = PickerItem;


export default Picker;