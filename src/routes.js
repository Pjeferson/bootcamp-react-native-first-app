import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import RepositoryWebView from './pages/RepositoryWebView';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      RepositoryWebView,
    },
    {
      defaultNavigationOptions: {
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#7159c1',
        },
      },
    }
  )
);
export default Routes;
