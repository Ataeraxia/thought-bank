import angular from 'angular';
import angularMeteor from 'angular-meteor';
import thoughtBank from "../imports/components/thoughtBank/thoughtBank";
import "../imports/startup/accounts-config.js";

angular.module('mind-health', [
  angularMeteor,
  thoughtBank.name,
  "accounts.ui"
]);