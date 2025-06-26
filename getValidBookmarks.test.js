import { jest } from "@jest/globals";

// Mock storage.js
jest.unstable_mockModule("./storage.js", () => ({
  getData: jest.fn(),
}));

// import both modules after mocking
const { getData } = await import("./storage.js"); 
const { getValidBookmarks } = await import("./getValidBookmarks.js"); 

describe("getValidBookmarks", () => {
  it("returns bookmarks if data is a valid array", () => { 
    const mockBookmarks = [
      { url: "https://example.com", title: "Example", timestamp: 123456 },
    ];
    getData.mockReturnValue(mockBookmarks); 
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
