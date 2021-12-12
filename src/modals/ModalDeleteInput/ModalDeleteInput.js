import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

const ModalDeleteInput = ({id, modal, name, currentContact, setCurrentContact}) => {

const dispatch = useDispatch();

const history = useHistory()

 const deleteInput = () => {
   const newCurrentContact = {...currentContact}
   delete newCurrentContact[name]

    dispatch({type: 'DELETE_CONTACT_INPUT', payload: newCurrentContact})
    modal(false)
   }

const handleClose = e => e.target.classList.contains('modal') && modal(false)

  return (
    <div className="modal" onClick={(e) => handleClose(e)}>
      <div className="modal-content">
        Are you sure?
        <div className ="modal-content__buttons">
          <button 
            className="modal-content__button modal-content__button-delete" 
            onClick={(e) => deleteInput()}
            >
            Delete
          </button>
          <button 
            className="modal-content__button modal-content__button-cancel"
            onClick={() => modal(false)}
            >
            Cancel
          </button>
        </div>
      </div> 
    </div>
  )
}

export default ModalDeleteInput;