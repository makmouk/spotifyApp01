import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Card, CardSection, getStars } from ".";
import I18n from "../i18n/I18n";

export const profileImage = images => {
  if (images[0])
    return (
      <CardSection>
        <Image style={styles.imageStyle} source={{ uri: images[0].url }} />
      </CardSection>
    );
  return <Text>no Image</Text>;
};
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
          <View style={thumbnailStyleContainer}></View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{name}</Text>
            <Text>{followers.total + " " + I18n.t("followers")}</Text>
            {getStars(popularity, "gold", 24)}
          </View>
        </CardSection>
      </Card>
    </TouchableOpacity>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  headerTextStyle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  thumbnailStyleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default ArtistDetail;
