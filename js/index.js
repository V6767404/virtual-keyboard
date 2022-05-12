let codes = [
  ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
  ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "IntlBackslash", "Delete"],
  ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
  ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
  ["ControlLeft", "Lang", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"],
];

let keys = [
  ["Ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\", "Del"],
  ["CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter"],
  ["Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", "▲", "Shift"],
  ["Ctrl", "en", "Alt", " ", "Alt", "◄", "▼", "►", "Ctrl"],
];

let keysEn = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "Del"],
  ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "▲", "Shift"],
  ["Ctrl", "ru", "Alt", " ", "Alt", "◄", "▼", "►", "Ctrl"],
];

const fnKeys = ["AltLeft", "AltRight", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Backspace", "CapsLock", "ControlLeft", "ControlRight", "Delete", "Enter", "ShiftLeft", "ShiftRight", "Tab", "Lang", "Space"];

let textarea = document.createElement("textarea");
textarea.className = "textarea";
document.body.append(textarea);
textarea.focus();

let keyboard = document.createElement("div");
keyboard.className = "keyboard";
document.body.append(keyboard);

const description = document.createElement("p");
description.classList.add("description");
description.innerText = "Switch language: Left (Ctrl + Alt)";
document.body.appendChild(description);

// create html keyboard
for (let i = 0; i < codes.length; i++) {
  let row = document.createElement("div");
  row.classList.add("row");
  keyboard.append(row);

  for (let j = 0; j < keys[i].length; j++) {
    let key = document.createElement("div");
    key.classList.add("key");
    key.classList.add(codes[i][j]);
    row.append(key);

    let span = document.createElement("span");
    span.classList.add("ru");
    span.classList.add("on");
    key.append(span);
    span.innerHTML = keys[i][j];

    span = document.createElement("span");
    span.classList.add("en");
    span.classList.add("off");
    key.append(span);
    span.innerHTML = keysEn[i][j];
  }
}

// listen to keydown
document.addEventListener("keydown", function (event) {
  event.preventDefault();

  let pressedKey = document.querySelector("." + event.code);

  if (pressedKey.classList.contains("CapsLock")) {
    pressedKey.classList.toggle("pressed");
  } else {
    pressedKey.classList.add("pressed");
  }

  let pressedAll = document.querySelectorAll(".pressed");

  if (pressedAll.length > 1) {
    for (let i = 0; i < pressedAll.length; i++) {
      if (pressedAll[i].classList.contains("CapsLock") || pressedAll[i].classList.contains("ShiftLeft") || pressedAll[i].classList.contains("ShiftRight")) {
        if (
          !(
            pressedKey.classList.contains("ControlLeft") ||
            pressedKey.classList.contains("AltLeft") ||
            pressedKey.classList.contains("Lang") ||
            pressedKey.classList.contains("ShiftLeft") ||
            pressedKey.classList.contains("CapsLock") ||
            pressedKey.classList.contains("Tab") ||
            pressedKey.classList.contains("Backspace") ||
            pressedKey.classList.contains("Delete") ||
            pressedKey.classList.contains("Enter") ||
            pressedKey.classList.contains("ControlRight") ||
            pressedKey.classList.contains("AltRight") ||
            pressedKey.classList.contains("ShiftRight")
          )
        ) {
          textarea.value += pressedKey.querySelector(".on").innerHTML;
          return;
        }
      }
    }
  } else if (
    !(
      pressedKey.classList.contains("ControlLeft") ||
      pressedKey.classList.contains("AltLeft") ||
      pressedKey.classList.contains("Lang") ||
      pressedKey.classList.contains("ShiftLeft") ||
      pressedKey.classList.contains("CapsLock") ||
      pressedKey.classList.contains("Tab") ||
      pressedKey.classList.contains("Backspace") ||
      pressedKey.classList.contains("Delete") ||
      pressedKey.classList.contains("Enter") ||
      pressedKey.classList.contains("ControlRight") ||
      pressedKey.classList.contains("AltRight") ||
      pressedKey.classList.contains("ShiftRight")
    )
  ) {
    textarea.value += pressedKey.querySelector(".on").innerHTML.toLowerCase();
  }

  // Backspace
  if (pressedKey.classList.contains("Backspace")) {
    let data = textarea.value;
    textarea.value = "";
    for (let i = 0; i < data.length - 1; i++) {
      textarea.value += data[i];
    }
  }

  // language change
  let changelang = 0;
  for (let i = 0; i < pressedAll.length; i++) {
    if (pressedAll[i].classList.contains("ShiftLeft")) {
      changelang++;
    }

    if (pressedAll[i].classList.contains("ControlLeft")) {
      changelang++;
    }

    if (changelang === 2) {
      let on = document.querySelectorAll(".on");
      let off = document.querySelectorAll(".off");

      on.forEach((element) => {
        element.classList.remove("on");
        element.classList.add("off");
      });

      off.forEach((element) => {
        element.classList.remove("off");
        element.classList.add("on");
      });
    }
  }
});

// listen to keyup
document.addEventListener("keyup", function (event) {
  let unpressedKey = document.querySelector("." + event.code);
  if (!unpressedKey.classList.contains("CapsLock")) {
    unpressedKey.classList.remove("pressed");
  }
});

// listen to mousedown
document.addEventListener("mousedown", function (event) {
  let addclass = event.target.classList;

  if (addclass.contains("textarea")) {
    return;
  }

  if (addclass.contains("CapsLock")) {
    addclass.toggle("pressedmouse");
  }

  if (addclass.contains("key")) {
    addclass.add("pressedmouse");

    if (!(addclass.contains("ControlLeft") || addclass.contains("AltLeft") || addclass.contains("OSLeft") || addclass.contains("ShiftLeft") || addclass.contains("CapsLock") || addclass.contains("Tab") || addclass.contains("Backspace") || addclass.contains("Delete") || addclass.contains("Enter") || addclass.contains("ControlRight") || addclass.contains("AltRight") || addclass.contains("ShiftRight"))) {
      textarea.value += event.target.firstChild.innerHTML.toLowerCase();
    }
  } else {
    if (addclass.contains("on")) {
      if (event.target.closest("div").classList.contains("CapsLock")) {
        event.target.closest("div").classList.toggle("pressedmouse");
      } else {
        event.target.closest("div").classList.add("pressedmouse");

        if (
          !(
            event.target.closest("div").classList.contains("ControlLeft") ||
            event.target.closest("div").classList.contains("AltLeft") ||
            event.target.closest("div").classList.contains("Lang") ||
            event.target.closest("div").classList.contains("ShiftLeft") ||
            event.target.closest("div").classList.contains("CapsLock") ||
            event.target.closest("div").classList.contains("Tab") ||
            event.target.closest("div").classList.contains("Backspace") ||
            event.target.closest("div").classList.contains("Delete") ||
            event.target.closest("div").classList.contains("Enter") ||
            event.target.closest("div").classList.contains("ControlRight") ||
            event.target.closest("div").classList.contains("AltRight") ||
            event.target.closest("div").classList.contains("ShiftRight")
          )
        ) {
          textarea.value += event.target.innerHTML.toLowerCase();
        }
      }
    }
  }
});

// listen to mouseup
document.addEventListener("mouseup", function (event) {
  if (!event.target.classList.contains("CapsLock")) {
    if (event.target.classList.contains("on")) {
      event.target.closest("div").classList.remove("pressedmouse");
    } else {
      event.target.classList.remove("pressedmouse");
    }
  }
});
