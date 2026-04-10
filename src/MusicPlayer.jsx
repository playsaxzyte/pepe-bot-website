import { useRef, useState } from "react";
import "./player.css";

const songs = [
  { name: "Persona Energy", file: "/songs/song1.mp3" },
  { name: "Night Drive", file: "/songs/song2.mp3" },
  { name: "Chill Mode", file: "/songs/song3.mp3" },
];

export default function MusicPlayer() {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);

  const playSong = (index) => {
    setCurrent(index);
    setPlaying(true);

    setTimeout(() => {
      audioRef.current.src = songs[index].file;
      audioRef.current.play().catch(() => {});
    }, 0);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setPlaying(!playing);
  };

  const nextSong = () => {
    const next = (current + 1) % songs.length;
    playSong(next);
  };

  const prevSong = () => {
    const prev = (current - 1 + songs.length) % songs.length;
    playSong(prev);
  };

  return (
    <div className="player">
      <audio ref={audioRef} src={songs[current].file} />

      <div className="player-ui">
        <div className="song-name">{songs[current].name}</div>

        <div className="controls">
          <button onClick={prevSong}>⏮</button>
          <button onClick={togglePlay}>
            {playing ? "⏸" : "▶"}
          </button>
          <button onClick={nextSong}>⏭</button>
        </div>
      </div>
    </div>
  );
}