import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "expect";
import Network from "../../src/models/Network.js";
import Person from "../../src/models/Person.js";

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
  // Write code here that turns the phrase above into concrete actions
  this.network = new Network(range);
});

Given("Sean is located at {float}", function (shouterPos) {
  // Write code here that turns the phrase above into concrete actions
  this.shouter = new Person({ name: "Sean", network: this.network });
});

Given("Lucy is located at {float}", function (listenerPos) {
  // Write code here that turns the phrase above into concrete actions
  this.listener = new Person({
    name: "Lucy",
    network: this.network,
    position: listenerPos,
  });
});

When("Sean shouts {string}", function (msg) {
  this.shouter.shout(msg);
});

Then("Lucy hears Sean's Shout", function () {
  expect(this.listener.messages).toEqual(this.shouter.shouts);
});
