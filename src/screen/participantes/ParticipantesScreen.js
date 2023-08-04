import React, { useEffect, useState } from 'react';
import { Tab, Text, TabView, Input } from '@rneui/themed';
import { Button, Card, Icon } from '@rneui/base';
import { COLOR_BACKGROUND_ANARANJADO, COLOR_BACKGROUND_ANARANJADO_CLARO, TEXT_BLACK, styleHome } from '../../styles/StyleGlobal';
import { ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import MessageModal from '../../components/MessageModal';
import { useDispatch } from 'react-redux';
import { getUsers, refreshApi } from '../../redux/actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ParticipantesScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [userAdd, setUserAdd] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(false);
    const [statusColor, setStatusColor] = useState(false);
    const [guardarParticipantes, setGuardarParticipantes] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status) {
            setTimeout(() => {
                setStatus(false);
            }, 2000);
        }
    }, [status])

    //obtener los participantes del react-native-async-storage/async-storage y guardarlos en el estado global
    useEffect(() => {
        AsyncStorage.getItem('users').then((value) => {
            if (value !== null) {
                dispatch(getUsers(JSON.parse(value)));
                console.log('users', JSON.parse(value));

                //guardar en state
                setGuardarParticipantes(JSON.parse(value));
            }
        }
        );
    }, []);

    const handleAddItem = (item) => {
        setUserAdd(item);
      
    }

    const handleDeleteItem = (item) => {
        setItems(items.filter((i) => i !== item));

        //eliminar el item del array y agregarlo al array de guardarParticipantes
        setGuardarParticipantes(guardarParticipantes.filter((i) => i !== item));

        //guardar en el async-storage
        AsyncStorage.setItem('users', JSON.stringify(guardarParticipantes.filter((i) => i !== item)));
        dispatch(refreshApi());
        dispatch
    }

    const handleDeleteItemGuardar = (item) => {
        setGuardarParticipantes(guardarParticipantes.filter((i) => i !== item));

        //guardar en el async-storage
        AsyncStorage.setItem('users', JSON.stringify(guardarParticipantes.filter((i) => i !== item)));
        dispatch(refreshApi(true));
        dispatch(getUsers(guardarParticipantes.filter((i) => i !== item)));
    }

    const handleAddUser = () => {
        //crear un array de objetos
        if (userAdd === '' || userAdd.trim() === '') {
            setMessage('El campo no puede estar vacio');
            setStatus(true);
            setStatusColor(false);
        } else if (items.find((i) => i.name === userAdd)) {
            console.log('ya existe');
            setMessage('El usuario ya existe');
            setStatus(true);
            setStatusColor(false);

        } else {
            setItems([...items, { name: userAdd }]);
            setUserAdd('');

            //guardar en el estado global y en el localStorge
            dispatch(getUsers([...items, { name: userAdd }]));
            AsyncStorage.setItem('users', JSON.stringify([...items, { name: userAdd }]));
            dispatch(refreshApi(true));
        }
    }

    const handleGuardarParticipantes = () => {
        // setGuardarParticipantes(items);
        setGuardarParticipantes([...guardarParticipantes, ...items]);
        setItems([]);
        setUserAdd('');

        //guardar en el estado global y en el localStorge
        dispatch(getUsers([...guardarParticipantes, ...items]));
        AsyncStorage.setItem('users', JSON.stringify([...guardarParticipantes, ...items]));
        dispatch(refreshApi(true));

    }

    console.log('guardarParticipantes', guardarParticipantes);

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
                    title="Participantes"
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

                <Tab.Item
                    title="Listado de Participantes"
                    titleStyle={{ fontSize: 12 }}
                    icon={
                        <Icon
                            name="format-list-bulleted"
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
                        <ScrollView>
                            <Card containerStyle={{ borderRadius: 15 }}>
                                <Input
                                    placeholder="Nombre o Apodo"
                                    variant="filled"
                                    onChangeText={(text) => handleAddItem(text)}
                                    value={userAdd}
                                />

                                <Button
                                    title={'Agregar'}
                                    buttonStyle={{
                                        backgroundColor: COLOR_BACKGROUND_ANARANJADO,
                                        borderRadius: 10,
                                        marginBottom: 10,
                                    }}
                                    onPress={() => { handleAddUser() }}
                                />

                                {items.length > 1 && (
                                    <Button
                                        title={'Guardar Participantes'}
                                        buttonStyle={{
                                            backgroundColor: '#d6fef1',
                                            borderRadius: 10,
                                            marginBottom: 10,
                                        }}
                                        titleStyle={{ color: '#389390' }}
                                        onPress={() => { handleGuardarParticipantes() }}
                                    />
                                )}

                                {items.length > 0 && (
                                    <Card.FeaturedSubtitle style={{ color: TEXT_BLACK }}>
                                        {items.length} Participantes
                                    </Card.FeaturedSubtitle>
                                )}

                            </Card>

                            {items.length > 0 && (
                                <Text style={{ color: TEXT_BLACK, fontSize: 20, marginTop: 25, alignSelf: 'center' }}>Lista de Participantes</Text>
                            )}

                            {items.length > 0 && (
                                items.map((item, index) => (
                                    <Card key={index} containerStyle={{
                                        borderRadius: 15,
                                        backgroundColor: COLOR_BACKGROUND_ANARANJADO_CLARO,
                                        marginBottom: 10,
                                    }}
                                        wrapperStyle={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            padding: 10,
                                            width: '100%'
                                        }}
                                    >
                                        <Card.FeaturedTitle style={{ color: TEXT_BLACK, fontSize: 20 }}>{item.name}</Card.FeaturedTitle>
                                        <TouchableOpacity onPress={() => { handleDeleteItem(item) }}>
                                            <Icon name="delete" type="material-community"
                                                color={COLOR_BACKGROUND_ANARANJADO}
                                            />
                                        </TouchableOpacity>
                                    </Card>
                                ))
                            )}


                        </ScrollView>


                    </ImageBackground>
                </TabView.Item>


                <TabView.Item style={{ width: '100%' }}>
                    <ImageBackground
                        source={require('../../assets/fondoPantalla.png')}
                        style={{ flex: 1, resizeMode: 'cover' }}
                    >
                        <ScrollView>
                            {guardarParticipantes.length === 0 && (
                                <Text style={{ color: TEXT_BLACK, fontSize: 20, marginTop: 25, alignSelf: 'center' }}>
                                    No hay Participantes
                                </Text>
                            )}


                            {guardarParticipantes.length > 0 && (
                                <Text style={{ color: TEXT_BLACK, fontSize: 20, marginTop: 25, alignSelf: 'center' }}>Cantidad de Participantes: {guardarParticipantes.length}</Text>
                            )}

                            {guardarParticipantes.length > 0 && (
                                guardarParticipantes.map((item, index) => (
                                    <Card key={index} containerStyle={{
                                        borderRadius: 15,
                                        backgroundColor: COLOR_BACKGROUND_ANARANJADO_CLARO,
                                        marginBottom: 10,
                                    }}
                                        wrapperStyle={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            padding: 10,
                                            width: '100%'
                                        }}
                                    >
                                        <Card.FeaturedTitle style={{ color: TEXT_BLACK, fontSize: 20 }}>{item.name}</Card.FeaturedTitle>

                                        <TouchableOpacity onPress={() => { handleDeleteItemGuardar(item) }}>
                                            <Icon name="delete" type="material-community"
                                                color={COLOR_BACKGROUND_ANARANJADO}
                                            />
                                        </TouchableOpacity>
                                    </Card>
                                ))
                            )}
                        </ScrollView>
                    </ImageBackground>
                </TabView.Item>
            </TabView>

            <MessageModal
                status={status}
                message={message}
                statusColor={statusColor}
            />
        </>
    );
};

export default ParticipantesScreen;