import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2.4rem;
  background:
    radial-gradient(circle at top left, rgba(99, 102, 241, 0.14), transparent 30%),
    linear-gradient(180deg, #f8faff 0%, #eef2ff 100%);
`;

const LoginCard = styled.section`
  width: min(100%, 48rem);
  background-color: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--color-grey-100);
  border-radius: 2rem;
  box-shadow: var(--shadow-lg);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Intro = styled.div`
  display: grid;
  gap: 1.2rem;
  text-align: center;

  p {
    color: var(--color-grey-600);
  }
`;

function Login() {
  return (
    <LoginLayout>
      <LoginCard>
        <Logo />
        <Intro>
          <Heading as="h2">Welcome back to Horizon Stay</Heading>
          <p>Sign in to manage cabins, bookings, and hotel settings.</p>
        </Intro>
        <LoginForm />
      </LoginCard>
    </LoginLayout>
  );
}

export default Login;
