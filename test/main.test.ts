import {describe, it, expect} from "vitest";

import {isPortAvailable, getAvailablePort, getAvailablePorts, UnavailablePortError} from "../source/main";

import {createServer} from "http";

const server = createServer();

server.listen(3000);

describe("isPortAvailable", () => {
  it("should return false", async () => {
    expect(await isPortAvailable(3000)).toBe(false);
  });

  it("should return true", async () => {
    expect(await isPortAvailable(3001)).toBe(true);
  });
});

describe("getAvailablePort", () => {
  it("should return 3001", async () => {
    const port = await getAvailablePort({
      min: 3000,
    });

    expect(port).toBe(3001);
  });

  it("should throw an error", async () => {
    try {
      await getAvailablePort({
        min: 3000,
        max: 3000,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UnavailablePortError);
    }
  });
});

describe("getAvailablePorts", () => {
  it("should return [3001, 3002]", async () => {
    const ports = await getAvailablePorts({
      min: 3000,
      max: 3006,
      limit: 2,
    });

    expect(ports).toEqual([3001, 3002]);
  });

  it("should return [3001, 3002]", async () => {
    const ports = await getAvailablePorts({
      min: 3000,
      max: 3006,
      limit: 3,
      include: [3001, 3002, 3003, 3004, 3005, 3006],
      exclude: [3002, 3004, 3006],
    });

    expect(ports).toEqual([3001, 3003, 3005]);
  });
});
