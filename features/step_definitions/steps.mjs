import { Before, Given, Then, When } from "@cucumber/cucumber";
import { expect } from "expect";
import Network from "../../src/models/Network.js";
import Person from "../../src/models/Person.js";

Before(function () {
  this.persons = {};
});

// Given("Lucy is located {float} meters away from Sean", function (distance) {
//   this.network = new Network();
//   this.listener = new Person({
//     name: "Lucy",
//     network: this.network,
//     position: distance,
//   });
//   this.shouter = new Person({ name: "Sean", network: this.network });
// });

Given("the range is {float}", function (range) {
  this.network = new Network(range);
});

Given("{person} is located at {float}", function (name, pos) {
  this.persons[name.toLowerCase()] = new Person({
    name,
    network: this.network,
    pos,
  });
});

// Given("Lucy is located at {float}", function (listenerPos) {
//   this.listener = new Person({
//     name: "Lucy",
//     network: this.network,
//     position: listenerPos,
//   });
// });

When("{shouter} shouts {string}", function (shouter, msg) {
  this.persons[shouter.toLowerCase()].shout(msg);
});

Then("{listener} hears {shouter}'s Shout", function (listener, shouter) {
  expect(this.persons[listener.toLowerCase()].messages).toEqual(
    this.persons[shouter.toLowerCase()].messages
  );
});
