import { createTask } from './create-task';

const mapToClickup = async (stories) => {
  console.log('stories', JSON.stringify(stories, null, 2));

  stories.map(async (story) => {
    const { name, description } = story;
    const clickupStory = await createTask({ name, description });
    console.log('clickupStory: ', JSON.stringify(clickupStory, null, 2));
    story.tasks.map(async (task) => {
      const { name, description, time_estimate } = task;
      const clickupTask = await createTask({ name, description, parent: clickupStory["id"] });
      console.log('clickupTask: ', JSON.stringify(clickupTask, null, 2));
    });
  });
}

export { mapToClickup };
