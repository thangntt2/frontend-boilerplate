
import React, { PropTypes } from 'react'
import { Table, Button } from 'react-bootstrap'
import style from './style.css'


const ChannelItem = (props) => {
  const { channel, onDeleteChannel } = props
  return (
    <tr>
      <td>{channel.id}</td>
      <td>{channel.name}</td>
      <td>{channel.icon}</td>
      <td>
        <Button bsStyle="danger" className={style.button} onClick={() => onDeleteChannel(channel)}>
          Xóa
        </Button>
      </td>
    </tr>
  )
}

ChannelItem.propTypes = {
  channel: PropTypes.object,
  onDeleteChannel: PropTypes.func.isRequired,
}

const ChannelsTable = (props) => {
  const { channels, onDeleteChannel } = props
  return (
    <div className={style.channelstable}>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kênh</th>
            <th>Biểu tượng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {channels.map(channel => <ChannelItem channel={channel} key={channel.id} onDeleteChannel={onDeleteChannel} />)}
        </tbody>
      </Table>
    </div>
  )
}

ChannelsTable.propTypes = {
  channels : PropTypes.array,
  onDeleteChannel: PropTypes.func.isRequired,
}

export default ChannelsTable
