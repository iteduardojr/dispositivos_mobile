import React from "react";
import { Text } from "react-native";

export default function MinMax(props) {
    const { min, max } = props;

    const maxValue = Math.max(min, max)

    return (
        <Text>O valor máximo é: {maxValue}</Text>
    );
}