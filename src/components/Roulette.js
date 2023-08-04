import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { COLOR_BACKGROUND_ANARANJADO, COLOR_BACKGROUND_ANARANJADO_CLARO } from '../styles/StyleGlobal';
import { Button, Icon } from '@rneui/base';
import * as d3Shape from 'd3-shape';
import { G, Path, Svg, TSpan } from 'react-native-svg';
import color from 'randomcolor';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { snap } from '@popmotion/popcorn';
import { State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const whellSize = width * 0.9;
const oneTurn = 360;

const makeWheel = (item) => {
  const data = Array.from({ length: item.length }).fill(1);
  const arcs = d3Shape.pie()(data);
  const colors = color({
    luminosity: 'dark',
    count: item.length,
  })

  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01)
      .outerRadius(width / 2)
      .innerRadius(10);

    return {
      path: instance(arc),
      color: colors[index],
      value: item[index].name,
      centroid: instance.centroid(arc),
    };
  });
}


const renderSvgWheel = (items) => {
  const [winner, setWinner] = useState('');


  const arcs = makeWheel(items);
  const angleBySegment = oneTurn / items.length;
  const angleOffset = angleBySegment / 2;
  let angle = 0;

  const angleWheel = new Animated.Value(0);

  useEffect(() => {
    angleWheel.addListener((event) => {
      angle = parseInt(event.value);
      console.log('angle===', parseInt(angle));
    })
  }, [angleWheel])

  //evento para obtener el ganador
  const handleGanador = () => {
    const adjustedAngle = (angle % oneTurn + oneTurn) % oneTurn;
    return Math.floor(adjustedAngle / angleBySegment);
  }


  //agregar evento para un boton que gire la ruleta
  const handleSpin = () => {
    const randomAngle = angle - oneTurn * 2 + Math.random() * oneTurn;
    const snapTo = snap(oneTurn / items.length);
    const targetAngle = snapTo(randomAngle);

    Animated.timing(angleWheel, {
      toValue: targetAngle,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      const ganador = handleGanador();
      const winner = items[ganador].name;
      console.log('ganador', winner);
      
    });
  };




  return (
    <View>
      {winner !== '' ?
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          top: 23,
          zIndex: 2,
        }}>
          <Text style={{
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold',
          }}>
            {winner}
          </Text>
        </View>
        : null
      }


      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        top: 23,
        zIndex: 2,


      }}>
        <Icon
          name="chevron-down"
          type="material-community"
          color={'black'}
          size={50}
        />
      </View>
      <Animated.View style={{
        transform: [{
          rotate: angleWheel.interpolate({
            inputRange: [0, oneTurn],
            outputRange: ['0deg', `-${oneTurn}deg`],
          })
        }]
      }}>
        <Svg
          width={whellSize}
          height={whellSize}
          viewBox={`0 0 ${width} ${width}`}
          style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}
        >
          <G x={width / 2} y={width / 2}>
            {arcs.map((arc, index) => {
              const [x, y] = arc.centroid;
              const nameUser = arc.value.toString();


              return (
                <G key={`arc-${index}`}>
                  <Path d={arc.path} fill={arc.color} />

                  <G
                    //rotar para dejar de manera horizontal el texto
                    rotation={(index * oneTurn) / items.length + angleOffset + 90}
                    origin={`${x}, ${y}`}
                  >


                    {items.map((item, index) => {
                      return (
                        <TSpan
                          x={x}
                          y={y}
                          fill="white"
                          //agregar padding para que el texto no se vea pegado al borde
                          dx={-35}
                          textAnchor="middle"
                          fontSize="20"
                          key={`arc-${index}`}
                        >
                          {nameUser}
                        </TSpan>
                      );
                    }
                    )}
                  </G>
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View>




      <View style={{
        marginTop: 20,
      }}>
        <Button
          title={'Girar'}
          buttonStyle={{
            backgroundColor: COLOR_BACKGROUND_ANARANJADO,
            borderRadius: 10,
            marginBottom: 10,
            height: 50,
          }}
          onPress={() => { handleSpin() }}
        />
      </View>


    </View>
  );
}






const Roulette = ({ items }) => {

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: whellSize, height: whellSize }}>
        {renderSvgWheel(items)}
      </View>

    </View >
  );
};


export default Roulette;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
