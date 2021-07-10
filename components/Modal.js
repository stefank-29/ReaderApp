import styled from 'styled-components';
import ModalStyles from '../styles/ModalStyles';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ isOpen, closeModal, message, children }) {
    if (!isOpen) return null;
    return (
        <ModalStyles onClick={closeModal}>
            <div className="container" onClick={(e) => e.stopPropagation()}>
                <FaTimes className="times" onClick={closeModal} />
                <div className="message">{message}</div>
                {children}
            </div>
        </ModalStyles>
    );
}
