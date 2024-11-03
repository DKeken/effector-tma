import { createEffect } from "effector";
import { $telegramWebApp } from "../telegram-instance";

const setItemFx = createEffect<
  { key: string; value: string },
  boolean,
  Error
>();
const getItemFx = createEffect<string, string | null, Error>();
const getItemsFx = createEffect<string[], (string | null)[], Error>();
const removeItemFx = createEffect<string, boolean, Error>();
const removeItemsFx = createEffect<string[], boolean, Error>();
const getKeysFx = createEffect<void, string[], Error>();

setItemFx.use(async ({ key, value }) => {
  const telegram = $telegramWebApp.getState();
  if (!telegram?.WebApp.CloudStorage) {
    throw new Error("Cloud Storage is not available");
  }

  return new Promise<boolean>((resolve, reject) => {
    telegram.WebApp.CloudStorage.setItem(key, value, (error, success) => {
      if (error) reject(error);
      else resolve(success);
    });
  });
});

getItemFx.use(async (key) => {
  const telegram = $telegramWebApp.getState();
  if (!telegram?.WebApp.CloudStorage) {
    throw new Error("Cloud Storage is not available");
  }

  return new Promise<string | null>((resolve, reject) => {
    telegram.WebApp.CloudStorage.getItem(key, (error, value) => {
      if (error) reject(error);
      else resolve(value);
    });
  });
});

getItemsFx.use(async (keys) => {
  const telegram = $telegramWebApp.getState();
  if (!telegram?.WebApp.CloudStorage) {
    throw new Error("Cloud Storage is not available");
  }

  return new Promise<(string | null)[]>((resolve, reject) => {
    telegram.WebApp.CloudStorage.getItems(keys, (error, values) => {
      if (error) reject(error);
      else resolve(values);
    });
  });
});

removeItemFx.use(async (key) => {
  const telegram = $telegramWebApp.getState();
  if (!telegram?.WebApp.CloudStorage) {
    throw new Error("Cloud Storage is not available");
  }

  return new Promise<boolean>((resolve, reject) => {
    telegram.WebApp.CloudStorage.removeItem(key, (error, success) => {
      if (error) reject(error);
      else resolve(success);
    });
  });
});

removeItemsFx.use(async (keys) => {
  const telegram = $telegramWebApp.getState();
  if (!telegram?.WebApp.CloudStorage) {
    throw new Error("Cloud Storage is not available");
  }

  return new Promise<boolean>((resolve, reject) => {
    telegram.WebApp.CloudStorage.removeItems(keys, (error, success) => {
      if (error) reject(error);
      else resolve(success);
    });
  });
});

getKeysFx.use(async () => {
  const telegram = $telegramWebApp.getState();
  if (!telegram?.WebApp.CloudStorage) {
    throw new Error("Cloud Storage is not available");
  }

  return new Promise<string[]>((resolve, reject) => {
    telegram.WebApp.CloudStorage.getKeys((error, keys) => {
      if (error) reject(error);
      else resolve(keys);
    });
  });
});

export const cloudStorage = {
  setItem: setItemFx,
  getItem: getItemFx,
  getItems: getItemsFx,
  removeItem: removeItemFx,
  removeItems: removeItemsFx,
  getKeys: getKeysFx,
};
