import React, { PropTypes } from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

const CategoryRadioGroup = (props) => {
  const { selected, categoryList, handleOptionChange } = props
  return (
    <div>
      <RadioButtonGroup
        name="category"
        valueSelected={selected}
        onChange={handleOptionChange}
      >
        {categoryList.map(category =>
          <RadioButton
            value={category.value}
            label={category.name}
            key={category.value}
            inputStyle={{
              fontWeight: 'normal',
            }}
          />
        )}
      </RadioButtonGroup>
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
