import React from "react";
import {Image, View} from "react-native";
import {Images} from "../systems/Images";


export const Pipe = (props) => {
    const width = props.body.bounds.max.x - props.body.bounds.min.x
    const height = props.body.bounds.max.y - props.body.bounds.min.y
    const x = props.body.position.x - width / 2
    const y = props.body.position.y - height / 2


    const pipeRatio = 160 / width;
    const pipeHeight = 33 * pipeRatio;
    const pipeIterations = Math.ceil(height / pipeHeight)

    return (
        <Image
            source={Images.pipeCore}
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: width,
                height: height,
                // transform: [{rotate: rotation}]
            }}
        />
        // <View
        //     style={{
        //         position: 'absolute',
        //         top: y,
        //         left: x,
        //         width: width,
        //         height: height,
        //         overflow: 'hidden',
        //         flexDirection: 'column'
        //     }}
        // >
        //     {Array.apply(null, Array(pipeIterations)).map((el, idx) => {
        //         return <Image
        //             key={idx}
        //             resizeMode={"stretch"}
        //             source={Images.pipeCore}
        //             style={{
        //                 width: width,
        //                 height: pipeHeight
        //             }}
        //         />
        //     })}
        // </View>
    )
}