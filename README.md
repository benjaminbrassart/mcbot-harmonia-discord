### Configure

Edit the file `src/config.json`

```jsonc
{
    "host": "mc.hypixel.net", // the host of the server
    "port": 25565, // the port of the server
    "token": "" // your bot's token
}
```

### Build

```sh
# install dependencies
npm install --only=prod

# transpile .ts into .js files
npm run build
```

### Start

```sh
npm start
```

### To-do list

-   Use the Minecraft Server Query protocol instead of an external API
