import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function InfoComponent ({ input, information }) {
    const [isHovered, setIsHovered] = useState(false);

    const onHover = () => {
        setHover(true);
    };

    const onLeave = () => {
        setHover(false);
    };

    return (
        <View>
            <Text>{input}</Text>
        </View>
    );
};

