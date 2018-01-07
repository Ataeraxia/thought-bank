import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Thoughts = new Mongo.Collection("thoughts");

if(Meteor.isServer) {
    Meteor.publish("thoughts", function thoughtsPublication() {
        return Thoughts.find({
            owner: this.userId
        });
    });
}

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
    "thoughts.setArchived" (thoughtId) {
        check(thoughtId, String);

        const thought = Thoughts.findOne(thoughtId);

        if(thought.owner !== this.userId) {
            throw new Meteor.Error("not-authorized");
        }

        Thoughts.update(thoughtId, {
            $set: {
                archived: !thought.archived
            }
        });
    },
})