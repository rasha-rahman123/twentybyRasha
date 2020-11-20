import styles from "../styles/Home.module.css";
import { FaPause, FaPlay, FaSpotify, FaApple } from "react-icons/fa";
import ReactPlayer from "react-player";
import {useRouter} from 'next/router'
import { useEffect, useRef, useState } from "react";
import { Box } from "rebass";
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

const Rollercoaster = () => {
  const [playing, setPlaying] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [seek, setSeek] = useState();
  const [mouse, setMouse] = useState();
  const [hov, setHov] = useState();

  const [vol, setVol] = useState(100);
  const [mute, setMute] = useState(false);

  const url =
    "https://github.com/rasha-rahman123/twentybyRasha/blob/main/public/RC.mp3?raw=true";
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
  });

  function checkKey(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 32:
        setPlaying(!playing)
        break;
    }
  }

  useEffect(() => {
    updateView();
    playing && setPlaying(false);
  }, []);

  function updateView() {
    fetch("https://api.countapi.xyz/update/twerasha/rollercoaster/?amount=1")
      .then((res) => res.json())
      .then((res) => {
        setCount(res.value);
      });
  }

  const seekChorus = () => {
    player && player.current.seekTo(27,'seconds');
    setPlaying(true);
  }

  const seekVerse = (ver) => {
    player && ver > 1 ? player.current.seekTo(118,'seconds') : player.current.seekTo(52,'seconds');
    setPlaying(true);
  }
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
    <div className={styles.container}>
      <NextSeo
      title={playing ? 'rasha - rollercoaster (2020)' : 'twenty by rasha'}
    />
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
          "Rollercoaster"
        </h1>
        <h4
        onClick={() => router.push('/')}
          style={{
            color: "#ff90f9",
            fontSize: 100,
            margin: 0,
            cursor: 'pointer'
          }}
        >
          twenty by rasha
        </h4>
        <p className={styles.description} style={{
          flexDirection: 'row',
          display: 'flex'
        }}>
        Release Date: Nov 20, 2020 <code onClick={() => window.location.assign('https://open.spotify.com/track/6sPyUrlStW5qhO5AVT9q95')} className={styles.code} style={{color: 'white', width: '100px', fontSize: '2rem', display: 'block', marginLeft: 10}}>{<FaSpotify />}</code>
        <code onClick={() => window.location.assign('https://music.apple.com/us/album/rollercoaster-single/1540464078?uo=4&app=itunes&at=1001lry3&ct=dashboard')} className={styles.code} style={{color: 'white', width: '100px', fontSize: '2rem',}}>{<FaApple />}</code>
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
        <Tracklist track="rollercoaster" />
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
            cursor: "pointer",
          }}
        >
          
          <Box
            sx={{
              position: "relative",
              top: 0,
              left: 0,
              background: "linear-gradient(120deg,#ff90f9,#5da9ff)",
              borderRadius: 10,
              width:
                player && dur &&
                (currentTime / dur) * 101 + "%",
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
      <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          color: 'white',
          opacity: 0.4
     }}>
        <div>
        <h6 onClick={() => seekChorus()} style={{marginBottom: 0, cursor: 'pointer'}}>chorus</h6>
          cause every day I<br />
          hold my prayers high<br />
          look at you I <br />
          can't hold back <br />
          cause in the nighttime <br />
          youve dressed up real fine <br />
         i wanna take you back to mine<br />
        </div>
        <div style={{
            margin: '0 10px'
        }}>
          <div>
          <h6 onClick={() => seekVerse(1)}  style={{marginBottom: 0, cursor: 'pointer'}}>verse 1</h6>
          lets go, I wanna love you baby but we should start slow <br />
          And then move up the pace, like its a crescendo <br />
          If I give you all that I got, would you come and show <br />
          In love thats w you I can feel my heart glow<br />
          I see yours too popping like a pimple, its popping like a pimple <br />
          Love me, love me, I see through, I see you <br />
          </div>
          <div>
          <h6 onClick={() => seekVerse(2)} style={{marginBottom: 0, marginTop: 0, cursor: 'pointer'}}>verse 2</h6>
          shes the rollercoaster, and im the passenger <br />
          its so exciting, its so thrilling, <br />
          i wanna stand in line, over and over again<br />
          i wanna stand in line for you, over and over again <br />
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Rollercoaster;
