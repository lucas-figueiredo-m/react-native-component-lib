
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-component-lib';

export default function Inputs(props) {
  const [email, setEmail] = React.useState('');

  return (
    <View style={styles.container}>
      <TextField
      label='E-mail'
      value={email}
      onChangeText={ (text) => setEmail(text) }
      focusColor={'#37027D'} blurColor={'#666666'}
      labelStyle={styles.labelStyle}
      containerStyle={styles.textContainerStyle}
      textStyle={styles.textStyle}
      errorStyle={styles.errorStyle}
      highlightFontOnFocus={true}
      />

      <TouchableOpacity
      onPress={ () => props.navigation.goBack() }
      style={styles.backButton}
      >
          <Text>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainerStyle: {
    width: '50%',
    height: 55,
    },

    textStyle: {
        fontSize: 16
    },

    labelStyle: {
        letterSpacing: 0.5
    },

    errorStyle: {
        color: 'red'
    },

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
