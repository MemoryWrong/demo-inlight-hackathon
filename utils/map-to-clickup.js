import { createTask } from './create-task';

const getTimeEstimate = (time) => {
  return time * 60 * 60 * 1000;
};


const mapToClickup = async (stories) => {
  console.log('stories', JSON.stringify(stories, null, 2));

  stories.map(async (story) => {
    const { name, description, time_estimate, tag } = story;
    const timeInMs = getTimeEstimate(time_estimate);
    const clickupStory = await createTask({ name, description, tags: [tag], time_estimate: timeInMs });
    console.log('clickupStory: ', JSON.stringify(clickupStory, null, 2));
    story.tasks.map(async (task) => {
      const { name, description, time_estimate, code } = task;
      const timeInMs = getTimeEstimate(time_estimate);
      const fullDescription = `${description} \n\n \`\`\` \n\n ${code} \n\n \`\`\` \n\n`;
      const clickupTask = await createTask({ name, description: fullDescription, parent: clickupStory["id"], time_estimate: timeInMs });
      console.log('clickupTask: ', JSON.stringify(clickupTask, null, 2));
    });
  });
}

export { mapToClickup };
