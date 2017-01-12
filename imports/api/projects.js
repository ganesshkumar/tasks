import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
  Meteor.publish('projects', function projectsPublication() {
    return TaskOrder.find({
      userId: this.userId
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
      createdAt: new Date(),
    });
  }
});
