import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v7 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const UUID = v7;

export const UUIDToDate = (id: string) => {
  const parts = id.split("-");
  const highBitsHex = parts[0] + parts[1].slice(0, 4);
  const timestampInMilliseconds = parseInt(highBitsHex, 16);
  return new Date(timestampInMilliseconds);
};

export const chunk = <T>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

/** Wraps a function (sync or async) in a try/catch block and returns a Result object with either the data or the error. */
export const tryCatch = <T, E = Error>(
  arg: Promise<T> | (() => T)
): Result<T, E> | Promise<Result<T, E>> => {
  if (typeof arg === "function") {
    try {
      const data = (arg as () => T)();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as E };
    }
  }

  return (arg as Promise<T>)
    .then((data) => ({ data, error: null }))
    .catch((error) => ({ data: null, error: error as E }));
};
