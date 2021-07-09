import { useRouter } from 'next/router';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PaginationStyles from '../styles/PaginationStyles';

export default function Pagination({ numOfPages, currPage }) {
    const router = useRouter();

    function prevPage() {
        if (currPage > 1) {
            router.push(`/search/${router.query.text}/?page=${currPage - 1}`);
        }
    }

    function nextPage() {
        if (currPage < numOfPages) {
            router.push(`/search/${router.query.text}/?page=${currPage + 1}`);
        }
    }

    function changeToPage(page) {
        router.push(`/search/${router.query.text}/?page=${page}`);
    }

    return (
        <PaginationStyles>
            <span
                className={`arrow ${currPage > 1 ? 'active' : ''}`}
                onClick={prevPage}
            >
                <FaChevronLeft />
            </span>
            {[...Array(numOfPages)].map((_, index) => {
                if (numOfPages > 10) {
                    if (
                        index == 0 ||
                        index == 1 ||
                        index == numOfPages - 1 ||
                        index == numOfPages - 2 ||
                        (index > currPage - 4 && index < currPage + 3)
                    ) {
                        return (
                            <div
                                key={index}
                                className={`number ${
                                    currPage === index + 1 ? 'active' : ''
                                }`}
                                onClick={() => changeToPage(index + 1)}
                            >
                                {index + 1}
                            </div>
                        );
                    }
                    if (
                        (currPage >= 6 && index == 2) ||
                        (currPage <= numOfPages - 6 && index == numOfPages - 3)
                    ) {
                        return <div key={index}>...</div>;
                    }
                } else {
                    return (
                        <div
                            key={index}
                            className={`number ${
                                currPage === index + 1 ? 'active' : ''
                            }`}
                            onClick={() => changeToPage(index + 1)}
                        >
                            {index + 1}
                        </div>
                    );
                }
            })}
            <span
                className={`arrow ${currPage < numOfPages ? 'active' : ''}`}
                onClick={nextPage}
            >
                <FaChevronRight />
            </span>
        </PaginationStyles>
    );
}
