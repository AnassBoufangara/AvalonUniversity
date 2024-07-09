import { useState } from "react";

import { darkTheme, lightTheme } from "./utils/themes";
import LogIn from "./pages/logIn";
import { Router, Routes, Route, Switch, useLocation, BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import TopBar from "./components/topBar";
import Menu from "./components/menu";
import Welcome from "./pages/welcome";
import Courses from "./pages/courses";
import Lecture from "./pages/lecture";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  // Function to check if the current route is the login page
  const isLoginPage = location.pathname === "/";
  console.log(isLoginPage);

  return (
    <ThemeProvider theme = { darkMode ? darkTheme : lightTheme }>
        <Container>
            {!isLoginPage && <Menu darkMode={darkMode} setDarkMode={setDarkMode} />}
            <Main>
              {!isLoginPage && <TopBar />}
              <Wrapper>
                  <Routes>
                      <Route path="/">
                        <Route index element={ <LogIn />} />
                        <Route path="welcome" element={ <Welcome />} />
                        <Route path="courses" element={ <Courses />} />
                        <Route path="lecture">
                          <Route path=":id" element={<Lecture />} />
                        </Route>
                      </Route>
                  </Routes>
              </Wrapper>
            </Main>
        </Container>
    </ThemeProvider>
  );
}

export default App;
