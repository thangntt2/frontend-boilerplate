
import React, { PropTypes } from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'
import { FlatButton } from 'material-ui'
import Paper from 'material-ui/Paper'
import globalstyle from '../../style/style.css'
import MetacontentsTable from './metacontentsTable'
import Uploadmock from './uploadMock'

class Metacontents extends React.Component {
  constructor(props) {
    super(props)
    this.handleMockButton = this.handleMockButton.bind(this)
    this.handleCloseMock = this.handleCloseMock.bind(this)
    this.state = {
      openMock: false,
    }
  }

  handleMockButton() {
    this.setState({ openMock: true })
  }

  handleCloseMock() {
    this.setState({ openMock: false })
  }

  render() {
    const { channels, metacontents, handleCreateButton, onDeleteMetacontent, onSubmitFile } = this.props
    return (
      <div>
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
              <FlatButton
                label="Dựng sẵn"
                primary
                icon={<FontIcon className="material-icons">add</FontIcon>}
                onClick={this.handleMockButton}
              />
            </ToolbarGroup>
          </Toolbar>
          <MetacontentsTable
            channels={channels}
            metacontents={metacontents}
            onDeleteMetacontent={onDeleteMetacontent}
          />
        </Paper>
        <Uploadmock
          open={this.state.openMock}
          onClose={this.handleCloseMock}
          channels={channels}
          onSubmit={onSubmitFile}
          isSubmit={this.props.isSubmit}
        />
      </div>
    )
  }
}

Metacontents.propTypes = {
  channels: PropTypes.array,
  metacontents: PropTypes.array,
  handleCreateButton: PropTypes.func.isRequired,
  onDeleteMetacontent: PropTypes.func.isRequired,
  onSubmitFile: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
}

export default Metacontents
