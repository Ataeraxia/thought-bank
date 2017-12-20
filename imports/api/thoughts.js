import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Thoughts = new Mongo.Collection("thoughts");

Meteor.methods({
    "thoughts.insert" (text) {
        check(text, String);

        if(!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Thoughts.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    "thoughts.setArchived" (thoughtId, thought) {
        check(thoughtId, String);

        Thoughts.update(thoughtId, {
            $set: {
                archived: !thought.archived
            }
        });
    },
})