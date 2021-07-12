import styled from 'styled-components';
import { FaPlus, FaBookmark } from 'react-icons/fa';
import Modal from '../components/Modal';
import ButtonStyles from '../styles/ButtonStyles';
import FormStyles from '../styles/FormStyles';
import { useState, useEffect } from 'react';
import { useBooks } from '../lib/booksState';
import Head from 'next/head';
import Carousel from '../components/Carousel';
import Message from '../components/Message';

const ListsPageStyles = styled.main`
    display: flex;
    flex-direction: column;
    padding-top: 3rem;
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
            font-size: 3rem;
            font-family: Ubuntu, sans-serif;
        }
        .create {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 500;
            color: var(--grey);
            cursor: pointer;
            :hover {
                color: var(--black);
            }
            .icon {
                margin-right: 0.3rem;
            }
        }
    }
`;

export default function Lists() {
    const [modalVisible, setIsModalVisible] = useState(false);
    const [inputName, setInputName] = useState('');

    // all lists from local storage
    const [myLists, setMyLists] = useState([]);

    const { lists, createList, removeBook, removeList, toggleReadStatus } =
        useBooks();

    useEffect(() => {
        setMyLists(lists);
    }, []);

    useEffect(() => {
        setMyLists(lists);
    }, [lists]);

    function handleNameSubmit(e) {
        e.preventDefault();

        createList(inputName);
        setIsModalVisible(false);
        setInputName('');
    }

    function removeFromList(e, listId, bookId) {
        e.stopPropagation();

        removeBook(bookId, listId);
    }

    function toggleRead(e, listId, bookId) {
        e.stopPropagation();

        toggleReadStatus(bookId, listId);
    }

    return (
        <>
            <Head>
                <title>My lists</title>
            </Head>
            <ListsPageStyles>
                <div className="header">
                    <div className="title">My lists</div>
                    <div
                        className="create"
                        onClick={() => setIsModalVisible(true)}
                    >
                        <FaPlus className="icon" />
                        <span className="label">Create list</span>
                    </div>
                </div>
                {myLists.length > 0 ? (
                    myLists.map((list) => (
                        <Carousel
                            items={list.books}
                            key={list.id}
                            title={list.name}
                            icon={<FaBookmark className="bookmark" />}
                            isMyList={true}
                            haveReadCheck={true}
                            onBookmarkClick={(e, bookKey) => {
                                removeFromList(e, list.id, bookKey);
                            }}
                            onTimesClick={() => removeList(list.id)}
                            onReadClick={(e, bookKey) => {
                                toggleRead(e, list.id, bookKey);
                            }}
                        />
                    ))
                ) : (
                    <Message
                        header="You don't have any lists yet"
                        info="As soon as you see book that you like, add them to your list! "
                        buttonText="LET'S START LOOKING"
                        imageUrl="/empty.svg"
                        buttonRoute="/"
                    ></Message>
                )}
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
            </ListsPageStyles>
        </>
    );
}
