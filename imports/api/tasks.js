import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');
export const TaskOrder = new Mongo.Collection('task-order');

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { owner: this.userId }
      ]
    });
  });

  Meteor.publish('taskOrder', function taskOrderPublication() {
    return TaskOrder.find({
      _id: this.userId
    });
  });
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(userId).username
    }, (error, result) => {
      console.log(error, result)
      if (!error) {
        const taskOrder = TaskOrder.findOne({_id: userId});
        if (!taskOrder) {
          TaskOrder.insert({_id: userId, tasksOrder: [result]});
        } else {
          TaskOrder.update(
            { _id: userId },
            { $push: { tasksOrder: { $each: [result], $position: 0 }}}
          );
        }
      } else {console.error(error)}
    });
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },

  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },

  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },

  'tasks.setOrder'(userId, taskIds) {
    check(userId, String);
    check(taskIds, [String]);

    // [TODO] Add check here
    TaskOrder.update(userId, {tasksOrder: taskIds}, {upsert: true});
  }
});
