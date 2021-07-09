import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import SearchHeaderStyles from '../../styles/SearchHeaderStyles';
import Card from '../../components/Card';

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
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();

    const router = useRouter();

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
                                        book.cover_i !== undefined
                                            ? `http://covers.openlibrary.org/b/id/${book.cover_i}.jpg`
                                            : '/open-book.png'
                                    }
                                    key={book.key}
                                    publishYear={book.first_publish_year}
                                    title={book.title}
                                >
                                    a
                                </Card>
                            ))}
                        </BooksStyles>
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
