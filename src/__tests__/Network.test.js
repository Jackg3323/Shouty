import Network from "../models/Network.js";

it("throws an error if a message is over 140 characters long", () => {
  const network = new Network(1, 140);

  const msg = "This is a short message";

  expect(() => network.broadcast(msg)).not.toThrow();

  expect(() => {
    network.broadcast("a".repeat(141));
  }).toThrow();
});

it("broadcasts a message that's not too long to all listeners", () => {
  const network = new Network();
  const shout = "Free 🥯s!";

  // Create a listener with a minimal implementation
  // We want to just see that it is called with the correct argument
  const listener = { hear(_) {} };

  const spy = jest.spyOn(listener, "hear");

  network.subscribe(listener);
  network.broadcast(shout);

  expect(spy).toHaveBeenCalledWith(shout);
});
