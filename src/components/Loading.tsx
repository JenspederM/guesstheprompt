export function Loading({ text }: { text?: string }) {
  return (
    <div className="flex flex-col grow justify-center items-center space-y-4">
      <span className="loading loading-spinner loading-lg"></span>
      <span>{text || "Loading..."}</span>
    </div>
  );
}
