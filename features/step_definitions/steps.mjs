import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "expect";

Given("Lucy is located {float} meters away from Sean", function (distance) {
  this.distance = distance;
  this.listener = "Lucy";
  this.shouter = "Sean";
});

When("Sean shouts {string}", function (msg) {
  this.shouter.shout(msg);
  this.msg = msg;
});

Then("Lucy hears Sean's Shout", function () {
  expect(this.listener.msg).toContain(this.msg);
});
