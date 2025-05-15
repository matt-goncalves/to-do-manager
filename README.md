# CLI To-do Manager

## Overview

This is a simple CLI to-do manager that I created to practice my TypeScript skills. It uses a prompt similar to `kpcli`, and serves as the front end to a JSON file that stores a list of to-do tasks as structured data.

The project was intentionally modular and separated between operations (those that directly affect the JSON file), and commands (functions that call the operations from the interface). I left a lot of space for further enhancement of the application, and for rapid implementations of new features.

## The skills I used in this project:

- Type definitions
- Class definition (the Task class)
- Modularization of project into smaller chunks
- Interoperability of modules
- The TypeScript language syntax and features
- The use of Node's filesystem module
- JSON parsing, stringifying, and manipulation
- Hydration and extraction of objects

## Installation

To run this application:

```bash
git clone https://github.com/matt-goncalves/to-do-manager
node to-do-manager/
```

## Usage

You will receive a prompt to interact with this application. These are the basic commands:

| Command | Parameters           | Description                    |
|---------+----------------------|--------------------------------|
| new     | title=""             | Create new entry               |
|         | description=""       |                                |
| update  | <entry_number*>      | Update information on entry    |
|         | title="new title"    |                                |
|         | description="text"   |                                |
| delete  | <entry_number*>      | Delete entry                   |
| done    | <entry_number*>      | Mark entry as concluded        |
| reopen  | <entry_number*>      | Reopen concluded entry         |
| save    |                      | Save changes to database file  |
| help    |                      | Show this help                 |
| list    |                      | List all entries               |
| purge   |                      | Purge (delete) all entries     |
| details | <entry_number>       | Show details of an entry       |
| exit    |                      | Exit program                   |
