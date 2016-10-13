
import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import style from './style.css'
import ChannelsTable from './channelsTable'

const Channels = (props) => {
  const { channels, onDeleteChannel, onCreateButton } = props
  return (
    <div className={style.centerbody}>
      <Button bsStyle="primary" onClick={onCreateButton}>Create</Button>
      <ChannelsTable channels={channels} onDeleteChannel={onDeleteChannel} />
    </div>
  )
}

Channels.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.string,
      channel: PropTypes.string,
    })),
  onDeleteChannel: PropTypes.func.isRequired,
  onCreateButton: PropTypes.func.isRequired,
}

export default Channels
