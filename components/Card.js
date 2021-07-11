import CardStyles from '../styles/CardStyles';
import Image from 'next/image';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Link from 'next/link';
import { PropTypes } from 'prop-types';

export default function Card({
    title,
    authorKey,
    authorName,
    coverUrl,
    publishYear,
    bookKey,
    onFavClick,
    icon = <FaRegBookmark className="bookmark" onClick={onFavClick} />,
}) {
    return (
        <Link href={`${bookKey}`} passHref>
            <CardStyles>
                <div className="container">
                    {icon}
                    <div className="image-container">
                        <Image
                            src={coverUrl}
                            alt="book image"
                            layout="fill"
                            className="image"
                        />
                    </div>
                    <div className="book-info">
                        <p className="title">{title}</p>
                        <div className="author">
                            {authorName && (
                                <>
                                    <span>by </span>
                                    <span className="name">
                                        {authorName?.slice(0, 3).join(', ')}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="published">
                            {publishYear && (
                                <>
                                    <span>First published in </span>
                                    <span>{publishYear}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </CardStyles>
        </Link>
    );
}

Card.propTypes = {
    title: PropTypes.string,
    authorKey: PropTypes.array,
    authorName: PropTypes.array,
    coverUrl: PropTypes.string,
    publishYear: PropTypes.number,
    bookKey: PropTypes.string,
};
