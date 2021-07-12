import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import FormStyles from '../styles/FormStyles';
import styled from 'styled-components';
import ButtonStyles from '../styles/ButtonStyles';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

const HomeStyles = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    .title {
        font-size: 5rem;
        margin: 4rem 0 2rem;
        font-family: 'Courgette', cursive;
    }
`;

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(true);

    const router = useRouter();

    function handleChange(e) {
        let query = e.target.value;
        if (query !== '') {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
        setSearchQuery(query);
    }

    function handleSubmit(e) {
        e.preventDefault();

        router.push(`/search/${searchQuery}?page=1`);
    }

    return (
        <>
            <Head>
                <title>My library</title>
            </Head>
            <HomeStyles>
                <div className="title">My library</div>
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
