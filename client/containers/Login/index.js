
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap'
import { connect } from 'react-redux'
import Button from 'react-bootstrap-button-loader'
import { loginRequest, navigate } from '../../actions'
import style from './style.css'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentWillMount() {
    if (this.props.access_token && this.props.expires_on > new Date().getTime()) {
      this.props.navigate('/')
    }
  }

  handleLogin() {
    const email = ReactDOM.findDOMNode(this.email).value
    const password = ReactDOM.findDOMNode(this.password).value
    this.props.loginRequest(email, password)
  }

  render() {
    const { error, submitting } = this.props
    const message = error && error.text
    return (
      <div className={style.centerbody} >
        {message &&
          <div className="alert alert-danger fade in">
            <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
            {message}
          </div>
        }
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" ref={(ref) => { this.email = ref }} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" ref={(ref) => { this.password = ref }} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button onClick={this.handleLogin} loading={submitting}>
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

LoginContainer.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  error: PropTypes.object,
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
