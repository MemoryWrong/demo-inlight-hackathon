import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Dictaphone from './voice/voice';

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [script, setScript] = useState('');

  async function onSubmit(event) {
    console.log('=========>', script);
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ script }),
      });

      const data = await response.json();
      data.result = JSON.parse(data.result)

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  const handleScript = (st) => {
    setScript(st)
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
      <Dictaphone handleScript={handleScript} />

        <form onSubmit={onSubmit}>
          <label htmlFor='input'>Describe your task: </label>
          <textarea name='input' rows={10} value={script} onChange={(e) => setScript(e.target.value)} />
          <input type="submit" value="ChatGPT Generate Tickets" />
        </form>
        <div className={styles.result}>
          {result &&
            <>
              <h2>Name: { result?.story?.name }</h2>
              <p>Description: { result?.story?.description }</p>
            </>
          }
          {
            result?.tasks?.map((task, index) => (
              <div key={index}>
                <h3>Name: { task.name }</h3>
                <p>Description: { task.description }</p>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
}
