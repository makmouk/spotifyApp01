import React from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { Card, CardSection } from './common';



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
export const artistName = (album) => {
  return album.artists.map(artist => <Text key={artist.name} style={{ marginLeft: 5 }}>{artist.name}</Text>)
}

const AlbumDetail = ({ album }) => {
  const { name, images, external_urls, release_date, total_tracks } = album;
  const {
    headerContentStyle,
    headerTextStyle,
    buttonTextStyle
  } = styles;



  return (
    <Card>
      {profileImage(images)}
      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{name}</Text>
          {artistName(album)}
          <Text style={{ marginLeft: 5, marginTop: 20 }}>{release_date}</Text>
          <Text style={{ marginLeft: 5, marginBottom: 5 }}>{total_tracks} Tracks</Text>
        </View>
      </CardSection>
      <CardSection>
        <TouchableOpacity onPress={() => Linking.openURL(external_urls.spotify)} style={{ flex: 1 }} activeOpacity={0.7}>
          <Text style={buttonTextStyle}>Preview on Spotify</Text>
        </TouchableOpacity>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5
  },
  imageStyle: {
    height: 350,
    flex: 1,
    width: null
  },
  buttonTextStyle: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
};

export default AlbumDetail;