import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Dictaphone from "./voice/voice";

import { mapToClickup } from "../utils/map-to-clickup";

export default function Home() {
  const [result, setResult] = useState();
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    console.log("=========>", script);
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ script }),
      });

      const data = await response.json();
      setLoading(false);
      data.result = JSON.parse(data.result);

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      await mapToClickup(data.result.stories);

      alert("Success! Check your ClickUp account.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  const handleScript = (st) => {
    setScript(st);
  };

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <Dictaphone handleScript={handleScript} />

        <form onSubmit={onSubmit}>
          <label htmlFor="input">Describe your task: </label>
          <textarea
            name="input"
            rows={10}
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />
          <input
            type="submit"
            value={loading ? "Generating..." : "ChatGPT Generate Tickets"}
            disabled={loading}
          />
        </form>
        <div className={styles.result}>
          {result?.stories?.map((story, index) => (
            <div key={index} className={styles.story}>
              <h2>Story Name: {story?.name}</h2>
              <p>Description: {story?.description}</p>
              <p>
                Type:{" "}
                <span className={styles.tag}>
                  {(story?.isBug && "Bug") ||
                    (story?.isFeature && "Feature") ||
                    "None"}
                </span>
              </p>
              {story?.tasks?.map((task, index) => (
                <div className={styles.tasks} key={index}>
                  <h3>Subtask Name: {task.name}</h3>
                  <p>Description: {task.description}</p>
                  <p>
                    Type:{" "}
                    <span className={styles.tag}>
                      {(task?.isBug && "Bug") ||
                        (task?.isFeature && "Feature") ||
                        "None"}
                    </span>
                  </p>
                  <p>
                    Priority:{" "}
                    <span className={`${styles.tag}`}>{task?.priority}</span>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
