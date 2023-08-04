import { Dimensions, Platform, StyleSheet } from "react-native";

export const COLOR_BACKGROUND_CARD_WHITE = "#ffffff";
export const COLOR_BACKGROUND_VERDE = "#4fad48";
export const COLOR_BACKGROUND_CELESTE = "#2196F3";
export const COLOR_BACKGROUND_GRIS = "#e4e5e6";
export const COLOR_BACKGROUND_VERDER_AGUA = '#48c590';
export const COLOR_BACKGROUND_VERDE_CLARO = "#e2f7ed";
export const COLOR_BACKGROUND_ANARANJADO = "#fa9428";
export const COLOR_BACKGROUND_ANARANJADO_CLARO = "#fdc874";
export const COLOR_BACKGROUND_YELLOW = "#FFC107";
//color negro claro
export const COLOR_BACKGROUND_GRIS_OSCURO = "#333333";
export const TEXT_BLACK = "#333";

//color warning
export const COLOR_WARNING = "#e27c00";

//style de home
export const styleHome = StyleSheet.create({
    container: {
        marginTop: '2%',
    },
    contentImg: {
        height: 220,
        resizeMode: 'center',
        width: 330
    },
    contentImgView: {
        height: '100%'
    },
    containerNaranja: {
        borderRadius: 60,
        backgroundColor: COLOR_BACKGROUND_ANARANJADO_CLARO,
        height: 60,
    },
    title: {
        color: TEXT_BLACK
    },
    styleInput: {
        backgroundColor: COLOR_BACKGROUND_ANARANJADO_CLARO,
        // borderRadius: 20,
    }
});

//-----------------------stylo modal-----------------------
export const stylesModal = StyleSheet.create({
    centeredView: {
        position: 'absolute',
        bottom: 10,
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',

    },
    modalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffff',
        margin: 20,
        borderRadius: 10,
        padding: 18,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textTitleModal: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10,
        color: COLOR_BACKGROUND_CARD_WHITE,
    },
   
    contentModalTextProduct: {
        // marginTop: '5%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 15,
    },

});
