import React, { useEffect, useRef, useState } from "react";
import { Modal, Text, View } from "react-native";
import { COLOR_BACKGROUND_ROJO, COLOR_BACKGROUND_VERDE, COLOR_WARNING, stylesModal } from "../styles/StyleGlobal";
import { Icon } from "@rneui/base";



const MessageModal = ({ message, status, statusColor }) => {


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={status}
        >
            <View style={stylesModal.centeredView}>
                <View style={[stylesModal.contentModalTextProduct, { backgroundColor: statusColor ? COLOR_BACKGROUND_VERDE : COLOR_WARNING }]}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        {statusColor ?
                            <Icon
                                name="check"
                                type="material-community"
                                size={24}
                                color={'white'}
                            /> :
                            <Icon
                                name="alert"
                                type="material-community"
                                size={24}
                                color={'white'}
                            />
                        }

                        <Text style={stylesModal.textTitleModal}>
                            {message}
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

export default MessageModal;