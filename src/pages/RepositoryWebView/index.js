import React from 'react';
import WebView from 'react-native-webview';
import PropTypes from 'prop-types';

export default function RepositoryWebView({ navigation }) {
  const repository = navigation.getParam('repository');

  return <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />;
}

RepositoryWebView.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

RepositoryWebView.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').name,
});
