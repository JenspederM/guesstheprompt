export function PlayerList({
  game,
}: {
  game: {
    id: string;
    host: string;
    playersIds: string[];
    players: { name: string; id: string }[];
  };
}) {
  const playerIcons = ["🧛‍♂️", "🤦🏽‍♀️", "🙅🏿‍♂️", "🙋🏼‍♀️", "🧔🏽‍♀️", "👳🏿‍♂️", "🕺🏻"];
  return (
    <div className="flex flex-col w-full grow items-center justify-start overflow-hidden py-4">
      <div className="flex text-3xl mb-4 w-full justify-between items-center">
        <div>🧛‍♂️</div>
        <div>🤦🏽‍♀️</div>
        <div>Players</div>
        <div>🙅🏿‍♂️</div>
        <div>🙋🏼‍♀️</div>
      </div>
      <div className="grid grid-cols-2 grow w-full place-items-center overflow-y-auto">
        {game.players.map((player, index) => (
          <div
            key={player.id}
            className="flex space-x-2 w-full items-center justify-center"
          >
            <div className="pb-1">
              {player.id === game.host ? "👑" : playerIcons[index]}
            </div>
            <div>{player.name}</div>
            <div className="pb-1">
              {player.id === game.host ? "👑" : playerIcons[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
