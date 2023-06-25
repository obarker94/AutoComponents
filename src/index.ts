#!/usr/bin / env node
import * as fs from 'fs';
import * as path from 'path';

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
console.log(srcCWD)

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
]

function initFolders(folders: string[], notFoundFolders: string[] = []) {

  folders.forEach((coreFolder) => {
    if (!fs.existsSync(coreFolder)) {
      fs.mkdirSync(coreFolder);
    }
  })
  return notFoundFolders;
}

export type TCreateComponent = {
  name: string
  type: "common" | string & {}
  size: "atoms" | "molecules" | "organisms" | "templates"
}

function createComponent({
  name,
  type,
  size
}: TCreateComponent) {
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
  `

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
    `

    fs.writeFileSync(testFile, testBoilerPlate);
  }
}

// listen to process arguments if it is init then run initFolders(coreFolders)
const args = process.argv;
if (args[0] === 'init') {
  initFolders(coreFolders);
  process.exit(0);
}

if (args[0] === 'create') {
  const name = args[1];
  const type = args[2];
  const size = args[3] as "atoms" | "molecules" | "organisms" | "templates";

  createComponent({
    name,
    type,
    size
  })
  process.exit(0);
}













