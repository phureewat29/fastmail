<h1 align="center">
FastMail
</h1>

<p align="center">
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
</p>

FastMail demonstrates using the setup generated by `create-react-app` alongside a Node.js Express API server. This application also using proxy technique to prevent issues with CORS. By proxy all API requests directly to backend which specify in `package.json`

```js
"proxy": "http://localhost:4000/",
``` 


## Prerequisites
 - Node.js >= 8.0 
 - Mongo DB >= 3.0
 - Sendgrid API Key
 - Mailgun API Key

## Usage

Copy `.env.example` and rename the file name to `.env` . Then modify your API keys before start the app.
``` bash
# Install node modules.
yarn && cd client && yarn

# Run the aplication.
yarn start
```
Alternatively, you can use npm by replacing `yarn` with `npm`.

This setup uses [concurrently](https://github.com/kimmobrunfeldt/concurrently) for process management. Executing `npm start` instructs `concurrently` to boot both the Webpack dev server (client) and the Express server (api).

### Test
``` bash
# Run test.
yarn test
```

## Project Structure

__Note:__ Most of the source code inside this project are written by myself. But have well code structure, I think :-) which you will understand by just navigate through functions and code comments. These below is list of important files in this application.

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **client**             | React application generated by 'create-react-app'.  |
| **client**/src             | All frontend sourcecode that I made for this project.  |
| **lib**/             | Third-party libraries which I modified/warpped including MongoDB, Sendgrid and Mailgun.              |
| **services**/         | Like controller in modern MVC pattern. But I named `services` instead. All application logics are located here.
| **config.js**         | All application configuration base on environment.                            |
| **api.js**            | Entry file, map all routes to services and handle all express configuration.                            |
| **client.js**         | Just a proxy script command to client.                            |


