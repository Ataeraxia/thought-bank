import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { assert } from "meteor/practicalmeteor:chai";

import { Thoughts } from "./thoughts.js";
// I only do the { spaces } because vscode tabs to autocomplete the entire import statement for me

if(Meteor.isServer) {
    describe("Thoughts", () => {
        describe("methods", () => {
            const userId = Random.id();
            let thoughtId;

            beforeEach(() => {
                Thoughts.remove({});
                // This is scary right it seems scary
                thoughtId = Thoughts.insert({
                    text: "Wowie McWow look at me now",
                    createdAt: new Date(),
                    owner: userId,
                    username: "tmeasday",
                });
            });

            it("can archive owned thought", () => {
                const archiveThought = Meteor.server.method_handlers["thoughts.setArchived"];

                const invocation = {
                    userId
                };

                archiveThought.apply(invocation, [thoughtId]);

                assert.equal(Thoughts.find({
                    archived: {
                        $ne: true
                    }
                }).count(), 0);
            });
        });
    });
}