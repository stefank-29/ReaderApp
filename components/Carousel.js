import { useState, useRef } from 'react';
import {
    FaBookmark,
    FaChevronLeft,
    FaChevronRight,
    FaRegBookmark,
    FaTimes,
} from 'react-icons/fa';
import CarouselStyles from '../styles/CarouselStyles';
import Card from './Card';

export default function Carousel({
    items,
    title,
    onBookmarkClick,
    onTimesClick,
    onReadClick,
    isMyList = false,
    haveReadCheck = false,
    icon = <FaRegBookmark className="bookmark" />,
}) {
    const [translate, setTranslate] = useState(0);

    const carouselRef = useRef();

    const move = 900;

    function moveLeft() {
        const translateRight = translate + move;
        if (translateRight > 0) {
            setTranslate(0);
        } else {
            setTranslate(translateRight);
        }
    }

    function moveRight() {
        const translateLeft = translate - move;
        const limit =
            -carouselRef.current.scrollWidth + carouselRef.current.offsetWidth;
        if (translateLeft < limit) {
            setTranslate(limit);
        } else {
            setTranslate(translateLeft);
        }
    }

    return (
        <CarouselStyles translate={translate}>
            <h1 className="title">{title}</h1>
            {isMyList && (
                <div className="times" onClick={onTimesClick}>
                    <FaTimes />
                </div>
            )}
            {items.length > 0 ? (
                <div className="container">
                    <div className="arrow left" onClick={moveLeft}>
                        <FaChevronLeft />
                    </div>
                    <div className="arrow right" onClick={moveRight}>
                        <FaChevronRight />
                    </div>

                    <div className="carousel" ref={carouselRef}>
                        {items.map((book) => (
                            <Card
                                authorKey={null}
                                authorName={null}
                                bookKey={book.key}
                                coverUrl={
                                    book.covers !== undefined
                                        ? `http://covers.openlibrary.org/b/id/${book.covers[0]}.jpg`
                                        : book.cover_i !== undefined
                                        ? `http://covers.openlibrary.org/b/id/${book.cover_i}.jpg`
                                        : book.imageUrl !== undefined
                                        ? `${book.imageUrl}`
                                        : '/open-book.png'
                                }
                                key={book.key}
                                publishYear={null}
                                title={book.title}
                                icon={icon}
                                haveReadCheck={haveReadCheck}
                                isRead={book.read}
                                onFavClick={onBookmarkClick}
                                onReadClick={onReadClick}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="info">The list is empty.</h3>
                    <p className="message">
                        As soon as you see the books you would like to read, add
                        them to the list!
                    </p>
                </>
            )}
        </CarouselStyles>
    );
}
