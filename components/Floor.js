import React from "react";
import {Image, View} from "react-native";
import {Images} from "../systems/Images";


export const Floor = (props) => {
    const width = props.body.bounds.max.x - props.body.bounds.min.x
    const height = props.body.bounds.max.y - props.body.bounds.min.y
    const x = props.body.position.x - width / 2
    const y = props.body.position.y - height / 2

    const imageIntegrations = Math.ceil(width / height)



    return (
        <View
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: width,
                height: height,
                overflow: 'hidden',
                flexDirection: 'row'
            }}
        >
            {Array.apply(null, Array(imageIntegrations)).map((el, idx) => {
                return <Image
                    key={idx}
                    resizeMode={"stretch"}
                    source={Images.floor}
                    style={{
                        // width: height,
                        // height: height
                    }}
                />
            })}
        </View>
    )
}