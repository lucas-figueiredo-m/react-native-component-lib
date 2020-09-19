import React, { Component } from 'react';
import { Text, StatusBar, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavBar } from 'react-native-component-lib';
import Ionicon from 'react-native-vector-icons/Ionicons';

const testData = [
    'ios-home',
    'ios-pie-chart',
    'ios-notifications',
    'ios-person',
];

class App extends Component {

  state = {
    barColor: 'white',
    highlightColor: 'green'
  };

  upperCallback = (childData) => {
    this.setState({ barColor: childData})
  };

  lowerCallback = (childData) => {
    this.setState({ highlightColor: childData})
  };

  icon = (slideIndex, index, content) => {
    return (
      <Ionicon name={content} size={35} color={ index == slideIndex ? '#37027D' : '#666666' } />
    )
  };

  text = (slideIndex, index, content) => {
    return (
      <Text style={{ color: index == slideIndex ? '#37027D' : '#666666'}}>{content}</Text>
    )
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#ddddddff" barStyle='dark-content' animated={true} />
        <NavBar
        data = {testData}
        callbackRender={this.icon}
        backgroundColor={'white'}
        onTop={false}
        barColor={'#37027D'}
        showBar={true}
        animatedEffect={{ tension: 200 }}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
                <TouchableOpacity
                onPress={ () => this.props.navigation.goBack() }
                style={styles.backButton}
                >
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }} />
          
        </NavBar>
      </View>
      
    )
  };
};

const styles = StyleSheet.create({
    backButton: {
        width: 100,
        height: 50,
        backgroundColor: 'aqua',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    }
});

export default App;