import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";

const Container = styled.div`
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: ${({ theme }) => theme.bgLighter};
    height: 65px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 5px;
  position: relative;
  background-color: inherit;
`;



const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const UserInfo = styled.div`
    width: 150px;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const UserName = styled.div`
    display: flex;
    color: ${({ theme }) => theme.text};
`;

const UName = styled.span`
  font-weight: 500;
  left: 0px;
`;


const TopBar = () => {
    //-----> Gett current user data
    const {currentUser} = useSelector((state) => state.user);
    
    const [studentData, setUserData] = useState({});

    useEffect(() => {
        console.log("-----------> Start feting the data");
        const fetchData = async () => {
        try {
            const userRes = await api.get(`/users/find/${currentUser._id}`)
        
            setUserData(userRes.data);
        } catch (err) {
            console.log("--------- Notes Component Error:");
            console.log(err);
        }
        };
        fetchData();
    }, [])
    
    
    return(
        <Container>
            <Wrapper>
                <UserInfo>
                    <Image src={studentData.img}/>
                    <UserName>
                        <UName>{studentData.username}</UName>
                    </UserName>
                </UserInfo>
                <Link to="signin" style={{ textDecoration: "none", padding: "5px 15px" }}>
                    <Button>
                        <AccountCircleOutlinedIcon />
                        LogOut
                    </Button>
                </Link>
            </Wrapper>
        </Container>
    );
};

export default TopBar;


