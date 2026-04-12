import styled from "styled-components";

const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRowVertical>
      {label && <Label htmlFor={children.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRowVertical>
  );
}

export default FormRowVertical;
