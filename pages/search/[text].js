import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styled from 'styled-components';
import Card from '../../components/Card';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import { useBooks } from '../../lib/booksState';
import ButtonStyles from '../../styles/ButtonStyles';
import FormStyles from '../../styles/FormStyles';
import SearchHeaderStyles from '../../styles/SearchHeaderStyles';
import { SelectBtn } from '../../styles/FormStyles';
import SelectStyles from '../../styles/SelectStyles';

const SearchPageStyles = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
`;

const BooksStyles = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    padding-bottom: 3rem;
`;

export default function SearchPage({ books, totalCount }) {
    const { lists, addBook } = useBooks();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedList, setSelectedList] = useState(lists[0]);
    const [selectedBook, setSelectedBook] = useState(lists[0]);

    //pages
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();

    // modal
    const [modalVisible, setIsModalVisible] = useState(false);
    const [inputName, setInputName] = useState('');

    const router = useRouter();

    // calculate num of pages
    useEffect(() => {
        const pagesNum = Math.ceil(totalCount / 100);
        setNumOfPages(pagesNum);
    }, []);

    // current page
    useEffect(() => {
        if (router.query.page === undefined) {
            setPage(1);
        } else {
            const pageNum = parseInt(router.query.page);
            if (pageNum > numOfPages) {
                setPage(numOfPages);
            } else {
                setPage(pageNum);
            }
        }
    }, [router.asPath]);

    function addToList(e) {
        e.preventDefault();

        addBook(selectedBook, selectedList.id);
        setIsModalVisible(false);
    }

    return (
        <>
            <Head>
                <title>{router.query.text} - search </title>
            </Head>
            <SearchPageStyles>
                {books.length > 0 ? (
                    <>
                        <SearchHeaderStyles>
                            <p className="total">{`${totalCount} results`}</p>
                        </SearchHeaderStyles>
                        <BooksStyles>
                            {books.map((book) => (
                                <Card
                                    authorKey={book.author_key}
                                    authorName={book.author_name}
                                    bookKey={book.key}
                                    coverUrl={
                                        book.cover_edition_key !== undefined
                                            ? `http://covers.openlibrary.org/b/olid/${book.cover_edition_key}.jpg`
                                            : '/open-book.png'
                                    }
                                    key={book.key}
                                    publishYear={book.first_publish_year}
                                    title={book.title}
                                    onFavClick={(e) => {
                                        e.preventDefault();
                                        setSelectedBook(book);
                                        setIsModalVisible(true);
                                    }}
                                />
                            ))}
                        </BooksStyles>
                        <Pagination numOfPages={numOfPages} currPage={page} />
                        <Modal
                            closeModal={() => setIsModalVisible(false)}
                            isOpen={modalVisible}
                            message="Choose a list to add the book"
                        >
                            <SelectStyles onSubmit={addToList}>
                                <div
                                    className="sort"
                                    onClick={() =>
                                        setDropdownVisible(!dropdownVisible)
                                    }
                                >
                                    <span className="label">Lists:</span>
                                    <div className="select">
                                        <span className="selected">
                                            {selectedList?.name}
                                        </span>
                                        <FaChevronDown className="arrow" />
                                        {dropdownVisible && (
                                            <Dropdown
                                                items={lists}
                                                onClickOutside={() =>
                                                    setDropdownVisible(false)
                                                }
                                                onItemClick={(item) => {
                                                    if (
                                                        item.id !==
                                                        selectedList.id
                                                    ) {
                                                        setSelectedList({
                                                            id: item.id,
                                                            name: item.name,
                                                        });
                                                    }
                                                }}
                                                outsideClickIgnoreClass="select"
                                            />
                                        )}
                                    </div>
                                </div>
                                <SelectBtn>Add</SelectBtn>
                            </SelectStyles>
                        </Modal>
                    </>
                ) : (
                    <p>No results</p>
                )}
            </SearchPageStyles>
        </>
    );
}

export async function getServerSideProps(context) {
    const { data: books } = await axios.get(
        `http://openlibrary.org/search.json?q=${encodeURI(
            context.params.text
        )}&page=${context.query.page}`
    );

    return {
        props: { books: books.docs, totalCount: books.num_found },
    };
}

SearchPage.propTypes = {
    books: PropTypes.array,
    totalCount: PropTypes.number,
};
