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

Given("the maximum character length is {int}", function (maxLen) {
  this.network = new Network(15, maxLen);
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

When("{shouter} shouts,", function (shouter, longMsg) {
  try {
    this.persons[shouter.toLowerCase()] = new Person({
      shouter,
      network: this.network,
    });
    this.persons[shouter.toLowerCase()].shout(longMsg);
  } catch (error) {
    this.error = error;
  }
});

Then("{listener} hears {shouter}'s Shout", function (listener, shouter) {
  expect(this.persons[listener.toLowerCase()].messages).toEqual(
    this.persons[shouter.toLowerCase()].messages
  );
});

Then(
  "{listener} does not hear {shouter}'s Shout",
  function (listener, shouter) {
    expect(this.persons[listener.toLowerCase()].messages).toEqual(
      this.persons[shouter.toLowerCase()].messages
    );
  }
);

Then(
  'an error message is displayed that states "Message is too long"',
  function () {
    expect(this.error).toBeDefined();
    expect(this.error.message.toLowerCase()).toContain("message is too long");
  }
);
