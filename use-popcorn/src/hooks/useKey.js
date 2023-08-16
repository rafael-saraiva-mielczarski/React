import { useEffect } from "react";

export function useKey(key, action) {
  //keypress event, o useEffect é um "escape" para lidar com eventos DOM  de teclado, por isso tem que ser usado para lidar com eventos de teclado
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
}
