export default class Network {
  #listeners;

  constructor(range = 15, maxLen = 180) {
    this.range = range;
    this.maxLen = maxLen;

    this.#listeners = [];
  }

  subscribe(listener) {
    this.#listeners.push(listener);
  }

  broadcast(message) {
    if (message.length > this.maxLen) {
      throw new Error(
        `Message is too long (${message.length} > ${this.maxLen})`
      );
    }

    this.#listeners.forEach((listener) => listener.hear(message));
  }
}
