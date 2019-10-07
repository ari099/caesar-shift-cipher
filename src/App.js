import React from 'react';
import logo from './logo.svg';
import './App.css';

/**
 * Caesar cipher machine object
 */
class CaesarCipherMachine {
  constructor(key) {
    this.key = key;
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  }

  /**
   * Reverse an array
   * @param elements
   */
  reverse_array(elements) {
    let new_elements = [];
    for (let i = elements.length - 1; i >= 0; i--) {
      new_elements.push(elements[i]);
    }

    return new_elements;
  }

  /**
   * Rotate a JavaScript array to the right
   * by "shift_amount"
   * @param elements
   * @param shift_amount
   * @returns shifted_elements
   */
  rotate_right(elements, shift_amount) {
    for (let i = 0; i < shift_amount; i++) elements.unshift(elements.pop());
    return elements;
  }

  /**
   * Rotate a JavaScript array to the left
   * by "shift_amount"
   * @param elements
   * @param shift_amount
   * @returns shifted_elements
   */
  rotate_left(elements, shift_amount) {
    elements = this.reverse_array(elements);
    elements = this.rotate_right(elements, shift_amount);
    elements = this.reverse_array(elements);
    return elements;
  }

  /**
   * Determine if character is in capital letters
   * @param character
   */
  isUpperCase(character) {
    if (character === character.toUpperCase()) return true;
    else return false;
  }

  /**
   * Determine if character is in lowercase letters
   * @param character
   */
  isLowerCase(character) {
    if (character === character.toLowerCase()) return true;
    else return false;
  }

  /**
   * Encrypt plaintext with Caesar cipher
   * @param plaintext
   * @returns ciphertext
   */
  encrypt(plaintext) {
    let ciphertext = ""; // Ciphertext container....
    for (let i = 0; i < plaintext.length; i++) {
      // Does the alphabet have the current character....
      if (this.alphabet.includes(plaintext[i].toLowerCase())) {
        // Find out if the plaintext character is in capital letters
        let isCapital = this.isUpperCase(plaintext[i]);

        // Find the index of the plaintext character....
        let char_index = this.alphabet.indexOf(plaintext[i].toLowerCase());

        // Shift alphabet to the left by "key"
        this.alphabet = this.rotate_left(this.alphabet, this.key);

        // Use the index found to add the new ciphered letter to
        // the ciphertext container
        ciphertext += isCapital
          ? this.alphabet[char_index].toUpperCase()
          : this.alphabet[char_index];

        // Shift alphabet back to the right by "key"
        this.alphabet = this.rotate_right(this.alphabet, this.key);
      } else ciphertext += plaintext[i]; // Just add the non-alphabetic character to the ciphertext container
    }

    // Return the ciphertext
    return ciphertext;
  }
}

// Center of the dial
const center = {
  x: 150,
  y: 100
}; // Center point....

// Dial Button Coordinates
const dialButtonCoord = {
  x: 150,
  y: 155
};

// Radius
const radius = Math.abs(center.y - dialButtonCoord.y);

/**
 * Get coordinates from angle degree value
 * @param degrees
 * @returns coordinates
 */
const coordinate = degrees => {
  return {
    x: radius * Math.sin(degrees * Math.PI / 180) + center.x,
    y: radius * Math.cos(degrees * Math.PI / 180) + center.y
  };
};

/**
 * Getting the angle degrees based on a value in a range with a specified limit
 * Meant for dial movements
 * @param value
 * @param limit
 * @returns angle_degrees
 */
const degrees = (value, limit) => {
  const quotient = 360 / limit;
  return Math.round(quotient * value);
};

/**
 * Encrypt with the Caesar cipher
 * @param plaintext
 * @param n
 * @param ciphertext
 */
const caesar_encrypt = (plaintext, n) => {
  let ccm = new CaesarCipherMachine(n);
  return ccm.encrypt(plaintext);
};

/**
 * Cipher Dial Canvas
 */
const CipherDial = props => {
  let mouseDown = false;

  /**
   * Move Dial event handler
   * @param e
   */
  const moveDial = e => {
    if (mouseDown) {
      // Must complete this block....
    } else {
      // Must complete this block....
    }
  };

  /**
   * Press Dial event handler
   */
  const pressDial = () => {
    mouseDown = true;
    const dial_button = document.getElementsByClassName("dial_button")[0];
    dial_button.addEventListener("mousemove", moveDial);
  };

  /**
   * Release Dial event handler
   */
  const releaseDial = () => {
    mouseDown = false;
    const dial_button = document.getElementsByClassName("dial_button")[0];
    dial_button.removeEventListener("mousemove", moveDial);
  };

  return (
    <svg class="cipher_dial">
      <circle
        cx="150"
        cy="100"
        r="90"
        stroke="#333"
        stroke-width="1"
        fill="#111"
      />
      <circle
        class="dial_button"
        cx="150"
        cy="155"
        r="20"
        stroke="#333"
        stroke-width="1"
        fill="#111"
        onMouseDown={pressDial}
        onMouseUp={releaseDial}
      />
    </svg>
  );
};

