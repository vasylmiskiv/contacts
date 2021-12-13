import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import './ShowContact.scss'

const ShowContact = () => {
  const [currentContact, setCurrentContact] = useState({})

  const contactList = useSelector(state => state);

  const {id} = useParams();

  useEffect(() => {
      setCurrentContact(contactList.find(contact => contact.id === id));
  }, [contactList, id])

  return (
    <>
      <h4>Contact ID {id}</h4>
        <div className="show-contact">
        <ul className="show-contact__profile">
          {Object.entries(currentContact).slice(1).map(input => {
            const [name, value] = input;
            return (
              <li className="show-contact__item">
                <div className="show-contact__name">
                  {name}
                </div>
                <div className="show-contact__value">
                  {value}
                </div>
              </li>
            )
          })}
          </ul>
      </div>
    </>
  )
}

export default ShowContact
