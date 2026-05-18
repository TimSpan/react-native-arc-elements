import { createContext } from "react";

export const SubmitContext = createContext(() => Promise.resolve());