/**
 * Caesar Shift Amount Label
 */
const ShiftAmount = props => {
  return <h2 class="caesar_shift_amount">{props.shiftAmount}</h2>;
};

/**
 * Event handler for keeping track of what is being typed in the plaintext box
 * Encrypt as text is being typed
 */
const typing = () => {
  let caesar_shift_amount = document.getElementsByClassName(
    "caesar_shift_amount"
  )[0];
  let plaintext = document.getElementsByClassName("plaintext")[0];
  let ciphertext = document.getElementsByClassName("ciphertext")[0];

  if (plaintext.value == "")
    ciphertext.innerHTML = "Ciphertext should appear here....";
  else
    ciphertext.innerHTML = caesar_encrypt(
      plaintext.value,
      Number.parseInt(caesar_shift_amount.innerHTML)
    );
};

/**
 * Plaintext TextBox
 */
const PlaintextBox = props => {
  return (
    <input
      class="plaintext"
      type="text"
      placeholder="Enter text here, then turn the dial...."
      onKeyPress={typing}
    />
  );
};

/**
 * Ciphertext Output Label
 */
const CiphertextOutput = props => {
  return <p class="ciphertext">Ciphertext should appear here....</p>;
};

/**
 * Shifting text to the right
 */
const incrementDegrees = e => {
  e.preventDefault();
  let caesar_shift_amount = document.getElementsByClassName("caesar_shift_amount")[0];
  let ciphertext = document.getElementsByClassName("ciphertext")[0];
  let plaintext = document.getElementsByClassName("plaintext")[0];
  let shiftAmount = document.getElementsByClassName("caesar_shift_amount")[0];
  shiftAmount.innerHTML =
    Number.parseInt(shiftAmount.innerHTML) < 26
      ? Number.parseInt(shiftAmount.innerHTML) + 1
      : Number.parseInt(shiftAmount.innerHTML);
  let dial_button = document.getElementsByClassName("dial_button")[0];
  dial_button.cx.baseVal.value = coordinate(
    degrees(Number.parseInt(shiftAmount.innerHTML), 26)
  ).x;
  dial_button.cy.baseVal.value = coordinate(
    degrees(Number.parseInt(shiftAmount.innerHTML), 26)
  ).y;

  if (plaintext.value == "")
    ciphertext.innerHTML = "Ciphertext should appear here....";
  else
    ciphertext.innerHTML = caesar_encrypt(
      plaintext.value,
      Number.parseInt(caesar_shift_amount.innerHTML)
    );
};

/**
 * Shifting text to the left
 */
const decrementDegrees = e => {
  e.preventDefault();
  let caesar_shift_amount = document.getElementsByClassName(
    "caesar_shift_amount"
  )[0];
  let ciphertext = document.getElementsByClassName("ciphertext")[0];
  let plaintext = document.getElementsByClassName("plaintext")[0];
  let shiftAmount = document.getElementsByClassName("caesar_shift_amount")[0];
  shiftAmount.innerHTML =
    Number.parseInt(shiftAmount.innerHTML) > 0
      ? Number.parseInt(shiftAmount.innerHTML) - 1
      : Number.parseInt(shiftAmount.innerHTML);
  let dial_button = document.getElementsByClassName("dial_button")[0];
  dial_button.cx.baseVal.value = coordinate(
    degrees(Number.parseInt(shiftAmount.innerHTML), 26)
  ).x;
  dial_button.cy.baseVal.value = coordinate(
    degrees(Number.parseInt(shiftAmount.innerHTML), 26)
  ).y;

  if (plaintext.value == "")
    ciphertext.innerHTML = "Ciphertext should appear here....";
  else
    ciphertext.innerHTML = caesar_encrypt(
      plaintext.value,
      Number.parseInt(caesar_shift_amount.innerHTML)
    );
};

/**
 * Decrement button
 */
const DecrementButton = props => {
  return (
    <button id="decrement" onClick={decrementDegrees}>
      -
    </button>
  );
};

/**
 * Increment button
 */
const IncrementButton = props => {
  return (
    <button id="increment" onClick={incrementDegrees}>
      +
    </button>
  );
};

/**
 * Caesar Cipher Form
 */
const CaesarCipherForm = props => {
  return (
    <form class="caesar_cipher_form">
      <h1>CAESAR SHIFT CIPHER</h1>
      <CipherDial />
      <br />
      <div class="controls">
        <DecrementButton />
        <IncrementButton />
        <ShiftAmount shiftAmount={0} />
      </div>
      <PlaintextBox />
      <CiphertextOutput />
    </form>
  );
};

function App() {
  return (
    <div class="caesar_cipher_container">
      <CaesarCipherForm />
    </div>
  );
}

export default App;