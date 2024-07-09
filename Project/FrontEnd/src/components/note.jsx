import React from "react";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;



const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Note = (note) => {
  console.log("----------------------- Note Section");
  console.log(note.note.content);
  return (
    <Container>
      <Details>
        <Name>
          {note.note.type+":"} <Date>{format(note.note.createdAt)}</Date>
        </Name>
        <Text>
          {note.note.content}
        </Text>
      </Details>
    </Container>
  );
};

export default Note;
