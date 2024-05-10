import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

export class Kronoos implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Kronoos',
        name: 'kronoos',
        icon: 'file:kronoos.svg',
        group: ['transform'],
        version: 1,
        description: 'Kronoos API operations, including payload validation and data parsing.',
        defaults: {
            name: 'Kronoos',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [{
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                options: [{
                        name: 'Validate Payload',
                        value: 'validatePayload',
                        description: 'Validate JSON payload against a schema.',
                    },
                    {
                        name: 'Parse Data',
                        value: 'parseData',
                        description: 'Parse API response into a standardized format.',
                    }
                ],
                default: 'validatePayload',
                noDataExpression: true,
                required: true,
            },
            {
                displayName: 'JSON Payload',
                name: 'jsonPayload',
                type: 'json',
                required: true,
                displayOptions: {
                    show: {
                        operation: [
                            'validatePayload',
                        ],
                    },
                },
                placeholder: '{"key": "value", ...}',
                description: 'Input JSON payload to be validated.',
                default: '{}', // Default empty JSON object as a string
            },
            {
                displayName: 'JSON Schema',
                name: 'jsonSchema',
                type: 'json',
                required: true,
                displayOptions: {
                    show: {
                        operation: [
                            'validatePayload',
                        ],
                    },
                },
                placeholder: '{"type": "object", "properties": {...}, "required": [...]}',
                description: 'JSON Schema to validate against the payload.',
                default: '{}', // Default empty JSON object as a string
            },
            {
                displayName: 'API Response',
                name: 'apiResponse',
                type: 'json',
                required: true,
                displayOptions: {
                    show: {
                        operation: [
                            'parseData',
                        ],
                    },
                },
                placeholder: '{"key": "value", ...}',
                description: 'API response to parse.',
                default: '{}', // Default empty JSON object as a string
            },
            {
                displayName: 'Data Schema',
                name: 'dataSchema',
                type: 'json',
                required: true,
                displayOptions: {
                    show: {
                        operation: [
                            'parseData',
                        ],
                    },
                },
                placeholder: '{"desiredKey": "sourceKey", ...}',
                description: 'Schema defining the transformation for standardizing the API response format.',
                default: '{}', // Default empty JSON object as a string
            },
        ],
    };

    // The execute method will go here
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
			const operation = this.getNodeParameter('operation', 0) as string;
			console.log(operation);
			if (operation === 'validatePayload') {
				const jsonPayload = this.getNodeParameter('jsonPayload', 0) as string;
				const jsonSchema = this.getNodeParameter('jsonSchema', 0) as string;

				console.log(jsonPayload);
				console.log(jsonSchema);
				// const validationResult = validateJson(jsonPayload, jsonSchema);
				// if (!validationResult.isValid) {
				//     throw new Error(validationResult.errorMessage);
				// }
				return [this.helpers.returnJsonArray({ valid: true, message: "Payload is valid." })];
			} else if (operation === 'parseData') {
					const apiResponse = this.getNodeParameter('apiResponse', 0) as string;
					const dataSchema = this.getNodeParameter('dataSchema', 0) as string;

					console.log(apiResponse);
					console.log(dataSchema);

					return [this.helpers.returnJsonArray({ parsedData: "Parsed data."})];
			}

			throw new Error('Selected operation is not recognized.');
	}
}
