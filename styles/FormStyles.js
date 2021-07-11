import { ButtonBase } from '@material-ui/core';
import styled from 'styled-components';
import ButtonStyles from './ButtonStyles';

const FormStyles = styled.form`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 4rem;
    .search-input {
        flex: 1;
        margin-right: 2rem;
        border: 2px solid var(--lightPurple);
        border-radius: 4px;
        padding: 1.5rem;
        font-size: 1.6rem;
        outline: none;
        background-color: #fefefecc;
        ::placeholder {
            font-weight: 700;
        }
        :hover,
        :focus {
            box-shadow: 0 0 4px 1px #668aff77;
        }
    }
`;

export const SelectBtn = styled(ButtonStyles)`
    padding: 0.7rem 2rem;
`;

export default FormStyles;
