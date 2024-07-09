import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Note from "./note";
import api from "../services/api";


const Container = styled.div``;

const NotesTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Notes = ({lectureId, fetchNotes}) => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        console.log("From Notes");
        console.log(lectureId);
        const notesRes = await api.get(`/notes/${lectureId}`);
        console.log(notesRes.data);
        setNotes(notesRes.data);

      } catch(err) {
        console.log('----------Notes Error');
        console.log(err);
      }
    }
    fetchNotes()
  }, [lectureId, fetchNotes]);
  return (
    <Container>
      <NotesTitle>
        Notes
      </NotesTitle>
      {
        notes.map(note => (
          <Note key={note._id} note={note} />
        ))
      }
    </Container>
  );
};

export default Notes;
