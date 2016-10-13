
import React, { PropTypes } from 'react'
import { Table, Button } from 'react-bootstrap'
import { find } from 'lodash/collection'
import style from './style.css'

const KeywordRow = (props) => {
  const { keyword, channel, onDeleteKeyword } = props

  return (
    <tr>
      <td>{keyword.keyword}</td>
      <td>{channel}</td>
      <td>
        <Button bsStyle="danger" onClick={() => onDeleteKeyword(keyword, channel)}>
          Xóa
        </Button>
      </td>
    </tr>
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
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Kênh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map(keyword => (
            <KeywordRow
              keyword={keyword}
              channel={find(channels, ['id', keyword.ChannelId]).name}
              key={keyword.id}
              onDeleteKeyword={onDeleteKeyword}
            />
          ))}
        </tbody>
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

