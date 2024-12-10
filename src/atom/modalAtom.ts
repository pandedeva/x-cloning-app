import { atom } from "recoil";

// ! CANNOT USE BETTER WE USE ZUSTAND LATER, AFTER AKU BELAJAR YA <3
export const modalAtom = atom({
  key: "modalState",
  default: false,
});

export const postIdAtom = atom({
  key: "postIdState",
  default: "",
});
