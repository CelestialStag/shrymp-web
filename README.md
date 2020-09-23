

<div align="center">

<h1> <strong>shrymp frontend</strong> </h1>

**a quick and easy URL shortener.**

<!-- <img src="res/repo/banner.svg" height='300px'> -->

[![Build Status](https://travis-ci.com/theluckyegg/shrymp-web.svg?branch=master)](https://travis-ci.com/theluckyegg/shrymp-web)
[![GitHub Issues](https://img.shields.io/github/issues/theluckyegg/shrymp-web.svg)](https://github.com/theluckyegg/shrymp-web/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/theluckyegg/shrymp-web.svg)](https://github.com/theluckyegg/shrymp-web/pulls)
[![GitHub License](https://img.shields.io/github/license/theluckyegg/shrymp-web)](/LICENSE)

</div>

## Getting Started

### Installing

#### **create and edit server config file in res/config.json**
```
vim config/server.json
```
```json
{
	"local_server": "url of api on serverside.",
	"server": "url of api over network."
}
```

### Compiling

#### **transile the source into javascript**

```
yarn build
```

### Running

#### **run the program**

```
yarn start
```

## Deploying

#### **TODO**

## Documentation

Software specifications & design documents can be found in the [wiki](/wiki).

## See Also

- **shrymp-server - https://github.com/theluckyegg/shrymp-server**

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for a in depth view.

## Credits

Please see [CREDITS.md](CREDITS.md) for a in depth view.

## License

This project is licensed under the **GPL-3.0 License** - see the [LICENSE.md](LICENSE.md) file for details.
