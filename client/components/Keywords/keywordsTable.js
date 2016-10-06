
import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import { find } from 'lodash/collection'
import style from './style.css'

const KeywordRow = (props) => {
  const { keyword, channel } = props

  return (
    <tr>
      <td>{keyword}</td>
      <td>{channel}</td>
    </tr>
  )
}

KeywordRow.propTypes = {
  keyword: PropTypes.string,
  channel: PropTypes.string,
}

const KeywordsTable = (props) => {
  const { keywords, channels } = props
  return (
    <div className={style.metacontentsTable}>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Kênh</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map(keyword => (
            <KeywordRow
              keyword={keyword.keyword}
              channel={find(channels, ['id', keyword.ChannelId]).name}
              key={keyword.id}
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
}

export default KeywordsTable

