
import React, { PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import style from './style.css'

const NewsProviderRow = (props) => {
  const { newsp, onDeleteNewsp, ...otherProps } = props

  return (
    <TableRow {...otherProps} >
      <TableRowColumn>{newsp.name}</TableRowColumn>
      <TableRowColumn>{newsp.baseurl}</TableRowColumn>
      <TableRowColumn>
        <FlatButton secondary onClick={() => onDeleteNewsp(newsp)}>
          Xóa
        </FlatButton>
      </TableRowColumn>
    </TableRow>
  )
}

NewsProviderRow.propTypes = {
  newsp: PropTypes.object,
  onDeleteNewsp: PropTypes.func.isRequired,
}

const NewsProvidersTable = (props) => {
  const { newsproviders, onDeleteNewsp } = props
  return (
    <div className={style.metacontentsTable}>
      <Table fixedHeader>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Tên báo</TableHeaderColumn>
            <TableHeaderColumn>Địa chỉ</TableHeaderColumn>
            <TableHeaderColumn>Thao tác</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody stripedRows showRowHover>
          {newsproviders.map(newsp =>
            <NewsProviderRow
              newsp={newsp}
              onDeleteNewsp={onDeleteNewsp}
              key={newsp.name}
            />
          )}
        </TableBody>
      </Table>
    </div>
  )
}

NewsProvidersTable.propTypes = {
  newsproviders: PropTypes.array,
  onDeleteNewsp: PropTypes.func.isRequired,
}

export default NewsProvidersTable

