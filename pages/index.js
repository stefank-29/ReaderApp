import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import FormStyles from '../styles/FormStyles';
import styled from 'styled-components';
import ButtonStyles from '../styles/ButtonStyles';
import { FaSearch } from 'react-icons/fa';

const HomeStyles = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState();
    const [disabledBtn, setDisabledBtn] = useState(true);

    function handleChange(e) {
        let query = e.target.value;
        if (query !== '') {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
        setSearchQuery(query);
    }

    function handleSubmit() {}

    return (
        <>
            <Head>
                <title>My library</title>
            </Head>
            <HomeStyles>
                <FormStyles onSubmit={handleSubmit}>
                    <input
                        className="search-input"
                        onChange={handleChange}
                        placeholder="Search books, articles or magazines..."
                        type="text"
                        value={searchQuery}
                    />
                    <ButtonStyles className="submit-btn" disabled={disabledBtn}>
                        <FaSearch className="icon" />
                        <span>Search</span>
                    </ButtonStyles>
                </FormStyles>
            </HomeStyles>
        </>
    );
}
