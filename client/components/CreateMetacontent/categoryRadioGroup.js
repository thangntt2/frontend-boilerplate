import React, { PropTypes } from 'react'
import { Radio, FormGroup, ControlLabel } from 'react-bootstrap'

const CategoryRadio = (props) => {
  const { name, value, checked, handleOptionChange } = props
  return (
    <Radio
      name="category"
      checked={checked}
      inline
      value={value}
      onChange={handleOptionChange}
    >
      {name}
    </Radio>
  )
}

CategoryRadio.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  handleOptionChange: PropTypes.func.isRequired,
}

const CategoryRadioGroup = (props) => {
  const { selected, categoryList, handleOptionChange } = props
  return (
    <div>
      <ControlLabel>Loại</ControlLabel>
      <FormGroup>
        {categoryList.map(category =>
          <CategoryRadio
            name={category.name}
            checked={category.value === selected}
            value={category.value}
            handleOptionChange={handleOptionChange}
            key={category.value}
          />
        )}
      </FormGroup>
    </div>
  )
}

CategoryRadioGroup.propTypes = {
  selected: PropTypes.string,
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  handleOptionChange: PropTypes.func.isRequired,
}

export default CategoryRadioGroup
