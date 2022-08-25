import Person from "../models/Person";

describe("Person", () => {
  let network;
  let person;

  let subscribeSpy;
  let broadcastSpy;

  beforeEach(() => {
    network = {
      range: 15,
      subscribe() {},
      broadcast() {},
    };

    person = new Person({ name: "John", network });

    subscribeSpy = jest.spyOn(network, "subscribe");
    broadcastSpy = jest.spyOn(network, "broadcast");
  });

  it("subscribes to the network", () => {
    const newPerson = new Person(person);

    expect(subscribeSpy).toHaveBeenCalledWith(newPerson);
  });

  it("broadcasts a message to the network", () => {
    const newPerson = new Person(person);
    const message = "Free 🥯s!";

    newPerson.shout(message);

    expect(broadcastSpy).toHaveBeenCalledWith(message);
  });

  it("moves to position", () => {
    const newPerson = new Person(person);
    const position = 10;

    newPerson.moveTo(position);

    expect(newPerson.position).toBe(position);
  });

  it("hears a message from the network when in range", () => {
    const newPerson = new Person(person);
    const inRangeMsg = "Free 🥯s!";

    // Move person into range of network
    newPerson.moveTo(10);

    newPerson.hear(inRangeMsg);

    expect(newPerson.messages).toEqual([inRangeMsg]);
  });

  it("doesn't hear a message from the network when out of range", () => {
    const newPerson = new Person(person);
    const inRangeMsg = "Free 🥯s!";

    // Move person into range of network
    newPerson.moveTo(100);

    newPerson.hear(inRangeMsg);

    expect(newPerson.messages).toEqual(
      expect.not.arrayContaining([inRangeMsg])
    );
  });
});
