#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Get the current directory path
const currentDirectory = process.cwd();
// if no autocomponent.json file exists then create one
if (!fs.existsSync(path.join(currentDirectory, 'autocomponent.json'))) {
    fs.writeFileSync(path.join(currentDirectory, 'autocomponent.json'), JSON.stringify({
        root: '/src',
    }, null, 2));
}
const rootDir = JSON.parse(fs.readFileSync(path.join(currentDirectory, 'autocomponent.json'), 'utf8')).root;
// find all folders in rootDir
const srcCWD = path.join(currentDirectory, rootDir);
console.log(srcCWD);
// validate if srcCWD exists as a folder
if (!fs.existsSync(srcCWD)) {
    console.log('srcCWD does not exist');
    process.exit(1);
}
// core folders to check for
const coreFolders = [
    `${srcCWD}/components`,
    `${srcCWD}/components/common`,
    `${srcCWD}/components/common/atoms`,
    `${srcCWD}/components/common/molecules`,
    `${srcCWD}/components/common/organisms`,
    `${srcCWD}/components/common/templates`,
    `${srcCWD}/components/screens`,
];
function initFolders(folders, notFoundFolders = []) {
    folders.forEach((coreFolder) => {
        if (!fs.existsSync(coreFolder)) {
            fs.mkdirSync(coreFolder);
        }
    });
    return notFoundFolders;
}
function createComponent({ name, type, size }) {
    const componentType = type === 'common' ? 'common' : `screens/${type}`;
    const typeDirectory = `${srcCWD}/components/${componentType}`;
    const directory = `${srcCWD}/components/${componentType}/${size}/${name}`;
    const file = `${directory}/${name}.tsx`;
    // check componentType folder exists
    if (!fs.existsSync(typeDirectory)) {
        fs.mkdirSync(typeDirectory);
    }
    // check sizes exist
    if (!fs.existsSync(`${typeDirectory}/${size}`)) {
        fs.mkdirSync(`${typeDirectory}/${size}`);
    }
    // check component folder exists
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    // create a component file
    const boilerPlate = `
  import React from 'react';

  export type T${name}Props = {
    children?: React.ReactNode
    className?: string
    testId?: string
  }

  export const ${name} = ({
    children,
    className,
    testId
  }: T${name}Props) => {
    return (
      <div test-id={testId} className={className}>
        {children}
      </div>
    )
  `;
    // check if componet file exists
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, boilerPlate);
        // create a component test file
        const testFile = `${directory}/${name}.test.tsx`;
        const testBoilerPlate = `
    import React from 'react';
    import { render } from '@testing-library/react';
    import { ${name} } from './${name}';

    describe('<${name} />', () => {
      it('should render', () => {
        const { getByTestId } = render(<${name} />);
        const component = getByTestId('${name}');
        expect(component).toBeTruthy();
      });
    });
    `;
        fs.writeFileSync(testFile, testBoilerPlate);
    }
}
// listen to process arguments if it is init then run initFolders(coreFolders)
const cliArgs = process.argv.slice(2);
process.stdout.write(`cliArgs: ${cliArgs}\n`);
if (cliArgs[0] === 'init') {
    initFolders(coreFolders);
    process.exit(0);
}
if (cliArgs[0] === 'create') {
    const name = cliArgs[1];
    const type = cliArgs[2];
    const size = cliArgs[3];
    createComponent({
        name,
        type,
        size,
    });
    process.exit(0);
}
