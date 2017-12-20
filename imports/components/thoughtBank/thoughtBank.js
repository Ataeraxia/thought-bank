import angular from "angular";
import angularMeteor from "angular-meteor";
import { Thoughts } from "../../api/thoughts.js";

import template from "./thoughtBank.html";

class ThoughtBankCtrl {
    constructor($scope) {
        $scope.viewModel(this);

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
            }
        })
    }

    addThought(newThought){
        Thoughts.insert({
            text: newThought,
            createdAt: new Date
        });

        this.newThought = "";
    }

    setArchived(thought) {
        Thoughts.update(thought._id, {
            $set: {
                archived: !thought.archived
            },
        });
    }
}

export default angular.module("thoughtBank", [
    angularMeteor
])
    .component("thoughtBank", {
        templateUrl: "imports/components/thoughtBank/thoughtBank.html",
        controller: ["$scope", ThoughtBankCtrl]
    });