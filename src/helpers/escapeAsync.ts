import { type FormEvent } from "react";

export const escapeAsync = (
  e: FormEvent,
  func: (e: FormEvent) => Promise<void>
): void => {
  func(e)
    .then()
    .catch((e) => {});
};
