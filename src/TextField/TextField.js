import React, { useState, useEffect, useRef } from 'react'
import { Text, View, TextInput, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

const TextField = (props) => {
  const [isFocused, setFocus]            = useState(false);
  const [focusColor, setFocusColor]      = useState('#aaa');
  const [blurColor, setBlurColor]        = useState('#000');
  const [errorColor, setErrorColor]      = useState('red');
  const [viewHeight, getViewHeight]      = useState(0)

  const animatedLabel = useRef( new Animated.Value(props.value === '' ? 0 : 1) ).current 
  const animatedView  = useRef( new Animated.Value(props.value === '' ? 0 : 1) ).current

  const inputRef = useRef(null);

  useEffect( () => {

    Animated.parallel([
      Animated.timing( animatedLabel, {
        toValue: props.error ? 2 : (isFocused || props.value !== '') ? 1 : 0,
        duration: 200,
        useNativeDriver: false
      }),

      Animated.timing( animatedView, {
        toValue: props.error ? 2 : (isFocused || props.value !== '') ? 1 : 0,
        duration: 200,
        useNativeDriver: false
      })

    ]).start()    

    if ( props.focusColor )  setFocusColor(props.focusColor) 
    if ( props.blurColor )  setBlurColor(props.blurColor)
    if ( props.errorColor )  setErrorColor(props.errorColor)
  }, [isFocused])

  const labelStyle = {
    position: 'absolute',
    zIndex: 1,
    left: props.outline ? width * 0.025 : 0,
    bottom: animatedLabel.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        0,
        props.outline ? viewHeight - 0.033 * height : viewHeight - 0.0218 * height,
        props.outline ? viewHeight - 0.033 * height : viewHeight - 0.0218 * height
      ],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [20, 14, 14],
    }),
    color: animatedLabel.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [blurColor, focusColor, errorColor],
    }),
  }

  const outlineViewStyle = {
    borderWidth: animatedView.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 1.5, 1.5]
    }),
    backgroundColor: props.backgroundColor,
    borderRadius: props.borderRadius,
    borderColor: animatedView.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [blurColor, focusColor, errorColor]
    })
  }

  const normalViewStyle = {
    borderBottomWidth: 1,
    backgroundColor: props.backgroundColor,
    borderRadius: props.borderRadius,
    borderBottomColor: animatedView.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [blurColor, focusColor, errorColor]
    })
  }

  const onInputPress = () => {
    setFocus(true);
    inputRef.current.focus()
  }
  
  return (
    <TouchableOpacity
    onPress={onInputPress}
    activeOpacity={1}
    style={props.containerStyle}
    >
      <Animated.View
      onLayout={ (event) => getViewHeight(event.nativeEvent.layout.height) }
      style={[ { flex: 1 }, props.outline ? outlineViewStyle : normalViewStyle ]}
      >
        
        <Animated.Text style={[labelStyle, props.labelStyle]}>
          {props.label}
        </Animated.Text>

        <TextInput
        {...props}
        ref={inputRef}
        onFocus={ () => setFocus(true) }
        onBlur={ () => setFocus(false)}
        // blurOnSubmit={true}
        style={[ props.textStyle, { flex: 1, color: props.error ? errorColor : (isFocused || props.value !== '') ? props.highlightFontOnFocus ? focusColor : blurColor : blurColor } ]}
        />
        {
          props.secureTextComponent
          ?
          <View style={[styles.secureComponent, props.outline ? { right: width * 0.02 } : null]}>
            { props.secureTextComponent(props.secureTextEntry) }
          </View>
          :
          null
        }
      </Animated.View>

      {
        props.error
        ?
        <View style={styles.errorContainer}>
          {
            props.errorIcon
            ?
            props.errorIcon()
            :
            null
          }
          <Text style={[ styles.errorText, props.errorStyle ]}>{props.error}</Text>
        </View>
        :
        null
      }
    </TouchableOpacity>
    
  );
};

export default TextField;