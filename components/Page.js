import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import Modal from './Modal';
import FormStyles from '../styles/FormStyles';
import ButtonStyles from '../styles/ButtonStyles';
import { useState } from 'react';
import { useBooks } from '../lib/booksState';
import { useModal } from '../lib/modalState';

const GlobalStyles = createGlobalStyle`
    html{
        font-size: 62.5%;
        box-sizing: border-box;
        --black: #222222;
        --orange: #EF7310;
        --grey: #555555;
        --darkGrey: #404040;
        --lightGrey: #d9d9d9;
        --blue: #0066ff;
        --darkBlue: #0d34bf;
        --purple: #3366ff;
        --lightPurple: rgba(51, 99, 255, 0.7);
        --indigo: #051e3e;
        --darkPurple:  #251e3e;
        --darkestRed:#451e3e;
        --darkerRed: #651e3e;
        --red: #851e3e;
        --lightRed: #ff3333;
        --green: #00e600;
    }

    body{
        padding: 0;
        margin: 0;
        font-family: 'Roboto', Arial, Helvetica, sans-serif;
        font-size: 1.5rem;
        background-color: #f3f3f3;
    }

    a{
        color: inherit;
        text-decoration: none;
    }

    *, *:before, *:after{
        box-sizing: inherit;
    }
`;

const InnerStyles = styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 1320px;
    min-height: calc(100vh - 12rem);
    @media all and (max-width: 1320px) {
        max-width: 900px;
        width: 100%;
        padding: 2rem;
    }
`;

export default function Page({ children }) {
    const {
        modalVisible,
        setIsModalVisible,
        inputName,
        handleNameSubmit,
        setInputName,
    } = useModal();

    return (
        <div>
            <GlobalStyles />
            <Header />
            <InnerStyles>{children}</InnerStyles>
            <Modal
                closeModal={() => setIsModalVisible(false)}
                isOpen={modalVisible}
                message="Insert new list name"
            >
                <FormStyles onSubmit={handleNameSubmit}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="List name"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />
                    <ButtonStyles>Add</ButtonStyles>
                </FormStyles>
            </Modal>
        </div>
    );
}

Page.propTypes = {
    children: PropTypes.any,
};
