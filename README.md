# crycare-server

Server implementation for recognizing baby crying sounds received from remote devices


## Installation

Required: [Git](http://git-scm.com), [Node.js](http://nodejs.org)

1. Clone the repository.

    ```shell
    git clone https://github.com/blead/crycare-server.git
    ```

2. Navigate to the project directory.

    ```shell
    cd crycare-server
    ```

3. Install dependencies.

    ```shell
    npm install
    ```


## Configuration

The default configuration file `config.default.js` is located in `config/`.

Create and edit `config.js` in the same location to locally configure the server.

	```shell
	cp src/config/config.default.js src/config/config.js
	```

## Configuration Properties

- `appId`: NETPIE application ID
- `key`: NETPIE application key
- `secret`: NETPIE application key secret
- `alias`: NETPIE alias for the server
- `port`: The port on which the HTTP server will be listening e.g. `80`


## HTTP Server

The server serves all files located in `public/`.
