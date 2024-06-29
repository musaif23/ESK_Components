// @ts-nocheck
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import * as tslib from "@esker-sdk/tslib";

const ESKER_LIB_BUILDER = (originalFileName) => ({
	name: 'esker-library-builder',

	generateBundle(options, bundles)
	{
		var keys = Object.keys(bundles);
		let bundle = bundles[keys[0]];
		bundle.code = bundle.code.replace(/this\.Lib/g, 'Lib');
	}

});

const configs = () =>
{
	return {
		input: "./Components/LIB_COMPONENTS.ts",

		plugins: [nodeResolve({ extensions: ['.ts', '.mjs', '.js', '.json', '.node'] }),
		typescript({ tslib: "./node_modules/@esker-sdk/tslib/tslib.es6.js" }), ESKER_LIB_BUILDER()

		],
		output: {
			file: './Out/Components/LIB_COMPONENTS.js',
			interop: 'default',
			name: 'Lib.Components',
			banner: `/* eslint no-empty-function: "off", no-unused-vars: "off" */
/* LIB_DEFINITION
{
	"name": "LIB_COMPONENTS",
	"libraryType": "LIB",
	"scriptType": "COMMON",
	"versionable" : false,
	"require": [
		"Sys/Sys_Helpers",
		"Sys/Sys_Helpers_Date",
		"Sys/Sys_Helpers_Array",
		"Sys/Sys_Helpers_String",
		"Sys/Sys_Helpers_Promise",
		"Sys/Sys_Helpers_LdapUtil",
		"[Sys/Sys_GenericAPI_Server]",
    	"[Sys/Sys_GenericAPI_Client]"
	]
}
*/
var Lib;`,
			extend: true,
			strict: false,
			format: 'iife' // immediately-invoked function expression — suitable for <script> tags
		},
		treeshake: "recommended",
		shimMissingExports: true
	};
};

export default configs;