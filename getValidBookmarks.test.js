// getValidBookmarks.test.js
import { jest } from "@jest/globals";

// 1. Mock storage.js first
jest.unstable_mockModule("./storage.js", () => ({
  getData: jest.fn(),
}));

// 2. Now dynamically import both modules after mocking
const { getData } = await import("./storage.js");
const { getValidBookmarks } = await import("./getValidBookmarks.js");

describe("getValidBookmarks", () => {
  it("returns bookmarks if data is a valid array", () => {
    const mockBookmarks = [
      { url: "https://example.com", title: "Example", timestamp: 123456 },
    ];
    getData.mockReturnValue(mockBookmarks); // now this will work
    const result = getValidBookmarks("user1");
    expect(result).toEqual(mockBookmarks);
  });

  it("returns empty array if data is not an array", () => {
    getData.mockReturnValue({ not: "an array" });
    const result = getValidBookmarks("user2");
    expect(result).toEqual([]);
  });

  it("returns empty array if data is null", () => {
    getData.mockReturnValue(null);
    const result = getValidBookmarks("user3");
    expect(result).toEqual([]);
  });
});
