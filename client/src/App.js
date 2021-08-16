import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import Payment from './pages/Payment/Payment'
import StartContestPage from './pages/StartContestPage/StartContestPage'
import Dashboard from './pages/Dashboard/Dashboard'
import PrivateHoc from './components/PrivateHoc/PrivateHoc'
import NotFound from './components/NotFound/NotFound'
import Home from './pages/Home/Home'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc'
import ContestPage from './pages/ContestPage/ContestPage'
import UserProfile from './pages/UserProfile/UserProfile'
import 'react-toastify/dist/ReactToastify.css'
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage'
import CONSTANTS from './constants'
import browserHistory from './browserHistory'
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer'
import { authActionRefresh } from './actions/actionCreator'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN)
    if (refreshToken) {
      dispatch(authActionRefresh(refreshToken))
    }
  }, [])
  return (
    <Router history={browserHistory}>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route
          exact
          path='/login'
          component={OnlyNotAuthorizedUserHoc(LoginPage)}
        />
        <Route
          exact
          path='/registration'
          component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
        />
        {/*<Route exact path='/payment' component={PrivateHoc(Payment)} />*/}
        <PrivateRoute
          roles={['customer']}
          exact
          path='/payment'
          component={Payment}
        />
        <PrivateRoute
          roles={['customer']}
          exact
          path='/startContest'
          component={StartContestPage}
        />
        <PrivateRoute
          roles={['customer']}
          exact
          path='/startContest/nameContest'
        >
          <ContestCreationPage
            contestType={CONSTANTS.NAME_CONTEST}
            title='Company Name'
          />
        </PrivateRoute>
        <PrivateRoute
          roles={['customer']}
          exact
          path='/startContest/taglineContest'
        >
          <ContestCreationPage
            contestType={CONSTANTS.TAGLINE_CONTEST}
            title='TAGLINE'
          />
        </PrivateRoute>
        <PrivateRoute
          roles={['customer']}
          exact
          path='/startContest/logoContest'
        >
          <ContestCreationPage
            contestType={CONSTANTS.LOGO_CONTEST}
            title='LOGO'
          />
        </PrivateRoute>
        <PrivateRoute roles={['customer', 'creator']} exact path='/dashboard' component={Dashboard} />
        <PrivateRoute roles={['customer', 'creator']} exact path='/contest/:id' component={ContestPage} />
        <PrivateRoute roles={['customer', 'creator']} exact path='/account' component={UserProfile} />
        <Route component={NotFound} />
      </Switch>
      <ChatContainer />
    </Router>
  )
}

export default App
