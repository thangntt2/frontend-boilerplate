
import React, { PropTypes } from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'
import { FlatButton } from 'material-ui'
import Paper from 'material-ui/Paper'
import globalstyle from '../../style/style.css'
import MetacontentsTable from './metacontentsTable'

const Metacontents = (props) => {
  const { channels, metacontents, handleCreateButton, onDeleteMetacontent } = props
  return (
    <Paper className={globalstyle.centerbody}>
      <Toolbar
        style={{
          backgroundColor: 'white',
        }}
      >
        <ToolbarGroup>
          <ToolbarTitle text="DANH SÁCH METACONTENT ĐÃ TẠO HÔM NAY" />
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
      <MetacontentsTable
        channels={channels}
        metacontents={metacontents}
        onDeleteMetacontent={onDeleteMetacontent}
      />
    </Paper>
  )
}

Metacontents.propTypes = {
  channels: PropTypes.array,
  metacontents: PropTypes.array,
  handleCreateButton: PropTypes.func.isRequired,
  onDeleteMetacontent: PropTypes.func.isRequired,
}

export default Metacontents
