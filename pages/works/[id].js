import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import styled from 'styled-components';
import ImageStyles from '../../styles/ImageStyles';
import { InfoStyles } from '../../styles/InfoStyles';
import ButtonStyles from '../../styles/ButtonStyles';

const DetailsPageStyles = styled.div`
    width: 100%;
    display: flex;
    padding: 4rem 0;
`;

export default function BookDetails({
    id,
    title,
    description,
    authors,
    imageUrl,
    publishDate,
}) {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const detailsRef = useRef();

    useEffect(() => {
        if (detailsRef.current.clientHeight < detailsRef.current.scrollHeight) {
            setIsOverflowing(true);
        }
    }, []);

    function handleOverflow() {
        setShowMore(!showMore);
    }

    return (
        <>
            <Head>
                <title>{`${title} | My library`}</title>
            </Head>
            <DetailsPageStyles>
                <ImageStyles>
                    <div className="image-container">
                        <Image
                            className="image"
                            src={imageUrl}
                            alt="Article image"
                            layout="fill"
                        />
                    </div>
                </ImageStyles>
                <InfoStyles
                    ref={detailsRef}
                    maxHeight={showMore ? 'auto' : '70rem'}
                    shadow={
                        showMore
                            ? ''
                            : '0 -20px 35px 15px rgba(255, 255, 255, 0.9)'
                    }
                    paddingBottom={isOverflowing ? '6rem' : '3rem'}
                >
                    <div className="details-container">
                        <div className="header">
                            <div className="title">{title}</div>
                        </div>
                        <div className="author-info">
                            <div className="container-flex">
                                <div className="author-container">
                                    {authors && (
                                        <div className="author">
                                            <span className="label">
                                                Authors:{' '}
                                            </span>
                                            <span>{authors.join(', ')}</span>
                                        </div>
                                    )}
                                    {publishDate && (
                                        <div className="author">
                                            <span className="label">
                                                Published:
                                            </span>
                                            <span>{publishDate}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="description">{description}</div>
                    </div>
                    {isOverflowing && (
                        <div className="show-more" onClick={handleOverflow}>
                            <span>SHOW MORE</span>
                        </div>
                    )}
                </InfoStyles>
            </DetailsPageStyles>
        </>
    );
}

export async function getServerSideProps(context) {
    const { data: book } = await axios.get(
        `https://openlibrary.org/works/${context.params.id}.json`
    );

    const authorNames = [];

    for (let i = 0; i < book?.authors?.length; i++) {
        const { data: author } = await axios.get(
            `https://openlibrary.org${book.authors[i]?.author?.key}.json`
        );
        authorNames.push(author.name);
    }

    return {
        props: {
            id: book.key,
            title: book.title,
            description:
                book.description?.value === undefined
                    ? null
                    : book.description.value,
            authors: authorNames,
            imageUrl:
                book?.covers !== undefined
                    ? `http://covers.openlibrary.org/b/id/${book?.covers[0]}.jpg`
                    : '/open-book.png',
            publishDate:
                book.first_publish_date === undefined
                    ? null
                    : book.first_publish_date,
        },
    };
}

BookDetails.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.object,
    authors: PropTypes.array,
    imageUrl: PropTypes.string,
};
