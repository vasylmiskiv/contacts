import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import { useSelector } from 'react-redux';
import Modal from '../../modals/ModalDeleteContact/ModalDeleteContact'
import ModalGreeting from '../../modals/ModalGreeting/ModalGreeting';

import { faEdit, faTrash, faPlus, faIdCard } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = () => {
  const [modal, setModal] = useState(false);
  const [greetingModal, setGreetingModal] = useState(true)
  const [currentId, setCurrentId] = useState('')

  const contactList = useSelector(state => state);
  
  return (
    <>
      <Link to="/add">
        <button className="add-contact-btn">
          <FontAwesomeIcon icon={faPlus}/> Add a new contact
        </button>
      </Link>
      <div className="container">
        <div className="contact">
        <h1>CONTACTS</h1>
        <ul className="contact__list">
          {contactList.length ? contactList.map(contact => (
            Object.keys(contact).length > 1 && (
              <li key={contact.id} className="contact__item">

                <div className="contact__item-info" >
                  <ul className="contact__inputs-list">
                    {Object.entries(contact).map(input => {
                      const [name, value] = input;
                      return (
                        name !== 'id' && (
                          <li key={name} className="contact__inputs-item">
                          <div className="contact__item-name">
                            {name}
                          </div>
                          <div className="contact__item-value">
                            {value}
                          </div>
                        </li>
                        )
                      )
                    })}
                  </ul>
                </div>

                <div className="contact__item-buttons">
              <Link to={`/profile/${contact.id}`} className="icon-btn contact__item-profile">
                <FontAwesomeIcon icon={faIdCard} size="lg"/>
              </Link>

              <Link to={`/edit/${contact.id}`} className="icon-btn contact__item-edit">
                <FontAwesomeIcon icon={faEdit} size="lg"/>
              </Link>

              <FontAwesomeIcon
                icon={faTrash}
                className="icon-btn contact__item-delete"
                size="lg"
                onClick={() => {
                  setModal(true)
                  setCurrentId(contact.id)
                }}
              />
            </div>
          </li>)
          )) : (<h3>Contact list is empty</h3>)}
        </ul>
        </div>
        {modal && (<Modal id={currentId} modal={setModal}/> )}
        {greetingModal && !contactList.length && (<ModalGreeting greetingModal={setGreetingModal}/>)}
      </div>
    </>
  )
}

export default Home;
