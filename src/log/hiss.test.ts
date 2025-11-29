import { hissWarning } from "./hiss";

describe("hissWarning", () => {
  it("logs a warning with the cat hiss emoji formatting", () => {
    const spy = jest.spyOn(console, "warn").mockImplementation(() => {});

    hissWarning("Back off!");

    // update expected formatting to match actual hissWarning implementation
    expect(spy).toHaveBeenCalledWith("😾⚠️ Back off! ⚠️😾");

    spy.mockRestore();
  });
});
