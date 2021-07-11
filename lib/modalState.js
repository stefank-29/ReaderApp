import { createContext, useContext, useState } from 'react';
import { useBooks } from './booksState';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function ModalStateProvider({ children }) {
    const [modalVisible, setIsModalVisible] = useState(false);
    const [inputName, setInputName] = useState('');

    const { createList } = useBooks();

    function handleNameSubmit(e) {
        e.preventDefault();

        createList(inputName);
        setIsModalVisible(false);
        setInputName('');
    }

    return (
        <LocalStateProvider
            value={{
                modalVisible,
                inputName,
                setIsModalVisible,
                setInputName,
                handleNameSubmit,
            }}
        >
            {children}
        </LocalStateProvider>
    );
}

function useModal() {
    const all = useContext(LocalStateContext);
    return all;
}

export { ModalStateProvider, useModal };
