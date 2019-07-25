import React from 'react'
import Search from './components/search'
import Navigation from './Navigation/navigation'
import Store from './Store/configureStore'
import {Provider} from 'react-redux'


export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
          <Navigation/>
      </Provider>
    )
  }
}
