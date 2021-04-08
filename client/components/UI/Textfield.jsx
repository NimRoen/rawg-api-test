import styled from 'styled-components';

const Textfield = styled(props => <input type='text' {...props} />)`
  height: 30px;
  border-radius: 8px;
`;

export default Textfield;
