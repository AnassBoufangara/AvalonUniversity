import React, { useState } from "react";
import styled from "styled-components";

// Styled components
const Box = styled.div`
  padding-bottom: ${(props) => (props.box1Style ? "20px" : "0")};
`;

const Header = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
`;

const Content = styled.div`
  height: ${(props) => (props.isOpen ? "300px" : "0")};
  overflow: hidden;
  transition: height 0.7s ease-in-out;
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  padding: ${(props) => (props.isOpen ? "10px" : "0 10px")};
`;

const HeadTitle = styled.h3`
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-style: italic;
`;

const Arrow = styled.span`
  font-size: 24px;
`;

function ExpandableBox({ title, children, box1Style }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box box1Style={box1Style}>
      <Header onClick={toggleBox}>
        <HeadTitle>{title}</HeadTitle>
        <Arrow>{isOpen ? "▲" : "▼"}</Arrow>
      </Header>
      <Content isOpen={isOpen}>
        {children}
      </Content>
    </Box>
  );
}

export default ExpandableBox;
