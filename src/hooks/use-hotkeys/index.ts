import { useEffect, useRef } from "react";

import { getHotkeyHandler, getHotkeyMatcher, HotkeyItemOptions } from "./parse-hotkey";

export type { HotkeyItemOptions };
export { getHotkeyHandler };

export type HotkeyItem = [string, (event: KeyboardEvent) => void, HotkeyItemOptions?];

function shouldFireEvent(
  event: KeyboardEvent,
  tagsToIgnore: string[],
  triggerOnContentEditable = false,
) {
  if (event.target instanceof HTMLElement) {
    if (triggerOnContentEditable) {
      return !tagsToIgnore.includes(event.target.tagName);
    }

    return !event.target.isContentEditable && !tagsToIgnore.includes(event.target.tagName);
  }

  return true;
}

export function useHotkeys(
  hotkeys: HotkeyItem[],
  options: {
    tagsToIgnore?: string[];
    triggerOnContentEditable?: boolean;
    type?: "keydown" | "keyup";
  } = {},
) {
  const { tagsToIgnore = ["INPUT", "TEXTAREA", "SELECT"], triggerOnContentEditable = false } =
    options;
  const blocked = useRef(false);

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      if (blocked.current) {
        return;
      }

      hotkeys.forEach(([hotkey, handler, options = { preventDefault: true }]) => {
        if (
          getHotkeyMatcher(hotkey)(event) &&
          shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)
        ) {
          if (options.preventDefault) {
            event.preventDefault();
          }

          if (options.delay) {
            blocked.current = true;
            setTimeout(() => {
              handler(event);
              blocked.current = false;
            }, options.delay);
          } else {
            handler(event);
          }
        }
      });
    };

    document.documentElement.addEventListener(options.type || "keydown", keydownListener);
    return () => document.documentElement.removeEventListener("keydown", keydownListener);
  }, [hotkeys, tagsToIgnore, triggerOnContentEditable, blocked, options.type]);
}
