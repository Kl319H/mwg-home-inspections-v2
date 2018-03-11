//ssh root@159.65.70.35
//docker exec -it mongodb mongo mwg-home-inspections
//mup logs -f

module.exports = {
  servers: {
    one: {
      host: '159.65.70.35',
      username: 'root',
      pem: '~/.ssh/id_rsa'
    }
  },

  app: {
    name: 'mwg-home-inspections',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://mwghomeinspections.com',
      MONGO_URL: 'mongodb://localhost/mwg-home-inspections',
    },
    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },
    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },
  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },
  proxy: { // (optional)
    domains: 'mwghomeinspections.com,www.mwghomeinspections.com',
    ssl: {
      letsEncryptEmail: 'mike@mwghomeinspections.com',
      forceSSL: true 
    },
  },
};
