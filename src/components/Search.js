import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { searchText } from '../actions';
import { Input } from './common'

class EmployeeList extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Search for an artist…"
          value={this.props.search}
          onChangeText={value => this.props.searchText({ prop: 'search', value })}
        />
      </View>
    );
  }
}

const mapStateToProps = ({search}) => {
  return { search };
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
};

export default connect(mapStateToProps, { searchText })(EmployeeList);
