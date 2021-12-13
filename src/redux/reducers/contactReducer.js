const initialState = [];

const contactReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_CONTACT':
      state = [...state, action.payload];
      return state;

    case 'DELETE_CONTACT':
      const deletedContactState = state.filter(contact => contact.id !== action.payload)
      state = deletedContactState;
      return state;

    case 'ADD_CONTACT_INPUT': 
      const addedInputState = state.map(contact => contact.id === action.payload.id 
      ? action.payload : contact)
      console.log(action.payload)
      state = addedInputState;
      return state;

    case 'UPDATE_CONTACT_INPUT':
      const updatedInputState = state.map(contact => contact.id === action.payload.id 
      ? action.payload : contact)
      state = updatedInputState;
      return state;

    case 'DELETE_CONTACT_INPUT':
      if (Object.keys(action.payload).length === 1) {
        const updatedState = state.filter(contact => contact.id !== action.payload.id)
        state = updatedState;
        return state;
      } else {
        const deletedInputState = state.map(contact => contact.id === action.payload.id 
        ? action.payload : contact)
        state = deletedInputState;
        return state;
      }
      
    default: 
      return state;
  }
}

export default contactReducer;