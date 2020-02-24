import Constants from 'expo-constants';

const ENV = {
  dev: {
		url: 'http://localhost:8080',
		client_id: 'user',
		client_secret: 'pwd',
  },
  staging: {
		url: '?',
		client_id: '?',
		client_secret: '?',
  },
  prod: {
		url: '?',
		client_id: '?',
		client_secret: '?',
  },
};

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return ENV.dev;
  if (env.indexOf('dev') !== -1) return ENV.dev;
  if (env.indexOf('staging') !== -1) return ENV.staging;
  if (env.indexOf('prod') !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
