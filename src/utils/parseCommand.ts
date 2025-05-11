export function parseCommand(input: string): string[] {

  const regex = /[^\s"]+="[^"]*"|[^\s"]+/g
  const result : Array<string> = [];

  let match;

  while ( ( match = regex.exec( input ) ) !== null ) {

    if ( match[1] !== undefined ) {

      result.push( match[1] );

    } else {

      result.push(match[0]);

    }
  }

  return result;
}

