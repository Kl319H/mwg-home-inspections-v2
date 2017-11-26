
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import moment from 'moment';
//import { SSR } from 'meteorhacks:ssr';

Meteor.methods({
  requestQuote(formData) {
    console.log(formData);
    const html = SSR.render("email", formData);
    Email.send({
      from: "mwginspections@gmail.com",
      to: "michaelgremillion@yahoo.com",
      bcc: "derrick.gremillion@gmail.com",
      subject: `Quote Request from ${formData.email}`,
      html: html
    });
    return "Success";
  }
})

Meteor.startup(() => {
  const emailPassword = Meteor.settings.emailPassword;
  process.env.MAIL_URL = `smtps://mwginspections@gmail.com:${emailPassword}@smtp.gmail.com:465/`;
  console.log(SSR);
  
  /*   Email.send({
          from: "mwginspections@gmail.com",
          to: "derrick.gremillion@gmail.com",
          subject: "Test",
          text: "This is a body"
      });
  */

});

SSR.compileTemplate("email", Assets.getText("email.html"))

Template.email.helpers({
  formatDate(date){
    return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
  }
})