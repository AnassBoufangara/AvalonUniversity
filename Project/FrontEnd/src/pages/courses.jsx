import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/cards";
import api from "../services/api";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Courses = () => {

  //---> Fetching data using Express API
  const [lectures, setLectures] = useState([]);

  //--> UseEffect for when ever load the page, call fetchingCourses() function
  useEffect(() => {
    const fetchLectures = async () => {
      //Using 'Axios' to fetch data
      const res = await api.get("/lectures");
      console.log(res.data);
      setLectures(res.data);
    }
    fetchLectures();
  }, [])

  return (
    <Container>
      {lectures.map((lecture) => (
        <Card key={lecture._id} lecture={lecture}/>
      ))}
    </Container>
  );
};

export default Courses;
