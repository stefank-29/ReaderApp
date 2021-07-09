import styled from 'styled-components';

const CardStyles = styled.div`
    display: flex;
    .container {
        position: relative;
        display: flex;
        flex-direction: column;
        margin-left: 0;
        width: 100%;
        background-color: #fefefe;
        border-radius: 5px;
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        :hover {
            box-shadow: 0 0 7px 3px rgba(0, 0, 0, 0.2);
        }
        .bookmark {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            color: #ffffff;
            font-size: 2rem;
            z-index: 10;
            user-select: none;
            z-index: 5;
            :hover {
                color: var(--red);
            }
            &.checked {
                color: var(--red);
                :hover {
                }
            }
        }
        .image-container {
            position: relative;
            width: 100%;
            height: 22rem;
            background-color: #e3e3e3;
            border-radius: 5px 5px 0 0;
            .image {
                object-fit: contain;
                border-radius: 5px 5px 0 0;
            }
        }
        .book-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 1rem;
            .title {
                margin: 0.5rem 0 auto;
                font-size: 1.6rem;
                font-weight: 500;
            }
            .author {
                margin: 1rem 0;
                font-size: 1.3rem;
                .name {
                    font-size: 1.5rem;
                    font-weight: 500;
                }
            }
            .published {
                height: 1.6rem;
                font-size: 1.2rem;
            }
        }
    }
`;

export default CardStyles;
