# autoplate - LIVE PREVIEW

**autoplate** is a CLI tool to generate an opinionated file structure for common and screen based components. To begin with, this package will support `react` and `react-testing-library` to generate boilerplate for a file and corresponding test.

This package is a work in progress.

## Development

As of now, you will need to manually add to path or run `npm link` in the src folder. 

## Roadmap

### 1.1.0
- Autoinstall into path

### 1.2.0
- Custom folder structures in the `autocomponent.json`
- Custom boiler plates able to be set by file extension in the `autocomponent.json`


## Get Started

Run `npm install -g autoplate`

In the root of your project folder, run `ap init`. By default it will assume you have a `src` folder. If this is not the case, then alter the `root` in the `autocomponents.json`.

To make a component run `ap <name> <type> <size>`. For example:

`ap Button common atoms` to create a **Button** in the common atoms.

`ap HeroBlock product molecules` to create a **HeroBlock** in a **Product** screen as a molecule.

The `type` can be either `common` or the name of a screen subfolder. If the screen subfolder doesn't exist, it will attempt to make it.
