import Head from 'next/head';
import { useState } from 'react';
import styles from './index.module.css';
import Dictaphone from './voice/voice';

import { mapToClickup } from '../utils/map-to-clickup';
import { Header } from '../components/header';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [script, setScript] = useState('');

  async function onSubmit(event) {
    console.log('=========>', script);
    setLoading(true);
    event.preventDefault();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script }),
      });

      const data = await response.json();
      data.result = JSON.parse(data.result);

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      await mapToClickup(data.result.stories);

      alert('Success! Check your ClickUp account.');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    setLoading(false);
  }

  const handleScript = (st) => {
    setScript(st);
  };

  return (
    <div>
      <Head>
        <title>Hack to the future</title>
        <link rel='icon' href='/dog.png' />
      </Head>

      <main className={styles.main}>
        <Header />
        <h1 className={styles.storyh1}>Welcome</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor='input'>Describe your task: </label>
          <textarea
            name='input'
            rows={10}
            value={script}
            onChange={(e) => setScript(e.target.value)}
            disabled={loading}
          />
          <div className={styles.buttonContainer}>
            <input
              type='submit'
              value={loading ? 'Generating...' : 'ChatGPT Generate Tickets'}
              disabled={loading}
            />
          </div>
        </form>
        <div className={styles.result}>
          {result?.stories?.map((story, index) => (
            <div key={index} className={styles.story}>
              <h2>
                {index + 1}. Story Name: {story?.name}
              </h2>
              <p>
                Priority:{' '}
                <span className={`${styles.tag}`}>{story?.priority}</span>
              </p>
              <p>Description: {story?.description}</p>
              <p>
                Type: <span className={styles.tag}>{story?.tag}</span>
              </p>
              {story?.tasks?.map((task, index) => (
                <div className={styles.tasks} key={index}>
                  <h3>Subtask Name: {task.name}</h3>
                  <p>Description: {task.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
