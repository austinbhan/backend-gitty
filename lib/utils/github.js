const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  // TODO: Implement me!
  const client_id = process.env.GH_CLIENT_ID;
  const client_secret = process.env.GH_CLIENT_SECRET;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });

  const resp = await response.json();
  console.log(resp.token);
  return resp.access_token;
};

const getGithubProfile = async (token) => {
  // TODO: Implement me!
};

module.exports = { exchangeCodeForToken, getGithubProfile };
