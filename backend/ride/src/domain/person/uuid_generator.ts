import crypto from "crypto";

export default class UUIDGenetator {
  static create() {
    return crypto.randomUUID();
  }
}
