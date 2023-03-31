const createTask = async (fields) => {
  console.log('fields: ', JSON.stringify(fields, null, 2));
  try {
    const response = await fetch("/api/generateTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw data.error || new Error(`Failed to create task. Error: ${response.status}`);
    }

    console.log('createTask response data: ', JSON.stringify(fields, null, 2));

    return data;

  } catch(error) {
    console.error(error);
    alert(error.message);
  };
};

export { createTask };
