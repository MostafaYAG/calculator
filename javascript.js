/*mostafa calculator*/
var number = "0";
var is_decimal = false;
var result_text = document.getElementById("res-text");
var equation = 0;
var last_event = "";

function update_text(text) {
  result_text.innerText = text;
}

function add_digit(digit) {
  if (number !== "0" && number !== "cannot divide by zero") {
    number += digit;
  } else {
    if (digit !== ".") number = digit;
    else number = "0.";
  }
  update_text(number);
}

function decimal() {
  if (!is_decimal) {
    is_decimal = true;
    add_digit(".");
  }
}

function change_sign() {
  number = (-parseFloat(number)).toString(); // Fixed the change_sign() function as mentioned earlier.
  update_text(number);
}

function remove_digit() {
  var last_letter = number.charAt(number.length - 1); // Use charAt() to get the last character.

  if (number.length > 0) {
    number = number.substring(0, number.length - 1);

    if (number.length <= 0) number = "0";
    if (last_letter === ".") is_decimal = false;
  }

  update_text(number);
}

function reset_after_event(e) {
  number = "0";
  last_event = e; // Use the event function itself, not a string.
  is_decimal = false;

  update_text(number);
}

function sum() {
  equation += parseFloat(number);
  number = "0"; // Reset the number for the next input
  last_event = sum; // Set the current operation as the last event
  is_decimal = false;
  update_text(number);
}

function sub() {
  if (last_event === "") equation = parseFloat(number);
  else equation -= parseFloat(number);

  reset_after_event(sub);
}

function times() {
  if (last_event === "") equation = parseFloat(number);
  else equation *= parseFloat(number);

  reset_after_event(times);
}

function divide() {
  if (last_event === "") equation = parseFloat(number);
  else {
    if (number !== "0") {
      equation /= parseFloat(number);
    } else {
      clear_all();
      equation = "cannot divide by zero";
      update_text(equation);
    }
  }

  reset_after_event(divide);
}

function equation_answer() {
  if (last_event === sum) equation += parseFloat(number);
  if (last_event === sub) equation -= parseFloat(number);
  if (last_event === times) equation *= parseFloat(number);
  if (last_event === divide) equation /= parseFloat(number);

  number = equation.toString();
  equation = 0;
  last_event = ""; // Reset the last event
  is_decimal = false;

  update_text(number);
}

function clear_all() {
  number = "0";
  equation = 0;
  last_event = "";
  is_decimal = false;
  update_text(number);
}
