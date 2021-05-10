import './styles/App.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './reduxAppStore/store'
import InfoContacts from './components/infoContacts/InfoContacts'
import SectionMenu from './components/sectionMenu/SectionMenu'
import AdvertBlock from './components/advert/AdvertBlock'
import AdvertPage from './components/advert/advertPage/AdvertPage'

function App() {
  return (
    <div className="App-wrapper">
      <Provider store={store}>
        <InfoContacts />
        <Router>
          <Switch>
            <Route path="/advert/:advertId">
              <AdvertPage />
            </Route>
            <Route path="/">
              <SectionMenu />
              <AdvertBlock />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

export default App
