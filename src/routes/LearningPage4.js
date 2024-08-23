import React, { useRef, useState, useEffect } from "react";

import styles from "./LearningPage4.module.css";
import 학습하기4 from "../img/LearningPage/학습하기4.png";
import 스피커 from "../img/LearningPage/스피커.png";
import 코멘트 from "../img/LearningPage/코멘트.png";
import 넘어가기버튼 from "../img/LearningPage/넘어가기버튼.png";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function LearningPage4() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/learning5"); // 이동할 경로를 설정합니다.
  };

  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");

  const getAudio = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/study-cards/2");
      const json = await response.json();
      setAudioUrl(json.data.dialogues[1].audioUrl);
    } catch (error) {
      console.error("Failed to fetch audio data:", error);
    }
  };

  useEffect(() => {
    getAudio();
  }, []);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.load();
    }
  }, [audioUrl]);

  const handleImageClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play the audio:", error);
      });
    }
  };

  return (
    <section className="page">
      <img className="background" src={학습하기4} />
      <img
        className={styles.speaker}
        src={스피커}
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
        alt="스피커 아이콘"
      />
      <audio ref={audioRef}>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <img className={styles.comment} src={코멘트} />
      <img
        className={styles.next}
        src={넘어가기버튼}
        alt="넘어가기 버튼"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
      <Navbar />
    </section>
  );
}

export default LearningPage4;
