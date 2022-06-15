declare module "types" {
  export interface findAvailablePorts {
    options: {
      min?: number;
      max?: number;
      limit?: number;
      exclude?: number[];
    };
    return: Promise<number[]>;
  }

  export interface findAvailablePort {
    options: {
      min?: number;
      max?: number;
      exclude?: number[];
    };
    return: Promise<number>;
  }

  export interface isPortAvailable {
    return: Promise<boolean>;
  }
}
