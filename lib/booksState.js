import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function BooksStateProvider({ children }) {
    const [lists, setLists] = useState(
        typeof window !== 'undefined' && localStorage.getItem('lists') !== null
            ? [...JSON.parse(localStorage.getItem('lists'))]
            : []
    );

    function createList(name) {
        setLists([...lists, { id: uuidv4(), name, books: [] }]);
        localStorage.setItem(
            'lists',
            JSON.stringify([...lists, { id: uuidv4(), name, books: [] }])
        );
    }

    function removeList(listId) {
        const filteredLists = lists.filter((list) => list.id !== listId);
        setLists(filteredLists);
        localStorage.setItem('lists', JSON.stringify(filteredLists));
    }

    function addBook(book, listId) {
        const updatedLists = lists.map((list) => {
            if (list.id === listId) {
                return {
                    ...list,
                    books:
                        list.books.length > 0
                            ? list.books.find(
                                  (item) => item.key === book.key
                              ) === undefined
                                ? [...list.books, { ...book, read: false }]
                                : list.books
                            : [{ ...book, read: false }],
                };
            } else {
                return list;
            }
        });
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    }

    function removeBook(bookId, listId) {
        const updatedLists = lists.map((list) => {
            if (list.id === listId) {
                return {
                    ...list,
                    books: list.books.filter((book) => book.key !== bookId),
                };
            } else {
                return list;
            }
        });
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    }

    function toggleReadStatus(bookId, listId) {
        const updatedLists = lists.map((list) => {
            if (list.id === listId) {
                return {
                    ...list,
                    books: list.books.map((book) =>
                        book.key === bookId
                            ? {
                                  ...book,
                                  read: !book.read,
                              }
                            : book
                    ),
                };
            } else {
                return list;
            }
        });
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    }

    return (
        <LocalStateProvider
            value={{
                lists,
                createList,
                removeList,
                addBook,
                removeBook,
                toggleReadStatus,
            }}
        >
            {children}
        </LocalStateProvider>
    );
}

function useBooks() {
    const all = useContext(LocalStateContext);
    return all;
}

export { BooksStateProvider, useBooks };
