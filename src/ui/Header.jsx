import styled from "styled-components";
import { format } from "date-fns";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useLogout } from "../features/authentication/useLogout";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 0 3.2rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6.4rem;
  grid-column: 2;
`;

const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-grey-900);
  letter-spacing: -0.02em;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const DateBadge = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-grey-500);
  padding: 0.5rem 1.2rem;
  background: var(--color-grey-100);
  border-radius: 100px;
  margin-right: 0.8rem;
`;

function Header() {
  const { logout, isPending } = useLogout();

  return (
    <StyledHeader>
      <PageTitle>Dashboard</PageTitle>

      <RightGroup>
        <DateBadge>{format(new Date(), "MMM dd, yyyy").toUpperCase()}</DateBadge>
        <DarkModeToggle />
        <ButtonIcon onClick={logout} disabled={isPending} title="Log out">
          <HiArrowRightOnRectangle />
        </ButtonIcon>
      </RightGroup>
    </StyledHeader>
  );
}

export default Header;
