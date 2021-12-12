import React, { useState } from 'react';
import './AddContact.scss'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

const AddContact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const dispatch = useDispatch();

  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault();
    const dataForDispatch = {
      id: uuidv4(),
      name,
      phone,
    }

    try {
      dispatch({
        type:'ADD_CONTACT',
        payload: dataForDispatch
      })
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  };

  return (
      <div className="container">
        <h1 className="add-contact__title">Add a new contact</h1>
          <form className="add-contact__form" onSubmit={handleSubmit}>

            <div className="form-contact-group">
              <label htmlFor="name" className="add-contact__label">
                Name<br/>
                <input 
                  id="name"
                  className="add-contact__input"
                  type="text" 
                  placeholder="John Doe"
                  value={name}
                  onChange={e => setName(e.currentTarget.value)}
                  required
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="form-contact-group">
              <label htmlFor="phone" className="add-contact__label">
                Phone number<br/>
                <input 
                  id= "phone"
                  className="add-contact__input" 
                  type="text" 
                  placeholder="+380631231212"
                  value={phone}
                  onChange={e => setPhone(e.currentTarget.value)}
                  required
                  autoComplete="off"
                />
              </label>
            </div>

            <button type="submit" className={name && phone ? "add-contact__submit" : "add-contact__submit add-contact__submit--off"}>
              Add contact
            </button>

          </form>
      </div> 
    );
}

export default AddContact;
