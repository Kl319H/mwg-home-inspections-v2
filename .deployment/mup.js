//ssh ubuntu@34.215.225.93

module.exports = {
  servers: {
    one: {
      host: '34.215.225.93',
      username: 'ubuntu',
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

    ssl: { // (optional)
      // Enables let's encrypt (optional)
      autogenerate: {
        email: 'mike@mwghomeinspections.com',
        // comma separated list of domains
        domains: 'mwghomeinspections.com'
      },
      port: 443
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
  }
};
