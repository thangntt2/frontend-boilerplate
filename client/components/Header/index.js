
import React, { PropTypes } from 'react'
import { AppBar } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton'
import { Tabs, Tab } from 'material-ui/Tabs'
import style from './style.css'

class HoverableTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
    }
  }

  render() {
    const { value, label, selected, ...otherProps } = this.props
    return (
      <Tab
        {...otherProps}
        onMouseEnter={() => { this.setState({ hover: true }) }}
        onMouseLeave={() => { this.setState({ hover: false }) }}
        label={this.state.hover || selected ? <strong>{label}</strong> : label}
        value={value}
        style={{ color: 'black', textTransform: 'none' }}
      />
    )
  }
}

const Header = (props) => {
  const { loggedIn, onChangeTab, path, navigate } = props
  return (
      <MuiThemeProvider>
        <AppBar
          showMenuIconButton={false}
          style={{
            backgroundColor: 'white',
            paddingLeft: '150px',
            paddingRight: '150px',
            position: 'fixed',
            display: 'flex',
          }}
          title={
            <img className={style.icon} src="https://cdn-10a6.kxcdn.com/wp-content/uploads/2015/03/logo_blk-copy.png" />
          }
          iconElementRight={loggedIn ?
            (<div>
              <Tabs
                className={style.tabbar}
                tabItemContainerStyle={{
                  backgroundColor: 'white',
                }}
                onChange={(value) => { onChangeTab(value) }}
                value={path}
              >
                <HoverableTab label="Kênh" value="/channels" contentContainerStyle={{ marginLeft: '10px', marginRight: '10px' }} />
                <HoverableTab label="Metacontent" value="/metacontents" />
                <HoverableTab label="Từ khóa" value="/keywords" />
                <FlatButton label="logout" primary={false} onClick={() => navigate('/logout')} />
              </Tabs>
            </div>)
            :
            (path !== '/login' &&
              <FlatButton label="login" primary={false} onClick={() => navigate('/login')} labelStyle={{ color: 'black' }} />
            )
          }
        >
        </AppBar>
      </MuiThemeProvider>
  )
}

Header.propTypes = {
  onChangeTab: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  path: PropTypes.string,
  loggedIn: PropTypes.bool,
}

export default Header

