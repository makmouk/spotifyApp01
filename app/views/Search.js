import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text, Platform } from "react-native";

import { searchText, getAlbums } from "../actions";
import { Input } from "../components";
import ArtistDetail from "../components/ArtistDetail";
import I18n from "../i18n/I18n";

class EmployeeList extends Component {
  renderArtists() {
    if (this.props.artist.artists)
      return this.props.artist.artists.items.map(artist => (
        <ArtistDetail
          key={artist.id}
          artist={artist}
          getAlbums={this.props.getAlbums}
        />
      ));
    return <Text></Text>;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? 60 : 0 }}>
          <Input
            placeholder={I18n.t("search")}
            value={this.props.search.value || ""}
            onChangeText={value =>
              this.props.searchText({ prop: "search", value })
            }
          />
          <ScrollView style={styles.container}>
            {this.renderArtists()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ search, fetch }) => {
  return { search: search.search, artist: fetch.artist };
};

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  }
};

export default connect(
  mapStateToProps,
  { searchText, getAlbums }
)(EmployeeList);
