const fs = require('fs');

console.log('Reading new configurations...');

const awsConfig = require('./aws_config.json');

console.log('Updating angular configurations');

let userPoolInfo = `const poolData = {
  UserPoolId: '${awsConfig.user_pool_id.value}',
  ClientId: '${awsConfig.app_client_id.value}'
};
export default poolData;
`;
fs.writeFileSync('../src/app/auth/user_pool_info.ts', userPoolInfo);

const apiEndpoint = `const apiEndpoint = '${awsConfig.api_endpoint.value}';
export default apiEndpoint;
`;
fs.writeFileSync('../src/app/shared/api_endpoint.ts', apiEndpoint);

const idPoolId = `const idPoolId = '${awsConfig.identity_pool_id.value}';
export default idPoolId;
`;
fs.writeFileSync('../src/app/shared/id_pool_id.ts', idPoolId);
