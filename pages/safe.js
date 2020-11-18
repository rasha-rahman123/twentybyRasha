import styles from "../styles/Home.module.css";
import { FaPause, FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Box, Link } from "rebass";
import { Control } from "../components/control";
import fetch from "isomorphic-unfetch";
import {
  TwitterShareButton,
  FacebookShareButton,
  FacebookShareCount,
  RedditShareButton,
} from "react-share";
import { NextSeo } from "next-seo";
import { Tracklist } from "../components/tracklist";

const Safe = () => {
  const [playing, setPlaying] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [seek, setSeek] = useState();
  const [toggleSite, setToggleSite] = useState(false)
  const [mouse, setMouse] = useState();
  const [mouse2, setMouse2] = useState();
  const [hov, setHov] = useState();

  const [vol, setVol] = useState(100);
  const [mute, setMute] = useState(false);

  const url = "http://localhost:3000/full/SAFE.mp3";
  const player = useRef();

  useEffect(() => {
    seek && player && player.current.seekTo(seek, "fraction");
    seek && setPlaying(true);
  }, [seek]);

  const [count, setCount] = useState();
  const [innerW, setInnerW] = useState();

  const router = useRouter();

  useEffect(() => {
    typeof window !== "undefined" && setInnerW(window.innerWidth);
    console.log(innerW);
  }, []);

  useEffect(() => {
    document.onkeydown = checkKey;
    document.onmousemove = checkMouse;
  });

  function checkKey(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 32:
        setPlaying(!playing);
        break;
    }
  }

  function checkMouse(e) {
    e = e || window.event;
    setMouse2(e.clientY)
  }
  useEffect(() => {
    updateView();
    playing && setPlaying(false);
  }, []);

  function updateView() {
    fetch("https://api.countapi.xyz/update/twerasha/safe/?amount=1")
      .then((res) => res.json())
      .then((res) => {
        setCount(res.value);
      });
  }
  const seekChorus = () => {
    player && player.current.seekTo(10, "seconds");
    setPlaying(true);
  };

  const seekVerse = (ver) => {
    player && ver > 1
      ? player.current.seekTo(113, "seconds")
      : player.current.seekTo(45, "seconds");
    setPlaying(true);
  };
  useEffect(() => {
    let i = 0;
    const int =
      playing &&
      setInterval(() => {
        var j = playing && player && typeof player.current.getCurrentTime() !== 'undefined' ? player.current.getCurrentTime() : 0;
        playing && setCurrentTime(+j.toFixed(0));
        i++;
      }, 1000);
    player && playing && int;

    !playing && clearInterval(int);
  }, [playing]);

  var d = new Date(currentTime * 1000);
  var dur = player && playing && player.current.getDuration();
  return (
    toggleSite ? <div className={styles.container}>
      <NextSeo title={playing ? "rasha - safe (2020)" : "twenty by rasha"} />
      <Control
        setMute={setMute}
        mute={mute}
        vol={vol}
        setVol={setVol}
        mobile={innerW ? innerW < 768 && true : false}
      />
      <div className={styles.player}>
        <h1
          style={{
            color: "#5da9ff",
          }}
        >
          Safe
        </h1>
        <h4
          onClick={() => router.push("/")}
          style={{
            color: "#ff90f9",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          twenty by rasha
        </h4>
        <p className={styles.description}>
          Release Date: Dec 11, 2020{" "}
          <code
            onClick={() =>
              window.location.assign("https://t.co/c2JwJ7hsaI?amp=1")
            }
            className={styles.code}
            style={{ color: "white" }}
          >
            pre-save now
          </code>
        </p>
        {count && <h4>{count} plays</h4>}

        <div
          style={{
            width: "100%",
            justifyContent: "right",
            textAlign: "right",
          }}
        >
          <div>
            {currentTime && currentTime < 60
              ? currentTime
              : currentTime < 120
              ? "1:" + (currentTime - 60)
              : currentTime < 180
              ? "2:" + (currentTime - 120)
              : "3:" + (currentTime - 180)}
          </div>
        </div>
        <Tracklist track="safe" />
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
            backgroundColor: "black",
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
                top: mouse2 - 60,
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
              background: "linear-gradient(120deg,#ff90f9,#5da9ff)",
              borderRadius: 10,
              width: player && dur && (currentTime / dur) * 101 + "%",
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
            cursor: "pointer",
          }}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? <FaPause /> : <FaPlay />}
        </div>
        <ReactPlayer
          url={url}
          ref={player}
          width="100%"
          height="100%"
          playing={playing}
          muted={mute}
          volume={vol && vol / 100}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "white",
          opacity: 0.4,
        }}
      >
        <div>
          <h6
            onClick={() => seekChorus()}
            style={{ marginBottom: 0, cursor: "pointer" }}
          >
            chorus
          </h6>
          can i feel safe w you
          <br />
          cause you feel safe w me <br />
          i know i feel safe w you <br />
          cuz thats the way its supposed to be <br />
        </div>
        <div
          style={{
            margin: "0 10px",
          }}
        >
          <div>
            <h6
              onClick={() => seekVerse(1)}
              style={{ marginBottom: 0, cursor: "pointer" }}
            >
              verse 1
            </h6>
            do you wanna come down, tonight <br />
            we could make lowkey, and quiet <br />
            we can do it slowly, and silent
            <br />
            move your hips w my hips, im flying
            <br />
            ah, im <br />
            on me
            <br />
          </div>
          <div>
            <h6
              onClick={() => seekVerse(2)}
              style={{ marginBottom: 0, marginTop: 0, cursor: "pointer" }}
            >
              verse 2
            </h6>
            fast forward to a bright blue day
            <br />
            cause your looking gorgeous, smiling bigger than a lake <br />
            i want you, i want it, i want you, i want it
            <br />
            i want you today
            <br />
          </div>
        </div>
      </div>
      </div>
  : <div className={styles.container}>
     <Tracklist track="safe" />
    <span>Twenty by Rasha Coming Soon Dec 11th</span>
   <Link href="/">go back to home page here</Link>
  </div>);
};


export default Safe;
