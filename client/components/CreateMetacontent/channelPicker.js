
import React, { PropTypes } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const ChannelPicker = (props) => {
  const { channels, handleOptionChange, selected } = props
  return (
    <SelectField
      floatingLabelText="Kênh"
      value={selected}
      onChange={handleOptionChange}
      fullWidth
    >
      {channels.map((channel, index) =>
        (<MenuItem key={channel.id} value={index} primaryText={channel.name} />)
      )}
    </SelectField>
  )
}

ChannelPicker.propTypes = {
  channels: PropTypes.array,
  handleOptionChange: PropTypes.func.isRequired,
  selected: PropTypes.number,
}

export default ChannelPicker
