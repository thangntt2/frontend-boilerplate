
import React, { PropTypes } from 'react'
import { AppBar } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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
                      className={style.button}
                      onClick={() => navigate(route.link)}
                      style={path === route.link ? { color: '#0070D3' } : {}}
                    >
                      {route.name}
                    </button>
                  </li>
                ))
              }
              <li>
                <button
                  className={style.buttonLog}
                  onClick={() => navigate('/logout')}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>)
          :
          (path !== '/login' &&
            <button
              className={style.buttonLog}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
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

