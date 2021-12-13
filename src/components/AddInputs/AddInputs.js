import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './AddInputs.scss'
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddInputs = () => {
    const [isVisibleAdditionalInputs, setIsVisibleAdditionalInputs] = useState(false);
    const [nameOfTheInput, setNameOfTheInput] = useState('');
    const [valueOfTheInput, setValueOfTheInput] = useState('');

    const {id} = useParams();

    const dispatch = useDispatch();

    const listOfContacts = useSelector(state => state);

    const toggleAdditionalInputs = () => {
        setIsVisibleAdditionalInputs(isVisibleAdditionalInputs => !isVisibleAdditionalInputs);
    }
    
    const currentContact = listOfContacts.find(contact => contact.id === id);

    const handleSubmit = (e) => {
      e.preventDefault();

      const updatedContact = {
        ...currentContact,
        [nameOfTheInput]: valueOfTheInput,
      }
    
       try {
        dispatch({type: 'ADD_CONTACT_INPUT', payload: updatedContact});
        setNameOfTheInput('');
        setValueOfTheInput('');
      } catch (err) {
        console.log(err);
      }
    }

    return (
        <div className="add-inputs">
          
            <button onClick={() => toggleAdditionalInputs()} className={isVisibleAdditionalInputs ? 'add-inputs__cancel-btn' : 'add-inputs__toggle-btn'}>
                {isVisibleAdditionalInputs ? (<FontAwesomeIcon icon={faTimes} className="add-inputs__cancel-icon"/>) : `Add info to contact`}
            </button>
            {isVisibleAdditionalInputs && (
                <form className="add-inputs__form" onSubmit={(e) => handleSubmit(e)}>
            <div className="add-inputs__group">
              <label htmlFor="value" className="add-inputs__label">
                Name of the input<br/>
                <input className="add-inputs__input"
                  id= "value" 
                  type="text"
                  value={nameOfTheInput}
                  placeholder="Example: Email"
                  onChange={(e) =>setNameOfTheInput(e.currentTarget.value.toLowerCase())}
                  required
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="add-inputs__group">
              <label htmlFor="name" className="add-inputs__label">
                Value<br/>
                <input 
                  id= "name" 
                  type="text"
                  className="add-inputs__input"
                  value={valueOfTheInput}
                  placeholder="Example: test@gmail.com"
                  onChange={(e) => setValueOfTheInput(e.currentTarget.value)}
                  required
                  autoComplete="off"
                />
              </label>
            </div>

            <button type= "submit" className="add-inputs__submit">
                Add to contact
            </button>
          </form>
            )}
            
        </div>
    )
}

export default AddInputs;