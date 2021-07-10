import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CarouselStyles from '../styles/CarouselStyles';
import Card from './Card';

export default function Carousel({ items, title }) {
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
                                        : '/open-book.png'
                                }
                                key={book.key}
                                publishYear={null}
                                title={book.title}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="info">
                        You don&apos;t have any saved articles yet
                    </h3>
                    <p className="message">
                        As soon as you see articles that you like, add them to
                        your wish list! So you won&apos;t miss a sale.
                    </p>
                </>
            )}
        </CarouselStyles>
    );
}
