import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import LoadDataScreen from './screens/LoadDataScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ReportsScreen from './screens/ReportsScreen'
import PlayerStatScreen from './screens/PlayerStatScreen'
import TeamStatScreen from './screens/TeamStatScreen'
import TwoPlayersStatScreen from './screens/TwoPlayersStatScreen'
import TrainersScreen from './screens/admin/TrainersScreen'
import TrainerScreen from './screens/admin/TrainerScreen'
import PlayersScreen from './screens/admin/PlayersScreen'
import TeamsScreen from './screens/admin/TeamsScreen'
import TeamScreen from './screens/admin/TeamScreen'

import Header from './components/Header'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/admin/teams' element={<TeamsScreen />} />
          <Route path='/admin/team/:klubId' element={<TeamScreen />} />
          <Route path='/admin/trainers' element={<TrainersScreen />} />
          <Route path='/admin/trainer/:trainerId' element={<TrainerScreen />} />
          <Route exact path='/admin/players' element={<PlayersScreen />} />
          <Route path='/loaddata' element={<LoadDataScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/reports' element={<ReportsScreen />} />
          <Route path='/playerstat' element={<PlayerStatScreen />} />
          <Route path='/teamstat' element={<TeamStatScreen />} />
          <Route path='/twoplayersstat' element={<TwoPlayersStatScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
