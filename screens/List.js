import React, {useState, useEffect} from "react";
import {
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Modal,
    Image,
    StatusBar,
    TextInput,
    ScrollView,
} from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";

const ModalId = (props) => {

    const [hisInput, setHisInput] = useState(false);
    const [hist, setHist] = useState('');

    const sendHist = () => {
        fetch('http://192.168.0.157:8000/api/pacjent/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numer_p: props.dataBase[Number(props.kodId) - 1].id,
                historia: hist,
                numer: 0,
            })
        });
    }

    return(
        <TouchableOpacity 
            style = {styles.modal}
            onPress = {() => props.setPopupId(false)}
        >
            <TouchableOpacity 
                style = {styles.modalContent}
                activeOpacity={1}
            >
                <Text style = {{ fontSize: 20, textAlign: 'center', marginBottom: 10, }}>Dane pacjenta:</Text>
                <Text>ID: {props.dataBase[Number(props.kodId) - 1].id}</Text>
                <Text>Imię: {props.dataBase[Number(props.kodId) - 1].imie}</Text>
                <Text>Nazwisko: {props.dataBase[Number(props.kodId) - 1].nazwisko}</Text>
                <Text>Wiek: {props.dataBase[Number(props.kodId) - 1].wiek}</Text>
                <Text>Historia: {props.dataBase[Number(props.kodId) - 1].historia}</Text>
                

                {(hisInput) ? null : 
                    <View style = {{ width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity 
                            style = {{ backgroundColor: '#9a8c98', borderRadius: 10, padding: 5, marginTop: 10 }}
                            onPress = {() => setHisInput(true)}
                        >
                            <Text>Dodaj historię</Text>
                        </TouchableOpacity>
                    </View>
                }

                {(hisInput) ? 
                    <View style = {{ backgroundColor: '#D3D3D3', borderRadius: 10, padding: 5, marginTop: 10, }}>
                        <TextInput
                            onChangeText={setHist}
                            value={hist}
                            placeholder="Nowa historia"
                            selectionColor={'#9a8c98'}
                            multiline={true}
                        />
                    </View>:
                    null
                }

                {(hisInput) ? 
                    <View style = {{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity 
                            style = {{ backgroundColor: '#9a8c98', borderRadius: 10, padding: 5, marginTop: 10 }}
                            onPress={() => {
                                setHisInput(false)
                                sendHist()
                                props.setPopupId(false)
                            }}
                        >
                            <Text>Zatwierdź</Text>
                        </TouchableOpacity>
                    </View>:
                    null
                }

            </TouchableOpacity>
            {/* {console.log(props.dataBase[Number(props.kodId)].id)} */}
        </TouchableOpacity>
    );
}

export default function List({navigation}){

    const [kodId, setKodId] = useState();
    const [popupId, setPopupId] = useState(false);
    const [dataBase, setDataBase] = useState([]);

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(true);

    const loadDatabase = () => {
        fetch('http://192.168.0.157:8000/api/pacjent')
            .then((response) => response.json())
            .then((json) => setDataBase(json))
            .catch((error) => console.error('Błąd w fetch: ' + error))
            // .finally(() => console.log(dataBase))
    }

    const cameraPermission = async() => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status == 'granted');
    }

    useEffect(() => {
        loadDatabase();
        cameraPermission();
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // alert(`Typ: ${type}, baza ${Linking.openURL(`${data}`)} zostały zeskanowane`);
        // alert(`Typ: ${type}, baza ${setKodId(`${data}`)} zostały zeskanowane`);
        setKodId(data);
        setPopupId(true);
        loadDatabase();
        // setTescik(data)
    }

    if (hasPermission === null){
        return <Text>Zezwól na używanie kamery</Text>
    }

    if( hasPermission === false){
        return <Text>Brak dostępu do kamery</Text>
    }

    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Panel pacjanta</Text>
            <Text style = {styles.desc}>Aby uzyskać informacje o pacjencie zeskanuj kod QR naciskając poniższy przycisk:</Text>
            <TouchableOpacity style = {styles.buttonQrContainer} onPress={() => setScanned(false)}>
                {scanned ? 
                    <Image 
                        source={require('../assets/img/img1.png')}
                        style = {styles.image}
                    /> : 
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        // style = {{ height: 250, width: 150, }}
                        style = {StyleSheet.absoluteFillObject}
                    />
                }
            </TouchableOpacity>

            {(scanned) ? 
                null : 
                <TouchableOpacity onPress={() => setScanned(true)} style = {styles.buttonClose}>
                    <Text style = {styles.desc}>Anuluj</Text>
                </TouchableOpacity>
            }

            <Modal
                transparent={true}
                animationType='fade'
                visible={popupId}
                nRequestClose={() => setPopupId(false)}
            >
                <ModalId
                    setPopupId={setPopupId}
                    // DB={DB}
                    dataBase={dataBase}
                    kodId={kodId}
                />
            </Modal>

            <Text style = {styles.desc}>Rejestracja nowego pacjenta:</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style = {{ fontSize: 32, color: '#22223b', }}>Rejestruj</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => navigation.navigate('HomeScreen')}
            >
                <Text style = {styles.logoutText}>Wyloguj się</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: '#f2e9e4',
        marginTop: StatusBar.currentHeight,
    }, 

    title: {
        fontSize: 32,
        color: '#22223b',
        marginTop: 70,
        margin: 15,
    },

    desc: {
        fontSize: 18,
        textAlign: 'center',
        color: '#4a4e69'
    },

    buttonQrContainer: {
        height: 250,
        width: 250,
        margin: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70,
    },

    image: {
        height: 235,
        width: 225,
    },

    buttonClose: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        width: '40%',
        height: 40,
        backgroundColor: '#9a8c98',
        marginTop: -10,
        marginBottom: 30,
    },

    inputText: {
        fontSize: 26
    },

    buttonContainer: {
        height: 60, 
        width: '60%', 
        backgroundColor: '#9a8c98', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 30,
    },

    buttonText: {
        fontSize: 20,
        color: '#22223b'
    },

    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    modalContent: {
        minHeight: 20,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },

    logoutButton: {
        position: 'absolute',
        bottom: 20,
        height: 60,
        width: '60%',
        borderRadius: 30,
        backgroundColor: '#9a8c98',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoutText: {
        fontSize: 20,
        color: '#22223b',
    },  
});

