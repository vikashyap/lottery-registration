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

type Member = {
  id: number;
  email: string;
  status?: string;
  geburtstag?: string;
  nachname?: string;
  vorname?: string;
  // Add/remove fields based on your schema!
};

type MembersState = {
  members: Member[];
  activeMember: Member | null;
  setMembers: (members: Member[]) => void;
  setActiveMember: (member: Member | null) => void;
  reset: () => void;
};

const initialStateMembersState: MembersState = {
  members: [],
  activeMember: null,
  setMembers: () => {},
  setActiveMember: () => {},
  reset: () => {},
};

export const useMembersStore = create<MembersState>((set) => ({
  ...initialStateMembersState,
  members: [],
  activeMember: null,
  setMembers: (members) => set({ members }),
  setActiveMember: (member) => set({ activeMember: member }),
  reset: () =>
    set({
      members: [],
      activeMember: null,
    }),
}));
