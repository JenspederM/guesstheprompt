import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./Firebase";
import { Game } from "./types";

export const firebaseGuid = (length: number = 28) => {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let autoId = "";

  for (let i = 0; i < length; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }

  return autoId;
};

export const delay = (ms: number): Promise<number> =>
  new Promise((res) => {
    return setTimeout(res, ms);
  });

export const popRandom = (arr: any[]) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr.splice(index, 1).pop();
};

export const makeString = (arr: string[]) => {
  if (arr.length === 1) return arr[0];
  const firsts = arr.slice(0, arr.length - 1);
  const last = arr[arr.length - 1];
  return firsts.join(", ") + " and " + last;
};

export const findGameByRoomCode = async (roomCode: string, userId?: string) => {
  if (!userId) return;

  const existingGamesQuery = query(
    collection(db, "games"),
    where("roomCode", "==", roomCode),
    where("isStarted", "==", false),
    where("isFinished", "==", false),
  );

  const existingGames = await getDocs(existingGamesQuery);

  console.log("Existing games", existingGames.docs.length);
  console.log("Existing games", existingGames.docs);

  if (existingGames.docs.length > 0) {
    const existingGame = existingGames.docs.filter((game) => {
      const players = game.data().players;
      return players && game;
    });
    if (existingGame.length === 0) {
      console.log("No existing games found");
    } else if (existingGame.length > 1) {
      console.log("Found multiple existing games", existingGame);
    } else {
      console.log("Found existing game", existingGame[0].id);
      return existingGame[0];
    }
  }

  const gamesQuery = query(
    collection(db, "games"),
    where("roomCode", "==", roomCode),
    where("isStarted", "==", false),
    where("isFinished", "==", false),
  );
  const games = await getDocs(gamesQuery);

  if (games.docs.length === 0) {
    console.log("No games found");
    return;
  }

  const game = games.docs[0];
  console.log("Found game", game.id);
  return game;
};
