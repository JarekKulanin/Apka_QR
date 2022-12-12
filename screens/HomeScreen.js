import React from 'react';
import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

export default function HomeScreen({navigation}) {

  const[login, setLogin] = useState('');
  const[haslo, setHaslo] = useState('');

  return (
    <KeyboardAvoidingView style = {{ flex: 1 }}>
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style = {styles.title}>QR Scanner</Text>
      <Text style = {styles.dsc}>Zaloguj się aby uzyskać wszystkie informacje o pacjencie.</Text>

      <View style = {styles.input}>
        <View style = {styles.inputCont}>
          <TextInput
            style={styles.inputText}
            onChangeText={setLogin}
            value={login}
            placeholder="Login"
            selectionColor={'#9a8c98'}
          />
        </View>

        <View style = {styles.inputCont}>
          <TextInput
            style={styles.inputText}
            onChangeText={setHaslo}
            value={haslo}
            placeholder="Hasło"
            secureTextEntry={true}
            selectionColor={'#9a8c98'}
          />
        </View>
      </View>

      <TouchableOpacity 
        onPress={() => {
          if (login == 'login' && haslo == 'haslo'){
            navigation.navigate('List')
          } 
        }} 
        style={styles.button}
      >
        <Text style = {styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>

    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2e9e4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 36,
    margin: 30,
    color: '#22223b'
  },

  dsc: {
    fontSize: 16,
    textAlign: 'center',
    margin: 15,
    color: '#4a4e69'
  },

  input: {
    width: '100%',
    alignItems: 'center',
    margin: 10,
  },

  inputCont:{
    backgroundColor: '#c9ada7',
    height: 50,
    width: '80%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 10,
  },

  inputText: {
    width: '90%',
    fontSize: 16
  },

  button: {
    height: 60,
    width: '60%',
    backgroundColor: '#9a8c98',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 15,
  },

  buttonText: {
    fontSize: 20,
    color: '#22223b'
  },
});
