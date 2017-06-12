#!/usr/bin/env node

// Available commands (array for aliases)
const CMDS = [
  ["lookup", "search"],
  "add",
  "list",
  ["view", "show"],
  "watch",
  ["watch-till", "wt"],
  ["rm", "remove"],
  "update",
  "remained",
  "upcoming",
  "help"
];

ensureTvdbKey();
const [cmd, args] = readArgs();
const mod = figureModule(cmd);
require(`./cmd/${mod}`)(...args);

function ensureTvdbKey() {
  if (!process.env.THETVDB_API_KEY) {
    console.log("Please add 'THETVDB_API_KEY' env variable. You can get it here: http://thetvdb.com/?tab=apiregister");
    process.exit(1);
  }
}

function readArgs() {
  const cmd = process.argv[2] || "remained";
  const args = process.argv.slice(3);
  return [ cmd, args ];
}

function figureModule() {
  const mod = CMDS.find((cmds) => {
    return Array.isArray(cmds) && cmds.indexOf(cmd) > -1 || cmds == cmd;
  }) || "help";

  return Array.isArray(mod) ? mod[0] : mod;
}
