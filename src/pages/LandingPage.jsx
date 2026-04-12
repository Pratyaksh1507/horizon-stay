import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineHomeModern,
  HiOutlineLockClosed,
  HiOutlineMoon,
  HiOutlineUsers,
} from "react-icons/hi2";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f1a 0%, #1a1033 50%, #0d1a2e 100%);
  color: #e8e8e8;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem 6.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const NavBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const BrandIcon = styled.div`
  width: 3.6rem;
  height: 3.6rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
`;

const BrandName = styled.span`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  background: linear-gradient(90deg, #818cf8, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavActions = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const GhubLink = styled.a`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.4rem;
  text-decoration: none;
  transition: color 0.2s;
  &:hover { color: white; }
`;

const Hero = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 3.2rem 4rem;
  animation: ${fadeIn} 0.8s ease both;
`;

const Badge = styled.span`
  display: inline-block;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.4);
  color: #a5b4fc;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.6rem 1.6rem;
  border-radius: 100px;
  margin-bottom: 2.4rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(3.6rem, 7vw, 7.2rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSub = styled.p`
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 56rem;
  line-height: 1.7;
  margin-bottom: 4rem;
`;

const FeatureRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
  margin-bottom: 5.6rem;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.75);

  svg {
    width: 1.6rem;
    height: 1.6rem;
    color: #818cf8;
  }
`;

const DemoCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3.2rem 4rem;
  max-width: 44rem;
  width: 100%;
  margin-bottom: 3.2rem;
  backdrop-filter: blur(12px);
`;

const DemoTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #818cf8;
  margin-bottom: 1.6rem;
`;

const DemoField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &:last-child {
    border-bottom: none;
  }
`;

const DemoLabel = styled.span`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.5);
`;

const DemoValue = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  font-family: "Courier New", monospace;
  color: #e8e8e8;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.4rem 1rem;
  border-radius: 6px;
  border: 1px solid rgba(99, 102, 241, 0.2);
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.4rem 3.2rem;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
  }
  &:active {
    transform: translateY(0);
  }
`;

const Stack = styled.section`
  text-align: center;
  padding: 4rem 3.2rem 6.4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const StackTitle = styled.p`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 2rem;
`;

const StackTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
`;

const Tag = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.4rem 1.2rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
`;

const FEATURES = [
  { icon: <HiOutlineCalendarDays />, label: "Booking management" },
  { icon: <HiOutlineHomeModern />, label: "Cabin CRUD" },
  { icon: <HiOutlineChartBar />, label: "Revenue analytics" },
  { icon: <HiOutlineUsers />, label: "Guest tracking" },
  { icon: <HiOutlineLockClosed />, label: "Auth & protected routes" },
  { icon: <HiOutlineMoon />, label: "Dark / Light mode" },
];

const TECH = [
  "React 18",
  "React Router v6",
  "Supabase",
  "React Query",
  "Styled Components",
  "Recharts",
  "React Hook Form",
  "Vite",
];

function LandingPage() {
  return (
    <Page>
      <Nav>
        <NavBrand>
          <BrandIcon>🏨</BrandIcon>
          <BrandName>HORIZON STAY</BrandName>
        </NavBrand>
        <NavActions>
          <GhubLink
            href="https://github.com/Pratyaksh1507"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </GhubLink>
        </NavActions>
      </Nav>

      <Hero>
        <Badge>Hotel Management SaaS • Full Stack</Badge>
        <HeroTitle>
          The modern dashboard
          <br />
          for boutique hotels.
        </HeroTitle>
        <HeroSub>
          A production-grade hotel management system built with React, Supabase,
          and React Query. Manage bookings, cabins, and analytics — all in one
          place.
        </HeroSub>

        <FeatureRow>
          {FEATURES.map((f) => (
            <Feature key={f.label}>
              {f.icon} {f.label}
            </Feature>
          ))}
        </FeatureRow>

        <DemoCard>
          <DemoTitle>🔑 Demo Access</DemoTitle>
          <DemoField>
            <DemoLabel>Email</DemoLabel>
            <DemoValue>demo@horizonstay.com</DemoValue>
          </DemoField>
          <DemoField>
            <DemoLabel>Password</DemoLabel>
            <DemoValue>demo1234</DemoValue>
          </DemoField>
        </DemoCard>

        <CTAButton to="/login">Enter Dashboard →</CTAButton>
      </Hero>

      <Stack>
        <StackTitle>Built With</StackTitle>
        <StackTags>
          {TECH.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </StackTags>
      </Stack>
    </Page>
  );
}

export default LandingPage;
