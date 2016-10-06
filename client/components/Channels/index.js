
import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import style from './style.css'
import ChannelsTable from './channelsTable'

const Channels = (props) => {
  const { channels } = props
  return (
    <div className={style.centerbody}>
      <Button bsStyle="primary">Create</Button>
      <ChannelsTable channels={channels} />
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
}

export default Channels
