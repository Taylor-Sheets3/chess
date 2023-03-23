export function tileIsOccupied(tilePosition: object, boardState: object) {
  const piece = boardState.find(p => p.position.x === tilePosition.x && p.position.y === tilePosition.y)

  return piece ? true : false;
}

export function tileIsOccupiedByOpponent(tilePosition: object, boardState: object, team: string) {
  const piece = boardState.find((p) => p.position.x === tilePosition.x && p.position.y === tilePosition.y && p.team !== team);

  return piece ? true : false;
}

export function tileIsOccupiedByAlly(tilePosition: object, boardState: object, team: string) {
  const piece = boardState.find((p) => p.position.x === tilePosition.x && p.position.y === tilePosition.y && p.team === team);

  return piece ? true : false;
}
