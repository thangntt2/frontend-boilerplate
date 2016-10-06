
import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import style from './style.css'
import KeywordsTable from './keywordsTable'

const Keywords = (props) => {
  const { channels, keywords, handleCreateButton } = props
  return (
    <div className={style.centerbody}>
      <Button bsStyle="primary" onClick={handleCreateButton}>Create</Button>
      <h1>
        Keywords đã tạo trong 24h qua
      </h1>
      <KeywordsTable
        channels={channels}
        keywords={keywords}
      />
    </div>
  )
}

Keywords.propTypes = {
  channels: PropTypes.array,
  keywords: PropTypes.array,
  handleCreateButton: PropTypes.func.isRequired,
}

export default Keywords
