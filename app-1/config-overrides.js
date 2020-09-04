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
