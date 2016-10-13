
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logoutRequire, navigate } from '../../actions'

class DummyLogoutContainer extends Component {
  componentWillMount = () => {
    this.props.logoutRequire()
    this.props.navigate('/login')
  }

  render = () => (
    <div />
  )
}

DummyLogoutContainer.propTypes = {
  logoutRequire: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
}

const mapStateToProp = () => {}

export default connect(mapStateToProp, {
  logoutRequire,
  navigate,
})(DummyLogoutContainer)
