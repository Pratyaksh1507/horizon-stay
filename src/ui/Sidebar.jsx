import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiOutlinePlus,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";
import UserAvatar from "../features/authentication/UserAvatar";

/* ── Shell ── */
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  grid-row: 1 / -1;
  overflow-y: auto;
`;

/* ── Brand ── */
const Brand = styled.div`
  padding: 2rem 2rem 1.6rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const BrandInner = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const LogoImg = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const BrandName = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-grey-900);
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

const BrandTagline = styled.p`
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-brand-500);
`;

/* ── Nav ── */
const NavSection = styled.nav`
  flex: 1;
  padding: 1.6rem 1.2rem;
  overflow-y: auto;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.1rem 1.4rem;
  border-radius: var(--border-radius-sm);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-grey-500);
  transition: all 0.2s;

  svg {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    transition: color 0.2s;
  }

  &:hover {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
  }

  &.active {
    color: var(--color-grey-900);
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.15) 0%,
      rgba(99, 102, 241, 0.06) 100%
    );
    border: 1px solid rgba(99, 102, 241, 0.2);

    svg {
      color: var(--color-brand-500);
    }
  }
`;

/* ── Bottom section ── */
const BottomSection = styled.div`
  padding: 1.6rem 1.2rem;
  border-top: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const NewBookingBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  padding: 1.1rem;
  border-radius: var(--border-radius-sm);
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

  svg { width: 1.8rem; height: 1.8rem; }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
  }
`;

const HelpLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.2rem;
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  color: var(--color-grey-500);
  transition: all 0.2s;

  svg { width: 1.8rem; height: 1.8rem; }

  &:hover { color: var(--color-grey-800); background-color: var(--color-grey-100); }
`;

const UserSection = styled.div`
  padding: 1.4rem 1.2rem;
  border-top: 1px solid var(--color-grey-100);
`;

const NAV_ITEMS = [
  { to: "/dashboard", icon: <HiOutlineHome />, label: "Dashboard" },
  { to: "/bookings",  icon: <HiOutlineCalendarDays />, label: "Bookings" },
  { to: "/cabins",    icon: <HiOutlineHomeModern />, label: "Cabins" },
  { to: "/users",     icon: <HiOutlineUsers />, label: "Users" },
  { to: "/settings",  icon: <HiOutlineCog6Tooth />, label: "Settings" },
];

function Sidebar() {
  return (
    <StyledSidebar>
      {/* Brand — clickable, goes to dashboard */}
      <Brand as={Link} to="/dashboard" style={{ textDecoration: "none" }}>
        <BrandInner>
          <LogoImg src="/horizon-stay-logo.png" alt="Horizon Stay Logo" />
          <BrandText>
            <BrandName>Horizon Stay</BrandName>
            <BrandTagline>Premium Management</BrandTagline>
          </BrandText>
        </BrandInner>
      </Brand>

      {/* Navigation */}
      <NavSection>
        <NavList>
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <li key={to}>
              <StyledNavLink to={to}>
                {icon}
                <span>{label}</span>
              </StyledNavLink>
            </li>
          ))}
        </NavList>
      </NavSection>

      {/* User */}
      <UserSection>
        <UserAvatar />
      </UserSection>
    </StyledSidebar>
  );
}

export default Sidebar;
