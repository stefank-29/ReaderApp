import styled from 'styled-components';

const ModalStyles = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    background-color: rgba(0, 0, 0, 0.6);
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;
    z-index: 3;
    .container {
        position: relative;
        width: 50rem;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        background-color: #fefefe;
        border-radius: 24px;
        z-index: 5;
        .message {
            font-size: 2rem;
            font-family: Ubuntu, sans-serif;
        }
        .times {
            position: absolute;
            top: 3rem;
            right: 3rem;
            font-size: 2rem;
            cursor: pointer;
        }
    }
`;

export default ModalStyles;
