
import React, { PropTypes } from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { FlatButton } from 'material-ui'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import globalstyle from '../../style/style.css'
import UsersTable from './usersTable'
import NewsProvidersTable from './newsprovidersTable'
import style from './style.css'


const recentsIcon = <FontIcon className="material-icons">account_box</FontIcon>
const favoritesIcon = <FontIcon className="material-icons">description</FontIcon>

const Users = (props) => {
  const { users, onCreateUser, onDeleteUser, newsp, selectedbtm, onchangebtm, onCreateNewsp, onDeleteNewsp } = props
  return (
    <div>
      <Paper className={globalstyle.centerbody}>
        { selectedbtm === 0 &&
          <div>
            <Toolbar
              style={{
                backgroundColor: 'white',
              }}
            >
              <ToolbarGroup>
                <ToolbarTitle text="DANH SÁCH USER CỦA HỆ THỐNG" />
              </ToolbarGroup>
              <ToolbarGroup>
                <FlatButton
                  label="Tạo"
                  primary
                  icon={<FontIcon className="material-icons">add</FontIcon>}
                  onClick={onCreateUser}
                />
              </ToolbarGroup>
            </Toolbar>
            <UsersTable
              users={users}
              onDeleteUser={onDeleteUser}
            />
          </div>
        }
        { selectedbtm === 1 && newsp &&
          <div>
            <Toolbar
              style={{
                backgroundColor: 'white',
              }}
            >
              <ToolbarGroup>
                <ToolbarTitle text="DANH SÁCH BÁO ĐANG DÙNG" />
              </ToolbarGroup>
              <ToolbarGroup>
                <FlatButton
                  label="Tạo"
                  primary
                  icon={<FontIcon className="material-icons">add</FontIcon>}
                  onClick={onCreateNewsp}
                />
              </ToolbarGroup>
            </Toolbar>
            <NewsProvidersTable
              newsproviders={newsp}
              onDeleteNewsp={onDeleteNewsp}
            />
          </div>
        }
      </Paper>
      <div className={style.bottomnav} >
        <BottomNavigation selectedIndex={selectedbtm}>
          <BottomNavigationItem
            label="Users"
            icon={recentsIcon}
            onTouchTap={() => { onchangebtm(0) }}
          />
          <BottomNavigationItem
            label="Danh sách báo"
            icon={favoritesIcon}
            onTouchTap={() => { onchangebtm(1) }}
          />
        </BottomNavigation>
      </div>
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array,
  newsp: PropTypes.array,
  onCreateUser: PropTypes.func.isRequired,
  onDeleteNewsp: PropTypes.func.isRequired,
  onCreateNewsp: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  selectedbtm: PropTypes.number,
  onchangebtm: PropTypes.func.isRequired,
}

export default Users
