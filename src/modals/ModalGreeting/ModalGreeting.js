import React from 'react'
import './ModalGreeting.scss'

const ModalGreeting = ({ greetingModal }) => {

    return (
			<div className='greeting-modal'>
				<div className='greeting-modal__content'>
					<h1 className='greeting-modal__title'>Welcome to Contact List app!</h1>
					<button 
						type="button"
						className="greeting-modal__button"
						// it would be better push into localStorage
						onClick={() => greetingModal(false)}
					>
						Get Started
					</button>
				</div>
			</div>
    )
}

export default ModalGreeting
