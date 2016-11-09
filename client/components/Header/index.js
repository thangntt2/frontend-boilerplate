
import React, { PropTypes } from 'react'
import { AppBar } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton'
import style from './style.css'

const Header = (props) => {
  const { loggedIn, path, navigate, listRoute } = props
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
            <ul className={style.listRoute}>
              {listRoute &&
                listRoute.map(route => (
                  <li key={route.link}>
                    <button
                      onClick={() => navigate(route.link)}
                      style={path === route.link ? { color: '#0070D3' } : {}}
                    >
                      {route.name}
                    </button>
                  </li>
                ))
              }
            </ul>
          </div>)
          :
          (path !== '/login' &&
            <FlatButton label="login" primary={false} onClick={() => navigate('/login')} labelStyle={{ color: 'black' }} />
          )
        }
      />
    </MuiThemeProvider>
  )
}

Header.propTypes = {
  navigate: PropTypes.func.isRequired,
  path: PropTypes.string,
  loggedIn: PropTypes.bool,
  listRoute: PropTypes.array,
}

export default Header

