import React from "react";
import {Animated, Image, View} from "react-native";
import {Images} from "../systems/Images";
import {NoFlickerImage} from "react-native-no-flicker-image";


export const PipeTop = (props) => {

    const width = props.body.bounds.max.x - props.body.bounds.min.x
    const height = props.body.bounds.max.y - props.body.bounds.min.y
    const x = props.body.position.x - width / 2
    const y = props.body.position.y - height / 2


    return (
        <Image
            source={Images.pipeTop}
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: width,
                height: height,
            }}
        />
    )
}