import { create } from "zustand";

type PrizeState = {
  isRegistered: boolean;
  wonPrize: string | null;
  userEmail: string;
  userName: string;

  setIsRegistered: (v: boolean) => void;
  setWonPrize: (prize: string | null) => void;
  setUserEmail: (email: string) => void;
  setUserName: (email: string) => void;
  reset: () => void;
};

const initialState = {
  isRegistered: false,
  wonPrize: null as string | null,
  userEmail: "",
  userName: "",
};

export const usePrizeStore = create<PrizeState>((set) => ({
  ...initialState,
  setIsRegistered: (v) => set({ isRegistered: v }),
  setWonPrize: (prize) => set({ wonPrize: prize }),
  setUserEmail: (email) => set({ userEmail: email }),
  setUserName: (name) => set({ userName: name }),
  reset: () => set(initialState),
}));
