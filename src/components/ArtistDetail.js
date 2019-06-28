import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, CardSection } from './common';


export const getStars = (popularity) => {
    var stars = '';
    for (let i = 0; i < Number.parseFloat(popularity / 20).toFixed(0); i++)
        stars = stars + '☆ ';
    return (<Text style={styles.starStyle}>{stars}</Text>);
}
export const profileImage = (images) => {
    if (images[0])
        return (<CardSection>
            <Image
                style={styles.imageStyle}
                source={{ uri: images[0].url }}
            />
        </CardSection>);
    return (<Text>no Image</Text>);
}
const ArtistDetail = ({ artist, getAlbums }) => {
    const { name, followers, images, popularity, id } = artist;
    const {
        headerContentStyle,
        thumbnailStyleContainer,
        headerTextStyle
    } = styles;



    return (
        <TouchableOpacity onPress={() => getAlbums(id, name)} activeOpacity={0.7}>
            <Card>
                {profileImage(images)}
                <CardSection>
                    <View style={thumbnailStyleContainer}>
                    </View>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>{name}</Text>
                        <Text>{followers.total + " followers"}</Text>
                        {getStars(popularity)}
                    </View>

                </CardSection>
            </Card>
        </TouchableOpacity>
    );
};

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    thumbnailStyleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    },
    starStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gold',
        marginTop: 20
    }
};

export default ArtistDetail;
