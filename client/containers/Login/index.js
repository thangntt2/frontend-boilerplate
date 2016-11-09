
import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { loginRequest, navigate } from '../../actions'
import style from './style.css'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
      username: '',
      password: '',
    }
  }

  componentWillMount() {
    if (this.props.access_token && this.props.expires_on > new Date().getTime()) {
      this.props.navigate('/')
    }
  }

  handleLogin() {
    this.props.loginRequest(this.state.username, this.state.password)
  }

  render() {
    const { submitting } = this.props
    return (
      <Paper className={style.centerbody} >
        <TextField
          hintText="thangntt@hotmail.com"
          floatingLabelText="Email"
          floatingLabelFixed
          value={this.state.username}
          onChange={(event) => { this.setState({ username: event.target.value }) }}
          autoFocus
          onKeyPress={this.handleEnterPress}
          fullWidth
        />
        <TextField
          floatingLabelText="Mật khẩu"
          floatingLabelFixed
          value={this.state.password}
          onChange={(event) => { this.setState({ password: event.target.value }) }}
          onKeyPress={this.handleEnterPress}
          fullWidth
          type="password"
        />
        <RaisedButton
          label={submitting ? 'Đăng nhập...' : 'Đăng nhập'}
          primary
          disabled={submitting}
          onClick={this.handleLogin}
        />
      </Paper>
    )
  }
}

LoginContainer.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  access_token: PropTypes.string,
  expires_on: PropTypes.number,
  navigate: PropTypes.func.isRequired,
}

function mapStateToProp(state) {
  const { errorMessage } = state
  const { auth: { access_token, expires_on, submitting } } = state
  return {
    error: errorMessage,
    access_token,
    expires_on,
    submitting,
  }
}

export default connect(mapStateToProp, {
  loginRequest,
  navigate,
})(LoginContainer)
