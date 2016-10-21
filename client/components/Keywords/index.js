
import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'
import { FlatButton } from 'material-ui'
import style from '../../style/style.css'
import KeywordsTable from './keywordsTable'
import CreateKeywords from '../CreateKeyword'

const Keywords = (props) => {
  const { channels, keywords, handleCreateButton, onDeleteKeyword, open, handleClose, onChannelChange, onSubmit } = props
  return (
    <Paper className={style.centerbody} zDepth={2}>
      <Toolbar
        style={{
          backgroundColor: 'white',
        }}
      >
        <ToolbarGroup>
          <ToolbarTitle text="DANH SÁCH TỪ KHÓA" />
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton
            label="Tạo"
            primary
            icon={<FontIcon className="material-icons">add</FontIcon>}
            onClick={handleCreateButton}
          />
        </ToolbarGroup>
      </Toolbar>
      <KeywordsTable
        channels={channels}
        keywords={keywords}
        onDeleteKeyword={onDeleteKeyword}
      />
      <CreateKeywords
        channels={channels}
        onChannelChange={onChannelChange}
        onSubmit={onSubmit}
        open={open}
        handleClose={handleClose}
      />
    </Paper>
  )
}

Keywords.propTypes = {
  channels: PropTypes.array,
  keywords: PropTypes.array,
  open: PropTypes.bool,
  handleCreateButton: PropTypes.func.isRequired,
  onDeleteKeyword: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  onChannelChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default Keywords
