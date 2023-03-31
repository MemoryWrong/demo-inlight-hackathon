export const context = {
  client: {
    name: "nandos",
    clickUpSpaceId: "dsahiubc" // @TODO: Create the task in the correct client space in ClickUp 
  },
  techStack: ["AWS", "React", "CraftCMS"], // Not influencing the output very well at the moment.
  platforms: ["iOS", "Android", "web"],
  currentProjects: [
    {
      clickUpId: "abcdefg", // @TODO: Create the task in the correct project in ClickUp 
      name: "Spin To Win AU"
    }
  ],
  team: {
    name: "The Thompsons",
    developers: ["Diego", "Jet", "David"],
    producers: ["Sarah", "Emily"], 
    designers: ["Dylan"]
  }
}
// Can I teach ChatGPT what "producers" mean for it to automatically infer an "Assignee" based on the prompt