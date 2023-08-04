import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { Button, Image } from '@rneui/base';
import { COLOR_BACKGROUND_ANARANJADO, COLOR_BACKGROUND_CARD_WHITE, styleHome } from '../../styles/StyleGlobal';
import SplashScreen from '../splash/SplashScreen';

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);



    const ArrayBotones = [
        {
            id: 1,
            title: 'Tragos Random',
            onPress: () => navigation.navigate('TragosRandomScreen'),
            icon: 'bottle-wine',
        },
        {
            id: 2,
            title: 'Sorteo de Rueda',
            onPress: () => navigation.navigate('HistorialScreen'),
            icon: 'rotate-3d-variant',
        },
    ];

    if (loading) {
        return <SplashScreen />
    }


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../../assets/fondoPantalla.png')}
                style={{ flex: 1, resizeMode: 'cover' }}
            >
                <View style={{ padding: 15 }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require('../../assets/caja-regalo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>



                    <View style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        height: Dimensions.get('window').height / 2,
                    }}>
                        {ArrayBotones.map((item, index) => (
                            <Button
                                key={index}
                                title={item.title}
                                titleStyle={styleHome.title}
                                buttonStyle={styleHome.containerNaranja}
                                containerStyle={{ borderRadius: 60, marginBottom: 10 }}
                                onPress={item.onPress}
                                icon={{
                                    name: item.icon,
                                    size: 24,
                                    color: 'white',
                                    type: 'material-community',
                                }}
                            />
                        ))}
                    </View>

                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND_ANARANJADO,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        tintColor: COLOR_BACKGROUND_CARD_WHITE,
        width: 120,
        height: 130,
    },
});
