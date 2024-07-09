import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  padding: 0px 250px;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  height: 50%;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-style: italic;
  font-size: 24px;
`;

const Intro = styled.h2`
  padding-top: 20px;
  font-size: 20px;
  font-weight: 300;
`;


const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Welcome = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Welcome to Avalon University</Title>
        <Intro>
            Welcome to Avalon University, a beacon of innovation and tradition nestled in the heart of the UK. At Avalon, we believe in fostering a 
            community where diverse minds converge to push the boundaries of what is possible. Our university stands on the legendary ideals of 
            Avalon, a place of myth and inspiration, where each student's journey is revered as a quest for knowledge and personal growth.
        </Intro>

        <Intro>
            Founded with a vision to blend rigorous academic standards with groundbreaking research, Avalon University offers a wide array of 
            programs across the sciences, humanities, and arts. Our campus is a vibrant ecosystem of ideas, with state-of-the-art facilities and 
            resources that support our students and faculty in achieving excellence.
        </Intro>

        <Intro>
            At Avalon, we are committed to preparing our students for the challenges of the future, equipping them with the skills and resilience 
            needed to excel in their chosen fields and make a meaningful impact on the world. Our alumni network spans the globe, embodying the 
            values and ethos of Avalon in every corner of industry and academia.
        </Intro>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Welcome;
