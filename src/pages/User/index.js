import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator } from 'react-native';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  constructor() {
    super();

    this.state = {
      stars: [],
      page: 1,
      loading: false,
      refreshing: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const { page } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    this.setState({
      stars: response.data,
      loading: false,
    });
  }

  getStars = async () => {
    const { page, stars } = this.state;

    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    this.setState({
      stars: [...stars, ...response.data],
      refreshing: false,
    });
  };

  loadMore = () => {
    const { page } = this.state;

    this.setState(
      {
        page: page + 1,
      },
      this.getStars
    );
  };

  refreshList = () => {
    this.setState(
      {
        stars: [],
        page: 1,
        refreshing: true,
      },
      this.getStars
    );
  };

  handleRepositoryAccess = repository => {
    const { navigation } = this.props;

    navigation.navigate('RepositoryWebView', { repository });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <Loading>
            <ActivityIndicator color="#5179c1" />
          </Loading>
        ) : (
          <Stars
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleRepositoryAccess(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
