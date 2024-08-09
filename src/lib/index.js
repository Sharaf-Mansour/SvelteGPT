import fs from 'fs';
import path from 'path';

const codeToPCTool = {
	name: 'CodeToPC',
	description: 'Save Genrated code to Hard Drive',
	parameters: [
		{
			name: 'filename',
			description: 'The name of the files to save',
			type: 'string[]',
			required: true
		},
		{
			name: 'code',
			description: 'The code to save inside the files',
			type: 'string[]',
			required: true
		}
	]
};

const CodeToPC = async (filename, code) => {
	const dir = 'File';
	for (let i = 0; i < filename.length; i++) {
		//Bun.write('File/' + filename[i], code[i]);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		await fs.writeFileSync(path.join(dir, filename[i]), code[i]);
		console.log(`Code saved to ${filename[i]}`);
	}
};

export const toolsString = JSON.stringify(
	{
		tools: [codeToPCTool]
	},
	null,
	2
);

const getValueOfParameter = (parameterName, parameters) =>
	parameters.filter((p) => p.parameterName === parameterName)[0].parameterValue;

export const executeFunction = async (functionName, parameters) => {
	switch (functionName) {
		case 'CodeToPC':
			return await CodeToPC(
				getValueOfParameter('filename', parameters),
				getValueOfParameter('code', parameters)
			);
	}
};
