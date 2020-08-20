import { Action } from "redux";
import { connect as reduxConnect } from "react-redux";
import { createStructuredSelector } from "reselect";
import State from "@/store/state";

export function connect<
  S extends Record<string, (state: State, props: P) => any>,
  A extends Record<string, (...args: any[]) => Action<string>>,
  P
>(selectors?: S, actionCreators?: A) {
  return (component: React.ComponentType) => {
    return reduxConnect(
      selectors ? (createStructuredSelector(selectors) as any) : selectors,
      actionCreators
    )(component) as any;
  };
}
