
import React, { PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { find } from 'lodash/collection'
import FlatButton from 'material-ui/FlatButton'
import style from './style.css'

const KeywordRow = (props) => {
  const { keyword, channel, onDeleteKeyword, ...otherProps } = props

  return (
    <TableRow {...otherProps} >
      <TableRowColumn>{keyword.keyword}</TableRowColumn>
      <TableRowColumn>{channel}</TableRowColumn>
      <TableRowColumn>
        <FlatButton secondary onClick={() => onDeleteKeyword(keyword, channel)}>
          Xóa
        </FlatButton>
      </TableRowColumn>
    </TableRow>
  )
}

KeywordRow.propTypes = {
  keyword: PropTypes.object,
  channel: PropTypes.string,
  onDeleteKeyword: PropTypes.func.isRequired,
}

const KeywordsTable = (props) => {
  const { keywords, channels, onDeleteKeyword } = props
  return (
    <div className={style.metacontentsTable}>
      <Table fixedHeader>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Keywords</TableHeaderColumn>
            <TableHeaderColumn>Kênh</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody stripedRows showRowHover>
          {keywords.map(keyword =>
            <KeywordRow
              keyword={keyword}
              key={keyword.id}
              onDeleteKeyword={onDeleteKeyword}
              channel={find(channels, ['id', keyword.ChannelId]).name}
            />
          )}
        </TableBody>
      </Table>
    </div>
  )
}

KeywordsTable.propTypes = {
  keywords: PropTypes.array,
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.icon,
    })),
  onDeleteKeyword: PropTypes.func.isRequired,
}

export default KeywordsTable

