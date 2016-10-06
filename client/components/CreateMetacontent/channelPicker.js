
import React, { PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const ChannelPicker = (props) => {
  const { channels, handleOptionChange, selected } = props
  return (
    <div>
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Kênh</ControlLabel>
        <FormControl
          componentClass="select"
          placeholder="Kênh"
          onChange={handleOptionChange}
          value={selected}
        >
          {channels.map((channel, index) =>
            (<option key={channel.id} value={index}>{channel.name}</option>)
          )}
        </FormControl>
      </FormGroup>
    </div>
  )
}

ChannelPicker.propTypes = {
  channels: PropTypes.array,
  handleOptionChange: PropTypes.func.isRequired,
  selected: PropTypes.number,
}

export default ChannelPicker
