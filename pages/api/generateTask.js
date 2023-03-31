// always using this list id
const LIST_ID = '900301426121';

const generateTask = async (req, res) => {
	try {
		const resp = await fetch(
			`https://api.clickup.com/api/v2/list/${LIST_ID}/task?team_id=69&custom_task_ids=true`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: process.env.CLICKUP_API_KEY
				},
				body: JSON.stringify({
					"name": req.body.name,
					"description": req.body.description,
				})
			}
		);

		const data = await resp.json();
    res.status(200).json(data);
	} catch (error) {
		res.status(500).json({
			error: {
				message: 'An error occurred during your request.',
			}
		});
	}
}

export default generateTask;
