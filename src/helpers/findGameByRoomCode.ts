import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";

export default async (roomCode: string, userId?: string) => {
  if (!userId) return;

  const existingGamesQuery = query(
    collection(db, "games"),
    where("roomCode", "==", roomCode),
    where("isStarted", "==", false),
    where("isFinished", "==", false),
    where(`players.${userId}.id`, "==", userId),
  );

  const existingGames = await getDocs(existingGamesQuery);

  if (existingGames.docs.length > 0) {
    const existingGame = existingGames.docs.filter((game) => {
      const players = game.data().players;
      return players && players[userId];
    });
    if (existingGame.length === 0) {
      console.log("No existing games found");
    } else if (existingGame.length > 1) {
      console.log("Found multiple existing games", existingGame);
    } else {
      console.log("Found existing game", existingGame[0].id);
      return existingGame[0].id;
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
  return game.id;
};
