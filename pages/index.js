import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Box } from "rebass";
import { Control } from "../components/control";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export const Home = () => {
  const [curr, setCurrent] = useState();
  const songs = [
    {
      title: "SAFE",
      desc: "at your most vulnerable, do you feel safe w them?",
    },
    {
      title: "HARD",
      desc: "it will never be easy, but we will always try to make it be",
    },
    {
      title: "DOCTOR",
      desc: "i may not be the best helper, but i am here for you",
    },
    {
      title: "ROLLERCOASTER",
      desc: "no ups and downs, just excitement and thrill",
    },
  ];

  const ref = useRef();
  const [url, setUrl] = useState();

  const [vol, setVol] = useState();
  const [mute, setMute] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let k = curr;
    curr ? setUrl(`http://localhost:3000/${k}.mp3`) : setUrl("");
  }, [curr]);

  useEffect(() => {
    let k = ref.current.props.playing;
    const time = setTimeout(() => {
      !k && setCurrent(null) && setUrl("");
    }, 1000);
    curr && time;
  }, [curr]);

  return (
    <div className={styles.container}>
 

      <main className={styles.main}>
        {/* <Control setMute={setMute} mute={mute} vol={vol} setVol={setVol} /> */}
        <h1 className={styles.title}>
          Twenty by <a href="https://rasha.world">Rasha</a>
        </h1>

        <p className={styles.description}>
          Stream Dec 11th 2020 <code onClick={() => window.location.assign('https://t.co/c2JwJ7hsaI?amp=1')} className={styles.code}>pre-save coming soon</code>
        </p>
        <ReactPlayer
          url={url}
          ref={ref}
          width="400px"
          height="50px"
          volume={vol ? (vol < 5 ? 0 : Math.pow(vol / 100, 0.5)) : 0.8}
          playing={!curr ? false : true}
          controls={false}
          muted={mute}
        />
        <div className={styles.grid}>
          {songs &&
            songs.map((x, i) => (
              <Box
                // onClick={() => i === 3 ? (curr === x.title ? setCurrent(null) : setCurrent(x.title)) : console.log()}
                key={i}
                onClick={() => router.push('/rollercoaster')}
                className={
                  i === 3
                    ? x.title === curr
                      ? styles.carded
                      : styles.card
                    : styles.carf
                }
              >
                <h3>{x.title}</h3>
                <p>{x.desc}</p>
              </Box>
            ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="http://rasha.world" target="_blank" rel="noopener noreferrer">
          developed by <h2>Rasha rahman.</h2>
        </a>
      </footer>
    </div>
  );
};

export default Home;
