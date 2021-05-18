import React from 'react'
import Select from 'react-select'

const CustomSelect = ({categories, categoryId, setCategoryId}) => {
    const options = categories.map(getCatOption)

    function getCatOption(cat) {
      return {value: cat.id, label: cat.name, color: cat.color}
    }

    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',
      
        ':before': {
          backgroundColor: color,
          borderRadius: 10,
          content: '" "',
          display: 'block',
          marginRight: 8,
          height: 10,
          width: 10,
        },
      });
      
      const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          const color = data.color;
          return {
            ...styles,
            backgroundColor: isDisabled
              ? null
              : isSelected
              ? data.color
              : isFocused
              ? color
              : null,
            color: isDisabled
              ? '#ccc'
              : isSelected
              ? color
                ? 'white'
                : 'black'
              : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
      
            ':active': {
              ...styles[':active'],
              backgroundColor:
                !isDisabled && (isSelected ? data.color : color),
            },
          };
        },
        input: styles => ({ ...styles, ...dot() }),
        placeholder: styles => ({ ...styles, ...dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
      };
      
       return (
        <Select
          label="Single select"
          options={options}
          styles={colourStyles}         
          onChange={(e) => setCategoryId(e.value)}
        />
      );
}

export default CustomSelect
