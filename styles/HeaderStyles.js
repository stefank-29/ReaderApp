import styled from 'styled-components';

const HeaderStyles = styled.header`
    position: relative;
    width: 100%;
    background-color: #ffffff;
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        max-width: 1320px;
        padding: 3.5rem 5rem 4.5rem 0;
        .logo {
            position: relative;
            width: 7rem;
            height: 7rem;
            cursor: pointer;
        }
        .menu {
            display: flex;
            align-items: center;
            justify-content: center;
            & > * {
                margin-left: 2rem;
            }
            .item {
                display: flex;
                align-items: center;
                color: var(--darkGrey);
                font-weight: 700;
                font-size: 1.7rem;
                cursor: pointer;
                .icon {
                    margin-right: 0.5rem;
                    margin-top: 0.2rem;
                }
                .label {
                    :hover {
                        color: var(--black);
                    }
                }
            }
        }
    }
    @media all and (max-width: 1320px) {
        padding: 0 2rem;
    }
`;

export default HeaderStyles;
