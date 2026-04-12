import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 3.2rem 4rem 5rem;
  overflow-y: auto;
  grid-column: 2;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      {/* Sidebar spans both rows via grid-row: 1/-1 */}
      <Sidebar />
      {/* Header is column 2, row 1 */}
      <Header />
      {/* Main is column 2, row 2 */}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
