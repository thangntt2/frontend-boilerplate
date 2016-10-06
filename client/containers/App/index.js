
import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    const { children, location } = this.props
    return (
      <div className={style.normal}>
        <Header
          onChangeTab={this.handleChangePath}
          path={location.pathname}
        />
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children : React.PropTypes.object,
  navigate: React.PropTypes.func.isRequired,
  location: React.PropTypes.object,
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  }
}

export default connect(mapStateToProps, {
  navigate,
})(App)
