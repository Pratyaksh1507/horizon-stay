import styled, { keyframes } from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2.4rem;
  background: linear-gradient(135deg, #0f0f1a 0%, #1a1033 50%, #0d1a2e 100%);
  position: relative;
  overflow: hidden;

  /* Ambient glow */
  &::before {
    content: "";
    position: absolute;
    top: -20%;
    left: -10%;
    width: 50%;
    height: 60%;
    background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -20%;
    right: -10%;
    width: 40%;
    height: 50%;
    background: radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const LoginCard = styled.section`
  position: relative;
  z-index: 1;
  width: min(100%, 44rem);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  border-radius: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  padding: 4rem 3.6rem;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

const LogoBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

const LogoImg = styled.img`
  width: 7.2rem;
  height: 7.2rem;
  object-fit: contain;
  border-radius: 16px;
`;

const BrandName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  background: linear-gradient(90deg, #818cf8, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Intro = styled.div`
  display: grid;
  gap: 0.8rem;
  text-align: center;

  h2 {
    color: #f0f0fa;
    font-size: 2.2rem;
    font-weight: 600;
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.4rem;
  }
`;

const DemoHint = styled.div`
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 12px;
  padding: 1.4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const DemoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
`;

const DemoLabel = styled.span`
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
`;

const DemoValue = styled.code`
  color: #a5b4fc;
  font-size: 1.25rem;
  font-weight: 500;
`;

function Login() {
  return (
    <LoginLayout>
      <LoginCard>
        <LogoBrand>
          <LogoImg src="/horizon-stay-logo.png" alt="Horizon Stay" />
          <BrandName>HORIZON STAY</BrandName>
        </LogoBrand>

        <Intro>
          <Heading as="h2">Welcome back</Heading>
          <p>Sign in to manage your hotel dashboard</p>
        </Intro>

        <DemoHint>
          <DemoRow>
            <DemoLabel>Email</DemoLabel>
            <DemoValue>demo@horizonstay.com</DemoValue>
          </DemoRow>
          <DemoRow>
            <DemoLabel>Password</DemoLabel>
            <DemoValue>demo1234</DemoValue>
          </DemoRow>
        </DemoHint>

        <LoginForm />
      </LoginCard>
    </LoginLayout>
  );
}

export default Login;
