import 'regenerator-runtime'
import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from "../index.module.css";

const Dictaphone = ({handleScript}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  useEffect(() => {
    handleScript(transcript)
  }, [transcript])

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  return (
    <div className={styles.voiceContainer}>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <div className={styles.buttonContainer}>
        <button onClick={startListening}>Start</button>
        <button onClick={stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
    </div>
  );
};
export default Dictaphone;
