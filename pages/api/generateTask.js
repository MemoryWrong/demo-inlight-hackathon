// always using this list id
const LIST_ID = '900301426121';

const generateTask = async (req, res) => {
  console.log('req.body: ', JSON.stringify(req.body, null, 2));
  try {
    const resp = await fetch(
      `https://api.clickup.com/api/v2/list/${LIST_ID}/task?team_id=69&custom_task_ids=true`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.CLICKUP_API_KEY
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await resp.json();

    res.status(200).json(data);
    console.log('data: ', JSON.stringify(data, null, 2));
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      }
    });
  }
  }

export default generateTask;
