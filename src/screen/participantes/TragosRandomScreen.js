import React, { useEffect, useState } from 'react';
import { Tab, Text, TabView, Input } from '@rneui/themed';
import { Button, Card, Icon, ListItem } from '@rneui/base';
import { COLOR_BACKGROUND_ANARANJADO, COLOR_BACKGROUND_ANARANJADO_CLARO, TEXT_BLACK, styleHome } from '../../styles/StyleGlobal';
import { ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import Roulette from '../../components/Roulette';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsers } from '../../redux/actions/action';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TragosRandomScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [items, setItems] = useState([]);

    const dispatch = useDispatch();

    //usar useSelector
    const stateRefresApi = useSelector((state) => state.refreshApi);
    const stateUsers = useSelector((state) => state.users);

    //obtener los participantes del react-native-async-storage/async-storage y guardarlos en el estado global
    useEffect(() => {
        AsyncStorage.getItem('users').then((value) => {
            if (value !== null) {
                dispatch(getUsers(JSON.parse(value)));
                setItems(JSON.parse(value));
            }
        }
        );
    }, [stateRefresApi]);




    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: TEXT_BLACK,
                    height: 3,
                }}
                buttonStyle={{
                    backgroundColor: COLOR_BACKGROUND_ANARANJADO,
                }}
                titleStyle={{
                    fontSize: 120,
                }}
                variant='primary'

            >
                <Tab.Item
                    title="Iniciar Sorteo"
                    titleStyle={{ fontSize: 12 }}
                    icon={
                        <Icon
                            // name="format-list-bulleted"
                            //icono de sorteo
                            name="format-list-numbered"
                            type="material-community"
                            size={24}
                            color={'white'}
                        />
                    }
                />


                <Tab.Item
                    title="Agregar"
                    titleStyle={{ fontSize: 12 }}
                    icon={
                        <Icon
                            name="account"
                            type="material-community"
                            size={24}
                            color={'white'}
                        />
                    }
                />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%' }}>
                    <ImageBackground
                        source={require('../../assets/fondoPantalla.png')}
                        style={{ flex: 1, resizeMode: 'cover' }}
                        imageStyle={{ opacity: 0.2 }}
                    >
                        {items.length > 0 ?
                                <Roulette items={items} />
                            :
                            <Text style={{ textAlign: 'center', color: TEXT_BLACK, fontSize: 25 }}>No hay participantes</Text>
                        }
                    </ImageBackground>
                </TabView.Item>


                <TabView.Item style={{ width: '100%' }}>
                    <ImageBackground
                        source={require('../../assets/fondoPantalla.png')}
                        style={{ flex: 1, resizeMode: 'cover' }}
                        imageStyle={{ opacity: 0.2 }}
                    >
                        <>
                            <ListItem
                                containerStyle={{ borderBottomWidth: 1, borderBottomColor: COLOR_BACKGROUND_ANARANJADO_CLARO }}
                                onPress={() => navigation.navigate('ParticipantesScreen')}
                            >
                                <Icon name="account" type="material-community" color={COLOR_BACKGROUND_ANARANJADO_CLARO} />
                                <ListItem.Content>
                                    <ListItem.Title>
                                        Participantes
                                    </ListItem.Title>
                                    <ListItem.Subtitle>
                                        ({stateUsers.length})
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                                <Icon name="check" type="material-community" color={stateUsers.length > 0 ? 'green' : 'grey'} />

                                <ListItem.Chevron color={COLOR_BACKGROUND_ANARANJADO_CLARO} />
                            </ListItem>

                            <ListItem>
                                <Icon name="bottle-wine" type="material-community" color={COLOR_BACKGROUND_ANARANJADO_CLARO} />
                                <ListItem.Content>
                                    <ListItem.Title>
                                        Tragos
                                    </ListItem.Title>
                                    <ListItem.Subtitle>
                                        (0)
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                                <Icon name="check" type="material-community" color="grey" />

                                <ListItem.Chevron color={COLOR_BACKGROUND_ANARANJADO_CLARO} />
                            </ListItem>
                        </>




                    </ImageBackground>
                </TabView.Item>
            </TabView>
        </>
    );
};

export default TragosRandomScreen;