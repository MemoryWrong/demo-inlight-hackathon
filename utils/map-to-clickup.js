import { createTask } from './create-task';

const mapToClickup = async (stories) => {
  console.log('stories', JSON.stringify(stories, null, 2));

  stories.map(async (story) => {
    const { name, description, time_estimate, tag, priority } = story;
    const clickupStory = await createTask({ name, description, tags: [tag], time_estimate });
    console.log('clickupStory: ', JSON.stringify(clickupStory, null, 2));
    story.tasks.map(async (task) => {
      const { name, description, time_estimate } = task;
      const clickupTask = await createTask({ name, description, parent: clickupStory["id"], time_estimate });
      console.log('clickupTask: ', JSON.stringify(clickupTask, null, 2));
    });
  });
}

export { mapToClickup };
