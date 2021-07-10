import { createContext, useContext, useState } from 'react';
// import uuidv4 from 'uuid';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function BooksStateProvider({ children }) {
    const [lists, setLists] = useState(
        typeof window !== 'undefined' && localStorage.getItem('lists') !== null
            ? [...JSON.parse(localStorage.getItem('lists'))]
            : []
    );

    function createList(name) {
        setLists([...lists, { name, books: [] }]);
        localStorage.setItem(
            'lists',
            JSON.stringify([[...lists, { id: uuidv4(), name, books: [] }]])
        );
    }

    function removeList(listId) {
        const filteredLists = lists.map((list) => list.id !== listId);
        setLists(filteredList);
        localStorage.setItem('lists', JSON.stringify(filteredBookmarks));
    }

    function addBook(book, listId) {
        const storageLists = [...lists, list];
        localStorage.setItem('lists', JSON.stringify(storageLists));
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
