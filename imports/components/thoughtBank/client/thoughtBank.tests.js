import "angular-mocks";
import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";

import thoughtBank from "../thoughtBank";

describe("thoughtBank", function() {
    var element;

    beforeEach(function(){
        var $compile;
        var $rootScope;

        window.module(thoughtBank.name);

        inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });

        element = $compile("<thought-bank></thought-bank>")($rootScope.$new(true));
        $rootScope.$digest();
    });

    describe("component", function(){
        it("should be showing header", function(){
            assert.include(element[0].querySelector("h1").innerHTML, "Thought Bank");
        });
    });
})