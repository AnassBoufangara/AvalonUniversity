import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ExpandableBox from "../components/expandableBox";
import Notes from "../components/notes";
//import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import { format } from "timeago.js";


const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 6;
`;
const VideoWrapper = styled.div`
position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 40px);
  cursor: pointer; /* Change cursor to indicate clickable */
  z-index: 10; /* Ensure overlay is above the iframe */
`;


const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Transcription = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;


// Tanscription Style


const StyledTextArea = styled.textarea`
  width: 100%;
  height: 250px;
  margin-top: 10px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index:2;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  margin-top: 10px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow 0.4s;

  &:hover {
    box-shadow: 4px 2px 6px rgba(0, 0, 0, 0.4); // Apply shadow on hover
  }
`;


const StyledButton2 = styled.button`
  padding: 8px 16px;
  margin-top: 10px;
  margin-right: 10px;
  background-color: ${(props) => props.isRecording ? "rgb(238 108 81)" : "rgb(17 166 131)"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow 0.4s;

  &:hover {
    box-shadow: 4px 2px 6px rgba(0, 0, 0, 0.4); // Apply shadow on hover
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;




const Lecture = () => {

 //************************************ Fetchin User&Lecture Data ************************************//
  //-----> Gett current user data
  const {currentUser} = useSelector((state) => state.user);
  console.log("##################### Current User");
  console.log(currentUser);
  //const useDispatch = useDispatch();

  //-----> Using 'UseLocation() hook' to fetch lecture in the 'Card' component
  const path = useLocation().pathname.split("/")[2];
  console.log(useLocation().pathname);
  console.log(path);

  // For Testing
  const [videoSrc, setVideoSrc] = useState("");
  // Get Lecture Information
  const [lecture, setLecture] = useState({});
  const [lecturerInfo, setLecturerInfo] = useState({});

  useEffect(() => {
    console.log("-----------> Start feting the data");
    const fetchData = async () => {
      try {
        console.log("..........");
        console.log(path);
        const lectureRes = await api.get(`/lectures/find/${path}`);
        console.log("The Fetch data Res:");
        console.log(lectureRes);
        const lecturerRes = await api.get(`/users/find/${lectureRes.data.lecturer}`)
      
        setLecture(lectureRes.data);
        setLecturerInfo(lecturerRes.data);
        setVideoSrc(lectureRes.data.videoUrl + "?autoplay=0");
        console.log(lectureRes.data.videoUr);
      } catch (err) {
        console.log("--------- Err:");
        console.log(err);
      }
    };
    fetchData();
  }, [path])
 //************************************ Fetchin User&Lecture Data ************************************//
 const [fetchNotes, setFetchNotes] = useState(false);

 const refreshNotes = () => {
  setFetchNotes(prevFetchNotes => !prevFetchNotes);
};

 //************************************ Speech Recognition States ************************************//

  const { transcript, resetTranscript} = useSpeechRecognition();

  // State for Video PLaying
  const [videoPlaying, setVideoPlaying] = useState(false);
  // State for Speech Recording
  const [isRecording, setIsRecording] = useState(false);

  // TextArea: Video
  const [videoTA, setVideoTA] = useState("");
  // TextArea: Speech
  const [speechTA, setSpeechTA] = useState("");

   //************************************ Speech Recognition States ************************************//

    // Effect to manage starting and stopping the speech recognition
    useEffect(() => {
      if (videoPlaying || isRecording) {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
      } else {
       resetTranscript();
        SpeechRecognition.stopListening();
      }
    }, [videoPlaying, isRecording, resetTranscript]);
  

    
    useEffect(() => {
      if (videoPlaying==false && isRecording==false) {
        console.log(!videoPlaying);
        console.log(!isRecording);
        SpeechRecognition.stopListening();
      }
    }, [videoPlaying, isRecording]);


  useEffect(() => {
    if(videoPlaying) {
      setVideoTA(transcript);
      setVideoNotes(transcript);
    }
    if(isRecording) {
      setSpeechTA(transcript);
      setSpeechNotes(transcript)
    }

    
  }, [transcript, videoPlaying, isRecording])



  // Notes:
  const [videoNotes, setVideoNotes] = useState("");
  const [speechNotes, setSpeechNotes] = useState("");


  //-----> Handdling Events:
  //--> Saving Notes
  const handleVideoNotes = async () => {
    try {
      const content = videoNotes;
      const type = "Video";
      const lect  = lecture._id;

      const res = await api.post("/notes/", {
        content: content,
        type: type,
        lecture: lect
      })
      console.log(res.data);
      setVideoNotes("");
      refreshNotes();
    } catch(err) {
      console.log("######### Notes Error:");
      console.log(err);
    }
    console.log("Video Notes: ", videoNotes);
  };

  
  const handleSpeechNotes = async () => {
    try {
      const content = speechNotes;
      const type = "Speech";
      const lect  = lecture._id;

      const res = await api.post("/notes/", {
        content: content,
        type: type,
        lecture: lect
      })
      console.log(res.data);
      setSpeechNotes("");
      refreshNotes();
    } catch(err) {
      console.log("######### Notes Error:");
      console.log(err);
    }
    console.log("Video Notes: ", speechNotes);
  }

 
  //--> Handling Speech recognition Tasks
  // Video
  const handleOverlayClick = () => {
    console.log("Handle Click!");
    setVideoPlaying(!videoPlaying);
    if (videoPlaying) {
      //resetTranscript();
      //SpeechRecognition.stopListening();
      setVideoSrc(lecture.videoUrl + "?autoplay=0");
    } else {
      console.log("Start Recording!");
      //SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
      setVideoSrc(lecture.videoUrl + "?autoplay=1");
    }
  };

  // Speech
  const handleRecording = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? "* Stop Recording!" : "* Start Recording!");
    if (isRecording) {
      //resetTranscript();
      //SpeechRecognition.stopListening();
    } else {
      //SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }
  };




  return (
    <Container>
      <Content>
        <VideoWrapper>
          <Overlay onClick={handleOverlayClick} />
            <iframe
              width="100%"
              height="720"
              src={videoSrc}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
        </VideoWrapper>
        <Title>{lecture.title}</Title>
        <Details>
          <Info>Created: {format(lecture.createdAt)}</Info>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={lecturerInfo.img} />
            <ChannelDetail>
              <ChannelName>{lecturerInfo.username}</ChannelName>
              <Description>
                {lecture.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
        </Channel>
        <Hr />
        <Notes lectureId={lecture._id} fetchNotes={fetchNotes}/>
      </Content>
      <Transcription>

        <ExpandableBox title="Automated Transcription" box1Style="paddingStyle">
          <StyledTextArea 
            placeholder="Type your note here..." 
            value = {videoTA}
            onChange={e => {
              console.log("TextAreaChanged: ", e.target.value);
              setVideoNotes(e.target.value);
            }}
            >
          </StyledTextArea>
          <StyledButton onClick={handleVideoNotes}>Save Note</StyledButton>
        </ExpandableBox>

        <ExpandableBox title="Real-time Speech Recognition">
          <StyledTextArea 
            placeholder="Type your note here..." 
            value={speechTA}
            onChange={e => setSpeechNotes(e.target.value)}
            >
          </StyledTextArea>
          <ButtonGroup>
            <StyledButton onClick={handleSpeechNotes}>Save Note</StyledButton>
            <StyledButton2 onClick={handleRecording} isRecording={isRecording}>
              {isRecording ? "Stop Recording" : "Start Recording"}
            </StyledButton2>
          </ButtonGroup>
        </ExpandableBox>
      </Transcription>
    </Container>
  );
};




export default Lecture;
