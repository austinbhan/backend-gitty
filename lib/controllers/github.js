const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = Router()
  .get('/login', async (req, res) => {
    // TODO: Kick-off the github oauth flow
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;

      const token = await exchangeCodeForToken(code);
      
      const gitHubProfile = await getGithubProfile(token);
      console.log(gitHubProfile);

      let user = await GithubUser.findByUsername(gitHubProfile.login);
      if (!user) {
        user = await GithubUser.insert({
          username: gitHubProfile.login,
          email: gitHubProfile.email,
          avatar: gitHubProfile.avatar_url,
        }); 
      }
    }
    catch (e) { // REMOVE CATCH AND NEXT FOR FRIDAY 
      next(e); 
    }
    /*
      TODO:
     * get code DONE
     * exchange code for token DONE 
     * get info from github about user with token DONE 
     * get existing user if there is one DONE
     * if not, create one
     * create jwt
     * set cookie and redirect
     */
  })
  .get('/dashboard', authenticate, async (req, res) => {
    // require req.user
    // get data about user and send it as json
    res.json(req.user);
  })
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  });
