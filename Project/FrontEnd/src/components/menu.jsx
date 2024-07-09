import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import uniLogo from '../img/Avalon-Uni-S.png';
// Icons
import HomeIcon from '@mui/icons-material/Home';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import EventIcon from '@mui/icons-material/Event';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const Container = styled.div`
  flex: 1;
  z-index: 2;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;


const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Menu = ({darkMode, setDarkMode}) => {
    return(
        <Container>
            <Wrapper>
                
                <Logo>
                    <Img src={uniLogo} />
                    Avalon University
                </Logo>

                {/**Welcome Page */}
                <Link  to="welcome" style={{ textDecoration: "none", color: "inherit" }}>
                  <Item>
                      <HomeIcon />
                      Welcome
                  </Item>
                </Link>

                {/**Courses Page */}
                <Link  to="courses" style={{ textDecoration: "none", color: "inherit" }}>
                  <Item>
                      <CollectionsBookmarkIcon />
                      Courses
                  </Item>
                </Link>
                
                <Item>
                    <EventIcon />
                    Events
                </Item>
                <Item>
                    <LocalLibraryIcon />
                    Library
                </Item>

                <Item onClick = {() => setDarkMode(!darkMode)}>
                    <Brightness4Icon />
                    {darkMode ? "Light" : "Dark"} Mode
                </Item>
            </Wrapper>
        </Container>
    );
};

export default Menu;