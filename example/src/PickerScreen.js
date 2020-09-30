import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from 'react-native-component-lib';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default PickerScreen = (props) => {
    const [choice, setChoice] = useState('case5')
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Picker
            // labelStyle={styles.pickerLabelStyle}
            // searchStyle={styles.pickerSearch}
            // pickerStyle={styles.pickerStyle}
            leftIcon={ <Ionicon name='ios-arrow-down' size={25} /> }
            searchIcon={ <Ionicon name='ios-search' size={30} /> }
            cleanupIcon={ <Ionicon name='ios-backspace' size={30} /> }
            onValueChange={ (value, index) =>  setChoice(value) }
            
            selectedValue={choice}
            >
                <Picker.Item label='Case 1' value='case1'  /> 
                <Picker.Item label='Case 2' value='case2'  /> 
                <Picker.Item label='Case 3' value='case3'  /> 
                <Picker.Item label='Case 4' value={null}  /> 
                {/* itemStyle={styles.pickerItemStyle} */}
            </Picker>
            <TouchableOpacity onPress={ () => props.navigation.goBack() }
            style={{ width: 100, height: 50, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}
            >
                <Text>Go back</Text>
            </TouchableOpacity>
        </View>
    )
}