import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";
import api from "../services/api";

//3. Using Parameters that been passed from other components
const Container = styled.div`
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
  display: flex
  gap: 10px;

`;

const Image = styled.img`
  width: 100%;
  height: 202px;
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;


//1. Passing 'type' value from other Components so we can use the value in this component
const Card = ({lecture}) => {

  //---> Getting Lecturer from lecture
  const [lecturer, setLecturer] = useState({});
  //- UseEffect for when ever load the page
  useEffect(() => {
    const fetchData = async () => {
      //Using 'Axios' to fetch data
      const res = await api.get(`/users/find/${lecture.lecturer}`);
      setLecturer(res.data);
    }
    fetchData();
  }, [lecture.lecturer])



  return (
    <Link to={`/lecture/${lecture._id}`} style={{ textDecoration: "none" }}>

      {/* 2. The parameter passed 'type' will be used in 'Container' styled-component  */}
      <Container>
        <Image
          src={lecture.imgUrl}
        />
        <Details>
          <ChannelImage
            src={lecturer.img}
          />
          <Texts>
            <Title>{lecture.title}</Title>
            <ChannelName>{lecturer.username}</ChannelName>
            <Info>Created: {format(lecture.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
