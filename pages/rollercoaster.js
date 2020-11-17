import styles from "../styles/Home.module.css";
import { FaPause, FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { Box } from "rebass";
import { Control } from "../components/control";
import fetch from 'isomorphic-unfetch';
import {
    TwitterShareButton,
    FacebookShareButton,
    RedditShareButton,
  } from "react-share";

const Rollercoaster = () => {
  const [playing, setPlaying] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [seek, setSeek] = useState();
  const [mouse, setMouse] = useState();
  const [hov, setHov] = useState();

  const [vol, setVol] = useState(100);
  const [mute, setMute] = useState(false);
  const player = useRef();

  useEffect(() => {
    seek && player && player.current.seekTo(seek, "fraction");
    setPlaying(true)
  }, [seek]);

  const [count, setCount] = useState()

  useEffect(() => {
    document.onkeydown = checkKey
  })

  function checkKey(e) {
      e = e || window.event
      switch(e.keyCode) {

      }
  }

  useEffect(() => {
    updateView()
  },[])

  function updateView() {
    fetch('https://api.countapi.xyz/update/twerasha/rollercoaster/?amount=1')
    .then(res => res.json())
    .then(res => {
        setCount(res.value)
    })
  }
  
  useEffect(() => {
    let i = 0;
    const int =
      playing &&
      setInterval(() => {
        var j = player.current.getCurrentTime();
        setCurrentTime(+j.toFixed(0));
        i++;
      }, 1000);
    player && playing && int;

    !playing && clearInterval(int);
  }, [playing]);

  var d = new Date(currentTime * 1000)
  return (
    <div className={styles.container}>
      <Control setMute={setMute} mute={mute} vol={vol} setVol={setVol} />
      <div className={styles.player}>
        <h1 style={{
            color: '#5da9ff'
        }}>Rollercoaster</h1>
        {count && <h4>{count} plays listened by amazing ppl</h4>}
        <div style={{
            width: '100%',
            justifyContent: 'right',
            textAlign: 'right'
        }}><div>
            {currentTime && currentTime < 60 ? currentTime : currentTime < 120 ? '1:' + (currentTime - 60): currentTime < 180 ? '2:' + (currentTime - 120) : '3:' + (currentTime - 180)}
            </div></div>
        <Box
          className={styles.bar}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          onMouseMove={(e) => {
            setMouse(
              (e.clientX -
                (window.innerWidth / 2 - (window.innerWidth * 0.44) / 2)) /
                (window.innerWidth / 2 +
                  (window.innerWidth * 0.44) / 2 -
                  (window.innerWidth / 2 - (window.innerWidth * 0.44) / 2))
            );
          }}
          onClick={(e) =>
            setSeek(
              (e.clientX -
                (window.innerWidth / 2 - (window.innerWidth * 0.44) / 2)) /
                (window.innerWidth / 2 +
                  (window.innerWidth * 0.44) / 2 -
                  (window.innerWidth / 2 - (window.innerWidth * 0.44) / 2))
            )
          }
          sx={{
            width: "45vw",
            margin: "0 auto",
            backgroundColor: 'black',
            borderRadius: 10,
            height: 10,
            cursor: "none",
          }}
        >
            
            {hov && (
            <Box
              sx={{
                position: "absolute",
                zIndex: 2,
                top: '58%',
                left: mouse ? mouse * 100 + "%" : "0",
                opacity: 0.8,
                backgroundColor: "#ff90f9",

                width: 10,
                height: 20,
              }}
            ></Box>
          )}
          <Box
            sx={{
              position: "relative",
              top: 0,
              left: 0,
              background: 'linear-gradient(120deg,#ff90f9,#5da9ff)',
              borderRadius: 10,
              width: player && playing &&
                (currentTime / player.current.getDuration()) * 101 + "%",
              transition: "all 600ms",
              height: "100%",
            }}
          ></Box>
          
        </Box>

        <div
        className={styles.playpause}
          style={{
            fontSize: "4rem",
            marginTop: 20,
            cursor: 'pointer'
          }}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? <FaPause /> : <FaPlay />}
        </div>
        <ReactPlayer
          url="http://localhost:3000/RC.mp3"
          ref={player}
          width="100%"
          height="100%"
          playing={playing}
          muted={mute}
          volume={vol && vol / 100}
        />
      </div>
    </div>
  );
};

export default Rollercoaster;
