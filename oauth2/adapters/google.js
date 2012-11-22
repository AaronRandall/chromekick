OAuth2.adapter('google', {
  authorizationCodeURL: function(config) {
    return ('https://staging.songkick.net/oauth/login?' +
      'oauth_version=v2-10&' + 
      'client_id={{CLIENT_ID}}&' +
      'redirect_uri={{REDIRECT_URI}}&' +
      'scope={{API_SCOPE}}&' +
      'access_type=offline&' +
      'response_type=code')
        .replace('{{CLIENT_ID}}', config.clientId)
        .replace('{{REDIRECT_URI}}', this.redirectURL(config))
        .replace('{{API_SCOPE}}', config.apiScope);
  },

  redirectURL: function(config) {
    return 'http://of1-dev-aaron.srv.songkick.net:3000/robots.txt';
  },

  parseAuthorizationCode: function(url) {
    var error = url.match(/[&\?]error=([^&]+)/);
    if (error) {
      throw 'Error getting authorization code: ' + error[1];
    }
    return url.match(/[&\?]code=([\w\/\-]+)/)[1];
  },

  accessTokenURL: function() {
    return 'https://staging.songkick.net/oauth/exchange';
  },

  accessTokenMethod: function() {
    return 'POST-QUERYSTRING';
  },

  accessTokenParams: function(authorizationCode, config) {
    return {
      oauth_version: 'v2-10',
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: this.redirectURL(config),
      grant_type: 'authorization_code',
      code: authorizationCode
    };
  },

  parseAccessToken: function(response) {
    var parsedResponse = JSON.parse(response);
    return {
      accessToken: parsedResponse.access_token,
      refreshToken: parsedResponse.refresh_token,
      expiresIn: parsedResponse.expires_in
    };
  }
});
