import angular from "angular";
import angularMeteor from "angular-meteor";
import { Meteor } from "meteor/meteor";
import { Thoughts } from "../../api/thoughts.js";

import template from "./thoughtBank.html";

class ThoughtBankCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.subscribe("thoughts");

        this.helpers({
            thoughts() {
                return Thoughts.find({
                    archived: {
                        $ne: true
                    }
                }, {
                    sort: {
                        createdAt: -1
                    }
                });
            },
            currentUser() {
                return Meteor.user();
            }
        })
    }

    addThought(newThought){
        Meteor.call("thoughts.insert", newThought);

        this.newThought = "";
    }

    setArchived(thought) {
        Meteor.call("thoughts.setArchived", thought._id, thought);
    }
}

export default angular.module("thoughtBank", [
    angularMeteor
])
    .component("thoughtBank", {
        templateUrl: "imports/components/thoughtBank/thoughtBank.html",
        controller: ["$scope", ThoughtBankCtrl]
    });