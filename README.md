# autoplate

**autoplate** is a CLI tool to generate an opinionated file structure for common and screen based components.

## Get Started

Run `npm install -g autoplate`

In the root of your project folder, run `ap init`. By default it will assume you have a `src` folder. If this is not the case, then alter the `root` in the `autocomponents.json`.

To make a component run `ap <name> <type> <size>`. For example:

`ap Button common atoms` to create a **Button** in the common atoms.

`ap HeroBlock product molecules` to create a **HeroBlock** in a **Product** screen as a molecule.

The `type` can be either `common` or the name of a screen subfolder. If the screen subfolder doesn't exist, it will attempt to make it.
