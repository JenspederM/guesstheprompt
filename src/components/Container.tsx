import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col absolute inset-0 items-center overscroll-contain max-h-screen min-h-0 overflow-hidden bg-base-200">
      <div className="flex flex-col grow w-full max-w-4xl items-center bg-base-100">
        {children}
      </div>
    </div>
  );
}
