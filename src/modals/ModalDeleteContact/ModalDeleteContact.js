import React from 'react'
import { useDispatch } from 'react-redux'
import './ModalDeleteContact.scss'

const Modal = ({id, modal}) => {

const dispatch = useDispatch();

const deleteContact = () => {
  try {
    dispatch({type: 'DELETE_CONTACT', payload: id})
    modal(false)
  } catch(err) {
    console.log(err)
  }
}

const handleClose = e => e.target.classList.contains('modal') && modal(false)

  return (
    <div className="modal" onClick={(e) => handleClose(e)}>
      <div className="modal-content">
        Are you sure?
        <div className ="modal-content__buttons">
          <button 
            className="modal-content__button modal-content__button-delete" 
            onClick={() => deleteContact()}
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

export default Modal
