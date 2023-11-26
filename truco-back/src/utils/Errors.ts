const missingParam = (param: string): string => `Missing parameter: "${param}"`;

const invalidParamType = (param: string, expected: string, received: string): string => `Invalid parameter type: "${param}". Expected "${expected}", received "${received}"`;


export { missingParam, invalidParamType };