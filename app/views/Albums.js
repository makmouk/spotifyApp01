import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, View } from "react-native";
import AlbumDetail from "../components/AlbumDetail";
import I18n from "../i18n/I18n";

class Albums extends Component {
  renderArtists() {
    if (this.props.album) {
      return this.props.album.map(album => (
        <AlbumDetail key={album.id} album={album} />
      ));
    }
  }
  renderName() {
    if (this.props.album)
      return <Text style={styles.headerStyle}>{this.props.name}</Text>;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {this.renderName()}
        <Text style={{ marginLeft: 5 }}>{I18n.t("albums")}</Text>
        <ScrollView style={styles.container}>{this.renderArtists()}</ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ fetch }) => {
  return { album: fetch.album, name: fetch.name };
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  headerStyle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 5
  }
};

export default connect(mapStateToProps)(Albums);
