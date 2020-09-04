# React Monorepo Test

This repo demonstrates how to create monorepo using [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) and `create-react-app`.

To add monorepo support to `create-react-app`, you can follow the instructions below. 
The steps assumed that you have already navigated to the project folder you wish to hold the monorepo. 

## Steps to add monorepo support to Create React App without ejecting

### 1. Create 2 React project
```
npx create-react-app app-1 --template typescript;
npx create-react-app app-2 --template typescript;
```

### 2. Create a common component folder
See the common folder structure [here](./common).

### 3. Create yarn workspace
Add a `package.json` at root folder and add the below content:
```json
{
  "private": true,
  "workspaces": ["app-1", "app-2", "common"]
}
```

### 4. Modify `app-1` and `app-2`
Apply the below changes to both `app-1` and `app-2`:
1. Remove `yarn.lock` and `.git` folder that sits inside each app folder
2. Move `.gitignore` to root folder, add `**/` to before every ignore path
3. Run `yarn add -D react-app-rewired customize-cra`
4. Replace starting script in `package.json` with the content below. Replace `<UNIQUE_PORT>` with unique port numbers like 3001.
    ```json
    "scripts": {
      "start": "PORT=<UNIQUE_PORT> react-app-rewired start",
      "build": "react-app-rewired build",
      "test": "react-app-rewired test"
    }
    ```
5. Add `config-overrides.js` with these contents, reference from [here](https://github.com/facebook/create-react-app/issues/1333#issuecomment-356800381):
    ```js
    const path = require('path');
    const {
      override,
      removeModuleScopePlugin,
      babelInclude
    } = require("customize-cra");


    module.exports = override(
      removeModuleScopePlugin(),
      babelInclude([
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, '../common')
      ]),
    );
    ```
6. Try importing any React components from `common` folder and use it:  
    ```js
    import HelloWorld from 'common/Modals/HelloWorld';
    ```

### 5. Adding startup scripts to the root package.json [Optional]
Add the following scripts to `[./package.json](./package.json)` so that you can start the `app-1` and `app-2` in root folder:
```json
"scripts": {
  "start:app-1": "yarn --cwd app-1 start",
  "start:app-2": "yarn --cwd app-2 start"
}
```

### 6. Starting an app
1. Run `yarn` in project root folder, this will install project dependencies needed for all apps and folders
2. Run `yarn start:app-1` to start `app-1` and see if everything works
