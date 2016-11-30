
import React, { PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import style from './style.css'


const ChannelItem = (props) => {
  const { channel, onDeleteChannel, ...otherProps } = props
  return (
    <TableRow {...otherProps} >
      <TableRowColumn>{channel.id}</TableRowColumn>
      <TableRowColumn>{channel.name}</TableRowColumn>
      <TableRowColumn>
        <img
          className={style.img}
          thumbnail
          src={!(channel.image) || (channel.image.length === 0)
            ? 'http://vignette3.wikia.nocookie.net/shokugekinosoma/images/6/60/No_Image_Available.png/revision/latest?cb=20150708082716'
            : (channel.image)}
        />
      </TableRowColumn>
      <TableRowColumn>
        <FlatButton
          secondary
          className={style.button}
          onClick={() => onDeleteChannel(channel)}
        >
          Xóa
        </FlatButton>
      </TableRowColumn>
    </TableRow>
  )
}

const ChannelsTable = (props) => {
  const { channels, onDeleteChannel } = props
  return (
    <div className={style.channelstable}>
      <Table
        fixedHeader
      >
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Kênh</TableHeaderColumn>
            <TableHeaderColumn>Biểu tượng</TableHeaderColumn>
            <TableHeaderColumn>Thao tác</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          stripedRows
          showRowHover
        >
          {channels.map(channel => <ChannelItem channel={channel} key={channel.id} onDeleteChannel={onDeleteChannel} />)}
        </TableBody>
      </Table>
    </div>
  )
}

ChannelsTable.propTypes = {
  channels : PropTypes.array,
  onDeleteChannel: PropTypes.func.isRequired,
}

export default ChannelsTable
