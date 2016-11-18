
import React, { PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import style from './style.css'

const UserRow = (props) => {
  const { user, onDeleteUser, ...otherProps } = props

  return (
    <TableRow {...otherProps} >
      <TableRowColumn>{user.username}</TableRowColumn>
      <TableRowColumn>{user.name}</TableRowColumn>
      <TableRowColumn>{user.level}</TableRowColumn>
      <TableRowColumn>{user.image}</TableRowColumn>
      <TableRowColumn>
        <FlatButton secondary onClick={() => onDeleteUser(user)}>
          Xóa
        </FlatButton>
      </TableRowColumn>
    </TableRow>
  )
}

UserRow.propTypes = {
  user: PropTypes.object,
  onDeleteUser: PropTypes.func.isRequired,
}

const UsersTable = (props) => {
  const { users, onDeleteUser } = props
  return (
    <div className={style.metacontentsTable}>
      <Table fixedHeader>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Tên đăng nhập</TableHeaderColumn>
            <TableHeaderColumn>Tên người dùng</TableHeaderColumn>
            <TableHeaderColumn>Quyền người dùng</TableHeaderColumn>
            <TableHeaderColumn>Ảnh đại diện</TableHeaderColumn>
            <TableHeaderColumn>Thao tác</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody stripedRows showRowHover>
          {users.map(user =>
            <UserRow
              user={user}
              key={user.username}
              onDeleteUser={onDeleteUser}
            />
          )}
        </TableBody>
      </Table>
    </div>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array,
  onDeleteUser: PropTypes.func.isRequired,
}

export default UsersTable

