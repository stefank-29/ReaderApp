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
import AuthorInfoStyles from '../../styles/AuthorInfo';

const DetailsPageStyles = styled.div`
    width: 100%;
    display: flex;
    padding: 4rem 0;
`;

export default function AuthorDetails({
    bio,
    birthDate,
    name,
    imageUrl,
    wikipedia,
    works,
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
                <title>{`${name} | My library`}</title>
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
                <AuthorInfoStyles
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
                            <div className="title">{name}</div>
                        </div>
                        <div className="author-info">
                            <div className="container-flex">
                                <div className="author-container">
                                    {birthDate && (
                                        <div className="author">
                                            <span className="label">
                                                Birth:{' '}
                                            </span>
                                            <span>{birthDate}</span>
                                        </div>
                                    )}
                                    {/* {publishDate && (
                                        <div className="author">
                                            <span className="label">
                                                Published:
                                            </span>
                                            <span>{publishDate}</span>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                        <div className="bio">{bio}</div>
                    </div>
                    {isOverflowing && (
                        <div className="show-more" onClick={handleOverflow}>
                            <span>SHOW MORE</span>
                        </div>
                    )}
                </AuthorInfoStyles>
            </DetailsPageStyles>
        </>
    );
}

export async function getServerSideProps(context) {
    const { data: authorData } = await axios.get(
        `https://openlibrary.org/authors/${context.params.id}.json`
    );

    const { data: authorWorks } = await axios.get(
        `https://openlibrary.org/authors/${context.params.id}/works.json`
    );

    //image

    console.log(authorData);

    return {
        props: {
            name: authorData.personal_name,
            imageUrl:
                authorData?.photos !== undefined
                    ? `http://covers.openlibrary.org/b/id/${authorData?.photos[0]}.jpg`
                    : '/writer.png',
            wikipedia:
                authorData?.wikipedia !== undefined
                    ? authorData?.wikipedia
                    : null,
            bio: authorData?.bio !== undefined ? authorData?.bio.value : null,
            birthDate:
                authorData?.birth_date !== undefined
                    ? authorData?.birth_date
                    : null,
            works: authorWorks.entries,
        },
    };
}

AuthorDetails.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.object,
    authors: PropTypes.array,
    imageUrl: PropTypes.string,
};
