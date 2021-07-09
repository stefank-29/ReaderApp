import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import SearchHeaderStyles from '../../styles/SearchHeaderStyles';

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
                <title> - search </title>
            </Head>
            <SearchPageStyles>
                {books.length > 0 ? (
                    <>
                        <SearchHeaderStyles>
                            <p className="total">{`${totalCount} results`}</p>
                        </SearchHeaderStyles>
                        <BooksStyles>
                            {books.map((book, index) => (
                                <div key={index}>a</div>
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
    const { data } = await axios.get(
        `http://openlibrary.org/search.json?q=${encodeURI(
            context.params.text
        )}&page=${context.query.page}`
    );

    return {
        props: { books: data.docs, totalCount: data.num_found },
    };
}

SearchPage.propTypes = {
    books: PropTypes.array,
    totalCount: PropTypes.number,
};
