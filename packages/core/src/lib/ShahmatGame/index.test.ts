import { ShahmatGame } from ".";

describe("ShahmatGame", () => {
  it("returns when called", () => {
    expect(() => new ShahmatGame()).toBeTruthy();
  });
});
