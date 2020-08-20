import State from "@/store/state";

export function canonicalSelector({ canonical }: State) {
  return canonical;
}

export default canonicalSelector;

export * from "./auth";
