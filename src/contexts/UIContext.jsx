import { createContext, useLayoutEffect, useState } from "react";

export const UIContext = createContext();

export default function UIContextProvider(props) {
  const [breakpoint, setBreakpoint] = useState({});

  const refresh = () => {
    setBreakpoint(
      window.innerWidth > 1080
      ? 'desktop'
      : window.innerWidth > 720
        ? 'tablet'
        : 'mobile'
    );
  }

  useLayoutEffect(() => {
    refresh();
    window.addEventListener('resize', () => {
      refresh();
    });
  }, []);

  return (
    <UIContext.Provider value={{breakpoint}}>
      { props.children }
    </UIContext.Provider>
  );
}