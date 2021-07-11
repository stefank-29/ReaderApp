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
        localStorage.setItem('lists', JSON.stringify(filteredBookmarks));
    }

    function addBook(book, listId) {
        const updatedLists = lists.map((list) => {
            if (list.id === listId) {
                return { ...list, books: [...list.books, book] };
            } else {
                return list;
            }
        });
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    }

    function removeBook(bookId, listId) {
        const filteredBookmarks = bookmarks.filter(
            (item) => item.articleId !== articleId
        );
        setBookmarks(filteredBookmarks);
        localStorage.setItem('lists', JSON.stringify(filteredBookmarks));
    }

    function isBookInList(articleId, listId) {
        return false;
    }

    return (
        <LocalStateProvider
            value={{
                lists,
                createList,
                removeList,
                addBook,
                removeBook,
                isBookInList,
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
