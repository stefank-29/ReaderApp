import styled from 'styled-components';

const PaginationStyles = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem auto 3rem;
    .number {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.2rem 1rem;
        margin: 0 0.3rem;
        color: var(--red);
        font-weight: 700;
        background-color: #fefefe;
        border: none;
        border-radius: 5px;

        cursor: pointer;
        &.active {
            color: #fefefe;
            background-color: var(--red);
        }
    }
    .arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.2rem 1.5rem;
        margin: 0 2rem;
        color: #bfbfbf;
        border-radius: 5px;
        pointer-events: none;
        transition: background 0.3s ease-in-out;
        &.active {
            color: var(--red);
            cursor: pointer;
            pointer-events: auto;
            :hover {
                background-color: #851e3e55;
            }
        }
    }
`;

export default PaginationStyles;
