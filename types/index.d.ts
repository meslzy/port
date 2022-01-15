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
  
  type available = boolean;
  
  export interface isPortAvailable {
    return: Promise<available>;
  }
}
