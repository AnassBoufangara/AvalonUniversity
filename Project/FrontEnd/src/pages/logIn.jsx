import React, { useCallback, useState } from "react";
import styled from "styled-components";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { loadSlim } from "tsparticles-slim"; 
import api from "../services/api";

// For Redux
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";

const ParticlesBackground = styled.div`
  position: fixed; /* Use fixed position to ensure it covers the whole screen */
  top: 65px;
  left: 0;
  width: 100%;
  z-index: -1; /* Set to -1 to ensure it's behind other content */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 210px);
  color: ${({ theme }) => theme.text};

  position: relative; /* Make sure this is positioned relative or absolute to be on top of the particles */
  z-index: 1; /* Higher z-index than ParticlesBackground */
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
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

const LogIn = () => {

  //----------> For Particle Design
  const particlesInit = useCallback(async engine => {
      console.log(engine);
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadFull(engine);
      await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
      await console.log(container);
  }, []);

  //----------> For Login Details
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const handelLogIn = async (e) => {
    e.preventDefault();
    //console.log("LogIn");
    dispatch(loginStart());
    try{
      const res = await api.post("/auth/signIn", {email, password})
      console.log(res.data);
      dispatch(loginSuccess(res.data));
    } catch(err) {
      dispatch(loginFailure());
    }
  }


  return(
        <>
        <Container>
            <ParticlesBackground>
                <Particles
                  id="tsparticles"  
                  init={particlesInit}
                  loaded={particlesLoaded}
                  options={{
                    background: {
                      color: {
                        value: "#f5f5f5", // A blue background for high contrast
                      },
                    },
                    particles: {
                      color: {
                        value: "#008B8B", // White particles for visibility
                      },
                      number: {
                        value: 120, // Fewer particles for testing
                      },
                      size: {
                        value: 3, // Larger size for visibility
                      },
                      line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#008B8B",
                        opacity: 0.5,
                        width: 3,
                      },
                      move: {
                        enable: true,
                        speed: 4,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "bounce",
                        bounce: false,
                        attract: { enable: false, rotateX: 600, rotateY: 1200 },
                      },
                    },
                  }}
                />
            </ParticlesBackground>
                <Wrapper>
                    <Title>Log-in</Title>
                    <SubTitle>to continue to Avalon University</SubTitle>
                    <Input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <Button
                      onClick={handelLogIn}
                      >
                      Sign in
                    </Button>
                </Wrapper>
                <More>
                    English(UK)
                    <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                    </Links>
                </More>
            
            </Container>    
        </>
    );
};

export default LogIn;