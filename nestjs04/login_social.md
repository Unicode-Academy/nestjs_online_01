# Đăng nhập thông qua mạng xã hội

## Google

1. Lấy Authentication Code

GET https://accounts.google.com/o/oauth2/v2/auth

Params:

- client_id: CLIENT ID cua ban
- redirect_uri: Link Callback
- response_type: code
- scope: email profile
- access_type: offline

2. Lấy Access Token

POST https://oauth2.googleapis.com/token

Body:

- code: Code lấy từ bước trên
- client_id: CLIENT ID cua ban
- client_secret: SECRET cua ban
- redirect_uri: Link Callback
- grant_type: authorization_code

3. Lấy user từ access token

POST https://www.googleapis.com/oauth2/v1/userinfo?access_token={access_token}

## Github

1. Lấy Authorization Code

GET https://github.com/login/oauth/authorize

Params:

- client_id: CLIENT ID cua ban
- redirect_uri: Link Callback
- scope: user
- state: github

2. Lấy Access Token

POST https://github.com/login/oauth/access_token

Body:

- client_id: CLIENT ID cua ban
- client_secret: SECRET cua ban
- code: Code lấy từ bước trên
- redirect_uri: Link Callback
- state: github

3. Lấy user từ access token

POST https://api.github.com/user

Headers

- Authorization: token
- User-Agent: MyApp
