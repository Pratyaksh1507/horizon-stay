import styled from "styled-components";

const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const IconBox = styled.div`
  width: 4.4rem;
  height: 4.4rem;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => {
    const map = {
      blue:   "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.08))",
      green:  "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))",
      indigo: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.08))",
      yellow: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.08))",
    };
    return map[color] || map.blue;
  }};

  svg {
    width: 2.2rem;
    height: 2.2rem;
    color: ${({ color }) => {
      const map = { blue: "#60a5fa", green: "#34d399", indigo: "#818cf8", yellow: "#fbbf24" };
      return map[color] || map.blue;
    }};
  }
`;

const TrendBadge = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 100px;
  background: ${({ positive }) =>
    positive ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)"};
  color: ${({ positive }) => (positive ? "#34d399" : "#f87171")};
`;

const Label = styled.p`
  font-size: 1.15rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-grey-900);
  letter-spacing: -0.02em;
  line-height: 1;
`;

function Stat({ icon, title, value, color, trend }) {
  const isPositive = !trend || trend >= 0;

  return (
    <StyledStat>
      <TopRow>
        <IconBox color={color}>{icon}</IconBox>
        {trend !== undefined && (
          <TrendBadge positive={isPositive}>
            {isPositive ? "+" : ""}{trend}%
          </TrendBadge>
        )}
      </TopRow>
      <Label>{title}</Label>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
