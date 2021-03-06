import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import AddInputs from '../AddInputs/AddInputs';
import './EditContact.scss'
import ModalDeleteInput from '../../modals/ModalDeleteInput/ModalDeleteInput'

import _ from 'lodash'

import { faTrash, faUndo } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EditContact = () => {
  let [currentContact, setCurrentContact] = useState({});
  const [modal, setModal] = useState(false);
  const [votedContactKey, setVotedContactKey] = useState('');
  const [inputCache, setInputCache] = useState([]);

  const {id} = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const contactList = useSelector(state => state);

  useEffect(() => {
    setCurrentContact(contactList.find(contact => contact.id === id));
  }, [contactList, id])

  const voteCurrentContactKey = (name) => {
    setModal(true);
    setVotedContactKey(name);
  }

  const submitInputs = (e) => {
    e.preventDefault();
    dispatch({type: 'UPDATE_CONTACT_INPUT', payload: currentContact});
    history.push('/contacts');
  }

  const changeInput = (e) => {
    const newData = {...currentContact}
    newData[e.target.name] = e.target.value;
    setCurrentContact(newData);
  }

  const saveInputValue = () => {
    if (_.isEqual(inputCache[inputCache.length - 1], currentContact)) {
      
    } else {
      setInputCache(prev => [...prev, currentContact]);
    }
  }

  const handleUndo = () => {
    setCurrentContact(inputCache[inputCache.length - 1]);
    setInputCache(inputCache.slice(0, -1));
  }

    return (
      <div className="container">
        {currentContact ? (
            <div className="edit-contact">
            <Link to={`/profile/${id}`} className="edit-contact__title"><h3>Edit contact ID {id}</h3></Link>
            <form onSubmit={(e) => submitInputs(e)} id="myForm">
              {Object.entries(currentContact).map(input => {
                const [name] = input;
                return (
                  name !== 'id' && (
                    <div className="edit-contact__group">
                      <label className='edit-contact__label'>              
                        {name}
                        <input 
                          className="edit-contact__input" 
                          name={name} 
                          value={currentContact[name]} 
                          onChange={(e) => changeInput(e)}

                          onFocus={(e) => saveInputValue(e)}
                          />
      
                      </label>
                      <FontAwesomeIcon 
                        icon={faTrash} 
                        className="edit-contact__input-delete"
                        onClick={() => voteCurrentContactKey(name)}
                      />
                      
                      { modal && (
                    <ModalDeleteInput
                      id={id}
                      modal={setModal} 
                      name={votedContactKey}
                      currentContact={currentContact}
                    />
                    )}
                    </div>
                  )    
                )   
              })
            }
                
              <div className="edit-contact__buttons">
              <button type ="submit" className="edit-contact__button edit-contact__button-apply" >
                Apply
              </button>
              <button
                type= "button" 
                className="edit-contact__button edit-contact__button-cancel"
                onClick={() => history.push('/contacts')}
                >
                Cancel
              </button>
                <button 
                type= "button" className='edit-contact__button edit-contact__button-undo'
                disabled={inputCache.length < 1}
                onClick={() => handleUndo()}
                >
                <FontAwesomeIcon 
                  icon={faUndo} 
                  className="edit-contact__input-undo"
                />
                </button>

            </div>
            </form>
            <AddInputs/>
            </div>
        ) : (
          <h3>Contact {id} has been deleted</h3>
        )}

      </div>
    )
}

export default EditContact


