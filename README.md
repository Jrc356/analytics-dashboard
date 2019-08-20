# Analytics Dashboard
This analytics dashboard is a custom built website analytics dashboard built on Nodejs and React. 
It utilizes the googleapis package to read metrics and display them in a simple and elegant way. It also implements real 
time analytics using Socket.io and a custom script. This project was written as a project for an upcoming article (stay tuned for link)
  
# Installation & Usage
Install the packages necessary by first installing the server side packages. Then install the client side packages.  

Create a `.env` file with the following variables:
```bash
SERVER_PORT=<port>
NODE_ENV=<development/production>
CLIENT_EMAIL=<google service account email>
PRIVATE_KEY=<google service account private key>
VIEW_ID=<google analytics view id>
```

From the top level directory install with yarn or npm:  
```bash
$ yarn install
$ cd client
$ yarn install
```
or 
```bash
$ npm install
$ cd client
$ npm install
```  
  
Finally, run `npm start` from the top level directory.

This will start the node server and open the local webpack server for the front end.

*NOTE: The start script is built for \*nix systems and uses `&&` so it will not work on Windows systems at this time. 
I do have an open issue for this and will return to it in the near future.*

# Deployment
Build the client by doing the following:
From the top level directory:
```bash
$ cd client
$ yarn build
```
or, using npm:
```bash
$ cd client
$ npm build
```

Then change the NODE_ENV variable in `.env` to `production`
Finally, use `npm run server` from the top level directory. This will start up the node server using the client `build` 
output as the static directory. You can now navigate to `localhost:<SERVER_PORT>` and see your app.

# License
See [LICENSE](LICENSE.md)
