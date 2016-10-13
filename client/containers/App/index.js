
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import Header from '../../components/Header'
import style from './style.css'
import { navigate } from '../../actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChangePath = this.handleChangePath.bind(this)
  }

  handleChangePath(path) {
    this.props.navigate(path)
  }

  render() {
    const { children, location, auth, success, error } = this.props
    const loggedIn = auth.access_token && auth.expires_on > new Date().getTime()
    return (
      <div className={style.normal}>
        <Header
          onChangeTab={this.handleChangePath}
          path={location.pathname}
          loggedIn={loggedIn}
        />
        {success && success.length > 0 &&
          <Alert className={style.fixAlert} bsStyle="success">
            {success}
          </Alert>
        }
        {error && error.length > 0 &&
          <Alert className={style.fixAlert} bsStyle="danger">
            {error}
          </Alert>
        }
        <div className={style.children}>
          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  navigate: React.PropTypes.func.isRequired,
  location: React.PropTypes.object,
  auth: React.PropTypes.object,
  success: React.PropTypes.string,
  error: React.PropTypes.string,
}

function mapStateToProps(state) {
  const { auth } = state
  const { message: { success, error } } = state
  return {
    auth,
    success,
    error,
  }
}

export default connect(mapStateToProps, {
  navigate,
})(App)
