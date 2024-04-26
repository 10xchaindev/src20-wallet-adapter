export function accountFromDerivationPath(path: string) {
  const segments = path.split("/");
  const account = parseInt(segments[3].replaceAll("'", ""), 10);
  if (isNaN(account)) throw new Error("Cannot parse account number from path");
  return account;
}

export function formatAddress(value: string) {
  return value.slice(0, 4) + "..." + value.slice(value.length - 4);
}
