import React from 'react';
import { Text } from 'react-native';

export const getStars = (popularity, color, font) => {
    var stars = '';
    for (let i = 0; i < Number.parseFloat(popularity / 20).toFixed(0); i++)
        stars = stars + '☆ ';
    return (
        <Text style={{ fontSize: font, fontWeight: 'bold', color, marginTop: 20 }}>
            {stars}
        </Text>
    );
};