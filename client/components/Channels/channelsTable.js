
import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import style from './style.css'


const ChannelItem = (props) => {
  const { channel } = props
  return (
    <tr>
      <td>{channel.id}</td>
      <td>{channel.name}</td>
      <td>{channel.icon}</td>
    </tr>
  )
}

ChannelItem.propTypes = {
  channel: PropTypes.object,
}

const ChannelsTable = (props) => {
  const { channels } = props
  return (
    <div className={style.channelstable}>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kênh</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          {channels.map(channel => <ChannelItem channel={channel} key={channel.id} />)}
        </tbody>
      </Table>
    </div>
  )
}

ChannelsTable.propTypes = {
  channels : PropTypes.array,
}

export default ChannelsTable
