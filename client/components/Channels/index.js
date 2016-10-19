
import React, { PropTypes } from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'
import { FlatButton } from 'material-ui'
import Paper from 'material-ui/Paper'
import style from '../../style/style.css'
import ChannelsTable from './channelsTable'

const Channels = (props) => {
  const { channels, onDeleteChannel, onCreateButton } = props
  return (
    <Paper className={style.centerbody} zDepth={2}>
      <Toolbar
        style={{
          backgroundColor: 'white',
        }}
      >
        <ToolbarGroup>
          <ToolbarTitle text="DANH SÁCH KÊNH" />
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton
            label="Tạo"
            primary
            icon={<FontIcon className="material-icons">add</FontIcon>}
            onClick={onCreateButton}
          />
        </ToolbarGroup>
      </Toolbar>
      <ChannelsTable channels={channels} onDeleteChannel={onDeleteChannel} />
    </Paper>
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
