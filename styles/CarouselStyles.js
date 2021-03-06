import styled from 'styled-components';

const CarouselStyles = styled.div`
    position: relative;
    margin: 2rem 0;
    padding: 0rem 2.5rem;
    background-color: #fefefe;
    .title {
        padding: 1.5rem 0 1rem;
        font-family: Ubuntu, sans-serif;
    }
    .info {
        font-size: 2.5rem;
        margin: 4rem 0;
        font-weight: 500;
    }
    .message {
        font-size: 1.8rem;
    }
    .times {
        position: absolute;
        top: 2rem;
        right: 2rem;
        font-size: 2.5rem;
        cursor: pointer;
    }

    .container {
        width: 100%;
        overflow-x: hidden;

        .carousel {
            padding: 0 0.5rem;
            width: 100%;
            height: 100%;
            display: flex;
            transition: all 1s ease-in-out;
            transform: translateX(${(props) => props.translate + 'px'});
        }
        :hover {
            .arrow {
                opacity: 1;
            }
        }
        .arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2.5rem 1.5rem;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: #fefefe;
            cursor: pointer;
            z-index: 5;
            opacity: 0;
            transition: all 0.5s ease-in-out;
            &.left {
                left: 1rem;
                border-radius: 0 20px 20px 0;
                box-shadow: 5px 0 5px 1px rgba(0, 0, 0, 0.2);
            }
            &.right {
                right: 1rem;
                border-radius: 20px 0 0 20px;
                box-shadow: -5px 0 5px 1px rgba(0, 0, 0, 0.2);
            }
        }
        .right-arrow {
            position: absolute;
            right: 1rem;
            top: 50%;
            z-index: 5;
        }

        /* card */
        .container {
            width: 25rem;
            margin: 2rem 2rem 2rem 0;
            .book-info {
                .title {
                    padding: 0;
                }
            }
        }
    }
`;

export default CarouselStyles;
