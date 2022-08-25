export default class Person {
  #messages;
  #shouts;

  constructor({ name, network, position = 0 } = {}) {
    this.name = name;
    this.network = network;
    this.position = position;

    // Add person to network
    this.network.subscribe(this);

    this.#messages = [];
    this.#shouts = [];
  }

  get messages() {
    return this.#messages;
  }

  get shouts() {
    return this.#shouts;
  }

  moveTo(position) {
    this.position = position;
  }

  shout(newMessage) {
    this.#shouts.push(newMessage);
    this.network.broadcast(newMessage);
  }

  hear(message) {
    if (this.position <= this.network.range) this.#messages.push(message);
  }
}
