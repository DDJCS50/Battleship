export function shipFactory(length, hits, sunk) {
  if (length === undefined) length = 0;
  if (hits === undefined) hits = 0;
  if (sunk === undefined) sunk = false;

  return {
    length,
    hits,
    sunk,
  };
}
