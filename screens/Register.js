import React, {useState} from "react";
import{
    KeyboardAvoidingView,
    StyleSheet,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';

const postData = (imie, nazwisko, wiek, historia) => {
    fetch('http://192.168.0.157:8000/api/pacjent/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imie: imie,
            nazwisko: nazwisko,
            wiek: wiek,
            historia: historia,
            numer: 1,
        })
    });
}

export default function Register({navigation}){

    const [imie, setImie] = useState('');
    const [nazwisko, setNazwisko] = useState('');
    const [wiek, setWiek] = useState('');
    const [historia, setHistoria] = useState('');
    

    const [conf, setConf] = useState(false);

    return(
        <KeyboardAvoidingView style = {{ flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: '#f2e9e4' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style = {styles.backButton}>{"<"} Powrót</Text>
            </TouchableOpacity>

            <View style = {{ flex: 1, alignItems: 'center' }}>
                <Text style = {styles.title}>Dane rejestracji</Text>
                <View style = {styles.containerInput}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Imię"
                        selectionColor={'#9a8c98'}
                        onChangeText={setImie}
                        value={imie}
                    />
                </View>
                <View style = {styles.containerInput}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nazwisko"
                        selectionColor={'#9a8c98'}
                        onChangeText={setNazwisko}
                        value={nazwisko}
                    />
                </View>
                <View style = {styles.containerInput}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Wiek"
                        selectionColor={'#9a8c98'}
                        onChangeText={setWiek}
                        value={wiek}
                    />
                </View>
                <View style = {styles.containerInput}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Historia"
                        selectionColor={'#9a8c98'}
                        onChangeText={setHistoria}
                        value={historia}
                    />
                </View>

                {(!conf) ? null : <Text style = {{ fontSize: 16, color: '#22223b' }}>Wypełnij wszystkie pola!</Text>}

                <TouchableOpacity 
                    style = {styles.registerButton} 
                    onPress = {() => {
                        if(imie === '' && nazwisko === '' && wiek === '' && historia === ''){
                            setConf(true);
                        } else {
                            setConf(false);
                            postData(imie, nazwisko, wiek, historia);
                        }
                    }}
                >
                    <Text style = {styles.regiserText}>Rejestruj</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({

    backButton: {
        fontSize: 18,
        padding: 10,
    },

    title: {
        textAlign: 'center',
        fontSize: 36,
        marginBottom: 10,
    },

    containerInput: {
        backgroundColor: '#ffffff',
        height: 50,
        width: '80%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
    },

    textInput: {
        width: '90%',
        fontSize: 16,
    },

    registerButton: {
        marginTop: 20,
        height: 60,
        width: '60%',
        borderRadius: 30,
        backgroundColor: '#9a8c98',
        alignItems: 'center',
        justifyContent: 'center',
    },

    regiserText: {
        fontSize: 20,
        color: '#22223b',
    },
});