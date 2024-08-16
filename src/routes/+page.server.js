import ollama from 'ollama';
import { toolsString, executeFunction } from '$lib';

const systemPrompt = `You are a helpful assistant that takes a question and finds the most appropriate tool or tools to execute, along with the parameters required to run the tool. Respond as JSON using the following schema: {"functionName": "function name", "parameters": [{"parameterName": "name of parameter", "parameterValue": "value of parameter"}]}. The tools are: ${toolsString}`;
let contextState = [];
export const actions = {
	prompt: async ({ request }) => {
		const { model, prompt } = Object.fromEntries(await request.formData());
		try {
			const { response, context } = await ollama.generate({
				model: model,
				system: systemPrompt,
				prompt: prompt,
				stream: false,
				format: 'json',
				context: contextState
			});
			contextState = context;
			const responseObject = JSON.parse(response.trim());
			await executeFunction(responseObject.functionName, responseObject.parameters);
			//const jsonStr = JSON.stringify(responseObject, null, 2);
			return { response: `Files were successfully Created!`, model };
		} catch (error) {
			console.log(error);
			return { response: `Failed to Execute function!`, model };
		}
	}
};
