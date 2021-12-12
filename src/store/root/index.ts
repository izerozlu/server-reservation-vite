import { defineStore } from "pinia";
import { User } from "firebase/auth";

const useRootStore = defineStore("root", {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
  },
});

export default useRootStore;
