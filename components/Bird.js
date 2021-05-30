import React, {useEffect} from "react";
import {Animated, Image, View} from "react-native";
import {Images} from "../systems/Images";
import {NoFlickerImage} from "react-native-no-flicker-image";


export const Bird = (props) => {

    const animatedValue = new Animated.Value(props.body.velocity.y);


    const width = props.body.bounds.max.x - props.body.bounds.min.x
    const height = props.body.bounds.max.y - props.body.bounds.min.y
    const x = props.body.position.x - width / 2
    const y = props.body.position.y - height / 2


    let image = Images['bird' + props.pose]

    // useEffect(() => {


    animatedValue.setValue(props.body.velocity.y)
    let rotation = animatedValue.interpolate({
        inputRange: [-10, 0, 10, 20],
        outputRange: ['-20deg', '0deg', '15deg', '45deg'],
        extrapolate: 'clamp'
    })

    // }, [])

    return (
        <Animated.Image
            source={image}
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: width,
                height: 35,
                transform: [{rotate: rotation}]
            }}
        />
    )
}