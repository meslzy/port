import net from "net";

class UnavailablePortError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/**
 * Checks if a port is available
 **/
const isPortAvailable = (port: number): Promise<boolean> => new Promise((resolve) => {
  const server = net.createServer();

  server.on("listening", () => {
    server.close();
  });

  server.on("close", () => {
    resolve(true);
  });

  server.on("error", () => {
    resolve(false);
  });

  server.listen(port);
});

interface AvailablePortsOptions {
  /**
   * Minimum port number
   * @default 1023
   **/
  min?: number;
  /**
   * Maximum port number
   * @default 65535
   **/
  max?: number;
  /**
   * Maximum number of ports to return
   **/
  limit?: number;
  /**
   * Ports to include
   **/
  include?: number[];
  /**
   * Ports to exclude
   **/
  exclude?: number[];
}

/**
 * Finds available ports
 * @returns Array of available ports
 **/
const getAvailablePorts = async (options?: AvailablePortsOptions): Promise<number[]> => {
  const min = options?.min ?? 1023;
  const max = options?.max ?? 65535;

  const include = options?.include ?? [];
  const exclude = options?.exclude ?? [];

  const limit = options?.limit ?? Infinity;

  const ports: number[] = [];

  for (let port = min; port <= max; port++) {
    if (include.length > 0 && !include.includes(port)) {
      continue;
    }

    if (exclude.includes(port)) {
      continue;
    }

    if (await isPortAvailable(port)) {
      ports.push(port);
    }

    if (ports.length >= limit) {
      break;
    }
  }

  return ports;
};

interface AvailablePortOptions {
  /**
   * Minimum port number
   * @default 1023
   **/
  min?: number;
  /**
   * Maximum port number
   * @default 65535
   **/
  max?: number;
  /**
   * Ports to include
   **/
  include?: number[];
  /**
   * Ports to exclude
   **/
  exclude?: number[];
}

/**
 * Finds an available port or throws an error
 * @return Available port
 * @throws UnavailablePortError
 **/
const getAvailablePort = async (options?: AvailablePortOptions): Promise<number> => {
  const port = await getAvailablePorts({
    ...options,
    limit: 1,
  });

  const availablePort = port.at(0);

  if (availablePort) {
    return availablePort;
  }

  throw new UnavailablePortError("No available port found");
};

export type {
  AvailablePortsOptions,
  AvailablePortOptions,
};

export {
  UnavailablePortError,
};

export {
  isPortAvailable,
  getAvailablePorts,
  getAvailablePort,
};