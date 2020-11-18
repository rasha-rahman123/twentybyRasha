import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { Box } from "rebass";
import styles from "../styles/Home.module.css";

export const Tracklist = ({ track }) => {
    const [toggleNav, setToggleNav] = useState(true)
    
    const closeDown = setTimeout(() => {
        toggleNav && setToggleNav(false)
    },[5000])
    useEffect(() => {
        toggleNav && closeDown
    },[])
    const router = useRouter()
  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: 20,
        top: 0,
        right: 0,
        backgroundColor: "#ff90f900",
        transition: 'all 300ms ease-in-out',
        color: "#5da9ff",
        width: "15vw",
        borderRadius: 20,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        transitionDelay: '2s'
      }}
    >
      <Box
        className={styles.coded}
        onClick={() => setToggleNav(!toggleNav)}
        sx={{
          width: "100%",
          color: "white",
          zIndex: 2,
          opacity: toggleNav ? 1 : 0.4,
          ":hover": {
              opacity: 1
          }
        }}
      >
        {/* open close title */}
        track navigator
      </Box>
      {<Transition timeout={20} in={toggleNav} appear>
          {(status) => (
              <Box
              flexDirection={"column"}
              sx={{
                display: "flex",
                backgroundColor: status === 'entered' ? "#00000030" : '#00000000',
                transform: status === 'entered' ? 'translateY(0)' : 'translateY(-10vh)',
                padding: 10,
                opacity: status === 'entered' ? 1 : 0,
                width: "100%",
                borderRadius: 20,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                transition: 'all 500ms ease-in-out',
              }}
            >
              { ["safe", "palace", "doctor", "rollercoaster"].map((x, i) => (
                <Box
                  onClick={() => router.push(`/${x}`)}
                  key={i}
                  sx={{
                    width: "100%",
                    backgroundColor: x === track ? "#5da9ff" : "white",
                    color: "darkblue",
                    cursor: x === track ? "no-drop" : "pointer",
                    opacity: status === 'entered' ? 1 : 0,
                    transform: ((i%2) === 0 && status !== 'entered') ? 'translateX(30px)' : ((i%2) != 0 && status !== 'entered') ? 'translateX(-30px)' : 'translateX(0)',
                    margin: "0 auto",
                    padding: 1,
                    marginY: 2,
                    borderRadius: 5,
                    transition: 'all 300ms ease-in-out',
                    transitionDelay: status === "entered" ? '0' : '250ms',
                    ":hover": {
                        backgroundColor: x !== track && '#ff90f9'
                    }
                  }}
                >
                  {x}
                </Box>
              ))}
            </Box>
          )}
      </Transition>}
    </Box>
  );
};
