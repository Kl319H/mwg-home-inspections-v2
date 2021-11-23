
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email';
import moment from 'moment';
//import { SSR } from 'meteorhacks:ssr';

const Contacts = new Mongo.Collection('contacts');

Meteor.methods({
  requestQuote(formData) {
    console.log(formData);
    Contacts.insert(formData);
    const html = SSR.render("email", formData);
    Email.send({
      from: "mwginspections@gmail.com",
      to: "mike@mwghomeinspections.com",
      bcc: "derrick.gremillion@gmail.com",
      subject: `Quote Request from ${formData.email}`,
      html: html
    });
    return "Success";
  }
})

Meteor.startup(() => {
  const emailPassword = Meteor.settings.emailPassword;
  //process.env.MAIL_URL = `smtps://mwginspections@gmail.com:${emailPassword}@smtp.gmail.com:465/`; //wont work in prod
  process.env.MAIL_URL = `smtp://mwginspections@gmail.com:${emailPassword}@smtp.gmail.com:587/`;
  /* 
    Email.send({
          from: "mwginspections@gmail.com",
          to: "derrick.gremillion@gmail.com",
          subject: "Test",
          text: "This is a body"
      });
  */

});

// Listen to incoming HTTP requests (can only be used on the server).
WebApp.connectHandlers.use('/sitemap.xml', (req, res, next) => {
  const sitemap = Assets.getText("sitemap.xml")
  res.writeHead(200, {'Content-Type': 'application/xml'});
  res.end(sitemap);
});

WebApp.connectHandlers.use('/robots.txt', (req, res, next) => {
  const robots = Assets.getText("robots.txt")
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(robots);
});

SSR.compileTemplate("email", Assets.getText("email.html"))

Template.email.helpers({
  formatDate(date){
    return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
  }
})