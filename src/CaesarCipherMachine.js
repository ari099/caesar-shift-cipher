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

 export default CaesarCipherMachine;