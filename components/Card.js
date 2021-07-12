import CardStyles from '../styles/CardStyles';
import Image from 'next/image';
import {
    FaBookmark,
    FaCheckCircle,
    FaRegBookmark,
    FaTimesCircle,
} from 'react-icons/fa';
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import { onClickOutside } from 'react-onclickoutside';

export default function Card({
    title,
    authorKey,
    authorName,
    coverUrl,
    publishYear,
    bookKey,
    onFavClick,
    onReadClick,
    isRead,
    haveReadCheck,
    icon = <FaRegBookmark className="bookmark" onClick={onFavClick} />,
}) {
    return (
        <Link href={`${bookKey}`} passHref>
            <CardStyles>
                <div className={`container ${isRead ? 'checked' : ''}`}>
                    <div
                        onClick={(e) =>
                            onFavClick(
                                e,
                                bookKey,
                                authorName,
                                coverUrl,
                                publishYear
                            )
                        }
                    >
                        {icon}
                    </div>
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
                        <div
                            className={`read ${isRead ? 'check' : ''}`}
                            onClick={(e) => onReadClick(e, bookKey)}
                        >
                            {haveReadCheck && (
                                <>
                                    <span className="read-label">Read: </span>
                                    {isRead ? (
                                        <FaCheckCircle className="icon" />
                                    ) : (
                                        <FaTimesCircle className="icon" />
                                    )}
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
