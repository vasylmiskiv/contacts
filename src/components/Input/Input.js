import React, { useState } from 'react'
import {useParams} from 'react-router-dom';

const Input = ({name='', value=''}) => {
  const [currentValue, setCurrentValue] = useState(value)
  
  return (
      <label htmlFor={name} className="edit-contact__label">
          {name}<br/>
          <input
            className="edit-contact__input"
            id={name}
            name={name}
            type="text"
            autoComplete="off"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.currentTarget.value)}
          />
        </label>
  )
}

export default Input
