const mapToClickup = async (stories) => {
  console.log('stories', JSON.stringify(stories, null, 2));
  let clickupStories = [];

  stories.map(async (story) => {
    const { name, description, time_estimate } = story;
    const clickupStory = await createTask({ name, description, time_estimate });
    clickupStory.subTasks = [];
    console.log('clickupStory', JSON.stringify(clickupStory, null, 2));
    story.tasks.map(async (task) => {
      const { name, description, time_estimate } = task;
      const clickupTask = await createTask({ name, description, time_estimate, parent: clickupStory.id });
      console.log('clickupTask', JSON.stringify(clickupTask, null, 2));
      clickupStory.subTasks.push(clickupTask);
    });
    clickupStories.push(clickupStory);
  });

  return clickupStories;
}

export { mapToClickup };
