import styled from 'styled-components';
import FormStyles from './FormStyles';

const SelectStyles = styled(FormStyles)`
    width: 70%;
    .sort {
        display: flex;
        align-items: center;
        justify-content: center;
        .label {
            margin-right: 1.5rem;
        }
        .select {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.7rem 1rem;
            margin-right: 2rem;
            min-width: 10rem;
            background-color: #fefefeaa;
            box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            .selected {
                font-weight: 500;
                color: var(--darkBlue);
            }
            .arrow {
                margin-top: 0.2rem;
                margin-left: 0.2rem;
            }
        }
    }
`;

export default SelectStyles;
