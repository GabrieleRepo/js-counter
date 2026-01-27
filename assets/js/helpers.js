export function askNumber(
  msg = "Enter a positive number for the counter step:",
) {
  //  Prompts the user to enter a positive number for the counter step (delta)
  let delta;

  do {
    const input = prompt(msg);
    if (input === null) return null;
    delta = parseInt(input);
  } while (isNaN(delta) || delta < 0);

  return delta;
}
