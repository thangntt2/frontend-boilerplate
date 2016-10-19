
import React, { PropTypes } from 'react'
import { AppBar } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Tabs, Tab } from 'material-ui/Tabs'
import style from './style.css'

const Header = (props) => {
  const { loggedIn, onChangeTab, path } = props
  return (
      <MuiThemeProvider>
        <div>
          <AppBar
            showMenuIconButton={false}
            style={{
              backgroundColor: 'white',
              paddingLeft: '20px',
              paddingRight: '150px',
              position: 'fixed',
              display: 'flex',
            }}
            title={
              <img className={style.icon} src="https://cdn-10a6.kxcdn.com/wp-content/uploads/2015/03/logo_blk-copy.png" />
            }
          >
            <Tabs
              className={style.tabbar}
              tabItemContainerStyle={{
                backgroundColor: 'white',
              }}
              onChange={(value) => { onChangeTab(value) }}
              value={path}
            >
              <Tab label="Kênh" value="/channels" style={{ color: 'black', textTransform: 'none' }} />
              <Tab label="Metacontent" value="/metacontents" style={{ color: 'black', textTransform: 'none' }} />
              <Tab label="Từ khóa" value="/keywords" style={{ color: 'black', textTransform: 'none' }} />
            </Tabs>
          </AppBar>
        </div>
      </MuiThemeProvider>
  )
}

Header.propTypes = {
  onChangeTab: PropTypes.func.isRequired,
  path: PropTypes.string,
  loggedIn: PropTypes.bool,
}

export default Header

