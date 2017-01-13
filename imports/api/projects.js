import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Tasks , TaskOrder } from './tasks';
export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
  Meteor.publish('projects', function projectsPublication() {
    return Projects.find({
      owner: this.userId
    });
  });
}

Meteor.methods({
  'projects.create'(name) {
    check(name, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (Projects.findOne({owner: this.userId, name: name})) {
      throw new Meteor.Error('project-already-exists');
    }

    Projects.insert({
      name,
      owner: this.userId,
      tasksOrder: [],
      createdAt: new Date(),
    });
  },

  'projects.insertTask'(text, projectId) {
    check(text, String);

    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (Projects.findOne({_id: projectId}).owner !== userId) {
      throw new Meteor.Error('project-not-authorized');
    }

    Tasks.insert({
      text,
      project: projectId,
      createdAt: new Date(),
      owner: this.userId,
      checked: false,
      username: Meteor.users.findOne(userId).username
    }, (error, result) => {
      if (!error) {
        Projects.update(
          { _id: projectId },
          { $push: { tasksOrder: { $each: [result], $position: 0 }}}
        );
      } else {console.error(error)}
    });
  }
});
