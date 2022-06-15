import * as types from "types";

import net from "net";

export const findAvailablePorts = async (options?: types.findAvailablePorts["options"]): types.findAvailablePorts["return"] => {
	const min = options?.min ?? 0;
	const max = options?.max ?? 65535;
	const limit = options?.limit ?? 65535;
	const exclude = options?.exclude ?? [];

	const ports = Array.from({length: (max - min) + 1}).reduce((ports: number[], _, index: number) => {
		const port = min + index;

		if (exclude.includes(port)) return ports;

		return ports.concat([min + index]);
	}, []);

	const portsAvailable = [];

	for (const port of ports) {
		if (portsAvailable.length >= limit) break;
		if (await isPortAvailable(port)) portsAvailable.push(port);
	}

	return portsAvailable.slice(0, limit);
};

export const findAvailablePort = async (options?: types.findAvailablePort["options"]): types.findAvailablePort["return"] => {
	const min = options?.min ?? 0;
	const max = options?.max ?? 65535;
	const exclude = options?.exclude ?? [];

	const ports = Array.from({length: (max - min) + 1}).reduce((ports: number[], _, index: number) => {
		const port = min + index;

		if (exclude.includes(port)) return ports;

		return ports.concat([min + index]);
	}, []);

	for (const port of ports) {
		if (await isPortAvailable(port)) return port;
	}

	return -1;
};

export const isPortAvailable = async (port: number): types.isPortAvailable["return"] => new Promise((resolve) => {
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

exports.findAvailablePorts = findAvailablePorts;
exports.findAvailablePort = findAvailablePort;
exports.isPortAvailable = isPortAvailable;

