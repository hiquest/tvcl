#!/usr/bin/env node --harmony

// Check that the API key is set up
const KEY = process.env.THETVDB_API_KEY;
if (!KEY) {
  console.log("You should set up 'THETVDB_API_KEY' env variable. Go here to get it: http://thetvdb.com/?tab=apiregister");
  process.exit(1);
}

// Take arguments
const cmd = process.argv[2] || "remained";
const args = process.argv.slice(3);

// Available commands (array means aliases)
const commands = [
  ["lookup", "search"],
  "add",
  "list",
  ["view", "show"],
  "watch",
  ["watch-till", "wt"],
  ["rm", "remove"],
  "update",
  "remained",
  "help"
];

// Do we have this command?
let mod = commands.find((cmds) => {
  return Array.isArray(cmds) && cmds.indexOf(cmd) > -1 || cmds == cmd;
}) || "help";

// Let's figure out module
mod = Array.isArray(mod) ? mod[0] : mod;

// Require it and call the command
require(`./cmd/${mod}`)(...args);
