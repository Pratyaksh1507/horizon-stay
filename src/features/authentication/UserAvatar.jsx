import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const Name = styled.span`
  white-space: nowrap;
`;

function UserAvatar() {
  const { user } = useUser();

  const avatarSrc =
    user?.user_metadata?.avatar || user?.user_metadata?.avatarUrl || "/default-user.jpg";
  const fullName =
    user?.user_metadata?.fullName || user?.email?.split("@")[0] || "Account";

  return (
    <StyledUserAvatar>
      <Avatar src={avatarSrc} alt={fullName} />
      <Name>{fullName}</Name>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
