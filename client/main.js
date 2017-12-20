import angular from 'angular';
import angularMeteor from 'angular-meteor';
import thoughtBank from "../imports/components/thoughtBank/thoughtBank";

angular.module('mind-health', [
  angularMeteor,
  thoughtBank.name
]);