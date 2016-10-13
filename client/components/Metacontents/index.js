
import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import style from './style.css'
import MetacontentsTable from './metacontentsTable'

const Metacontents = (props) => {
  const { channels, metacontents, handleCreateButton, onDeleteMetacontent } = props
  return (
    <div className={style.centerbody}>
      <Button bsStyle="primary" onClick={handleCreateButton}>Create</Button>
      <h1>
        Metacontent đã tạo hôm nay
      </h1>
      <MetacontentsTable
        channels={channels}
        metacontents={metacontents}
        onDeleteMetacontent={onDeleteMetacontent}
      />
    </div>
  )
}

Metacontents.propTypes = {
  channels: PropTypes.array,
  metacontents: PropTypes.array,
  handleCreateButton: PropTypes.func.isRequired,
  onDeleteMetacontent: PropTypes.func.isRequired,
}

export default Metacontents
