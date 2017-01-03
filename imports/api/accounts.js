import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";
import { check } from 'meteor/check';

Meteor.methods({
  'accounts.signup'(username, password) {
    check(username, String);
    check(password, String);

    Accounts.createUser({
      username,
      password
    });
  }
});
