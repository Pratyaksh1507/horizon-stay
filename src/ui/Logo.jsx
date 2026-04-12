import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const LogoSvg = styled.svg`
  height: 9.6rem;
  width: auto;
`;

const LogoText = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-brand-600);
  letter-spacing: 0.05em;
  margin-top: 0.8rem;
`;

function Logo() {
  return (
    <StyledLogo>
      <LogoSvg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Building / hotel silhouette */}
        <rect x="10" y="30" width="60" height="44" rx="3" fill="var(--color-brand-600)" opacity="0.15" />
        <rect x="10" y="30" width="60" height="44" rx="3" stroke="var(--color-brand-600)" strokeWidth="2" />
        {/* Roof / horizon line */}
        <path d="M4 32 Q40 14 76 32" stroke="var(--color-brand-500)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Windows row 1 */}
        <rect x="18" y="40" width="10" height="8" rx="1.5" fill="var(--color-brand-500)" opacity="0.7" />
        <rect x="35" y="40" width="10" height="8" rx="1.5" fill="var(--color-brand-500)" opacity="0.7" />
        <rect x="52" y="40" width="10" height="8" rx="1.5" fill="var(--color-brand-500)" opacity="0.7" />
        {/* Windows row 2 */}
        <rect x="18" y="54" width="10" height="8" rx="1.5" fill="var(--color-brand-400)" opacity="0.5" />
        <rect x="52" y="54" width="10" height="8" rx="1.5" fill="var(--color-brand-400)" opacity="0.5" />
        {/* Door */}
        <rect x="33" y="58" width="14" height="16" rx="2" fill="var(--color-brand-600)" opacity="0.8" />
        {/* Sun / horizon dot */}
        <circle cx="40" cy="22" r="4" fill="var(--color-brand-500)" opacity="0.8" />
      </LogoSvg>
      <LogoText>HORIZON STAY</LogoText>
    </StyledLogo>
  );
}

export default Logo;
