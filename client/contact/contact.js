import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import moment from 'moment';
import './contact.html';

Template.contact.onCreated(function(){
    const instance = this;
    instance.form = new ReactiveVar("requestQuote");
})

Template.contact.events({
    'submit form'(event, instance){
        event.preventDefault();
        const form = {};
        form.date = moment().toISOString();
        instance.findAll('.form-control').forEach((input) => {
            form[input.name] = input.value;
        });
        console.log(form);
        Meteor.call("requestQuote", form, (error, result) => {
            console.log(error, result);
        });
        instance.form.set("thankYou");
    }
});

Template.contact.helpers({
    requestQuoteTemplate(){
        return Template.instance().form.get();
    }
})