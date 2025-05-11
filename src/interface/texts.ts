export const TXT_OPENING = `
-------------------------
TO DO LIST       ver. 1.0
-------------------------

Welcome to the task list manager.
Loading database...
`;

export const TXT_DATABASE_LOADED = `
Database loaded.
Ready for input.
`;

export const TXT_HELP = `
Create and manage task lists from a command line.

> Parameters with (*) are required

+---------+----------------------+--------------------------------+
| Command | Parameters           | Description                    |
|---------+----------------------|--------------------------------|
| new     | title=""             | Create new entry               |
|         | description=""       |                                |
|---------+----------------------|--------------------------------|
| update  | <entry_number*>      | Update information on entry    |
|         | title="new title"    |                                |
|         | description="text"   |                                |
|---------+----------------------|--------------------------------|
| delete  | <entry_number*>      | Delete entry                   |
|---------+----------------------|--------------------------------|
| done    | <entry_number*>      | Mark entry as concluded        |
|---------+----------------------|--------------------------------|
| reopen  | <entry_number*>      | Reopen concluded entry         |
|---------+----------------------|--------------------------------|
| save    |                      | Save changes to database file  |
|---------+----------------------|--------------------------------|
| help    |                      | Show this help                 |
|---------+----------------------|--------------------------------|
| list    |                      | List all entries               |
|---------+----------------------|--------------------------------|
| purge   |                      | Purge (delete) all entries     |
|---------+----------------------|--------------------------------|
| details | <entry_number>       | Show details of an entry       |
|---------+----------------------|--------------------------------|
| exit    |                      | Exit program                   |
+---------+----------------------+--------------------------------+
`
