const createTask = async (fields) => {
  try {
    const response = await fetch("/api/generateTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });

    const data = await response.json();
    data.result = JSON.parse(data.result)

    if (response.status !== 200) {
      throw data.error || new Error(`Failed to create task. Error: ${response.status}`);
    }

    return data.result;

  } catch(error) {
    console.error(error);
    alert(error.message);
  };
};
