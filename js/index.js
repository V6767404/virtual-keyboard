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
    // span.classList.add("on");
    key.append(span);
    span.innerHTML = keys[i][j];

    span = document.createElement("span");
    span.classList.add("en");
    span.classList.add("off");
    key.append(span);
    span.innerHTML = keysEn[i][j];
  }
}
