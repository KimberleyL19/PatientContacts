console.log("Test")

// Contact class with validation
class Contact {
  constructor(firstName, lastName, phoneNumber, email, birthDate) {
    this.firstName = Contact.validateFirstName(firstName, "First Name");
    this.lastName = Contact.validateLastName(lastName, "Last Name");
    this.phoneNumber = Contact.validatePhone(phoneNumber);
    this.email = Contact.validateEmail(email);
    this.birthDate = Contact.validateBirthDate(birthDate);
    this.height = Contact.validateHeight(height);
    this.weight = Contact.validateWeight(weight);
    this.healthNotes = healthNotes;
    this.bmi = this.calculateBMI();
  }
// Static method for first name validation
  static validateFirstName(value, fieldLabel) {
    if (typeof value !== "string") {
      throw new TypeError(`${fieldLabel} must be a string.`);
    }
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 12) {
      throw new Error(`${fieldLabel} must be between 2 and 12 characters long.`);
    }
    return trimmed;
  }
// Static method for last name validation
 static validateLastName(value, fieldLabel) {
    if (typeof value !== "string") {
      throw new TypeError(`${fieldLabel} must be a string.`);
    }
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 20) {
      throw new Error(`${fieldLabel} must be between 2 and 20 characters long.`);
    }
    // Only allow letters, single hyphen and apostrophes; must start and end with a letter
    if (!/^[A-Za-z][A-Za-z'\-]*[A-Za-z]$/.test(trimmed)) {
      throw new Error(`${fieldLabel} must start and end with a letter and contain only letters, apostrophes or a hyphen.`);
    }
    // No consecutive punctuation
    if (/[-']{2,}/.test(trimmed)) {
      throw new Error(`${fieldLabel} must not contain consecutive hyphens or apostrophes.`);
    }
    const hyphenCount = (trimmed.match(/-/g) || []).length;
    const apostropheCount = (trimmed.match(/'/g) || []).length;
    if (hyphenCount > 1) {
      throw new Error(`${fieldLabel} may contain at most one hyphen.`);
    }
    if (apostropheCount > 2) {
      throw new Error(`${fieldLabel} may contain at most two apostrophes.`);
    }
    return trimmed;
  }
// Static method for phone number validation
static validatePhone(value) {
    const phonePattern = /^07\d{9}$/;
    if (!phonePattern.test(value)) {
      throw new Error("Phone number must be 11 digits and start with 07.");
    }
    return value;
  }
// Static method for email validation
static validateEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      throw new Error("Invalid email address format.");
    }
    return value;
  }
 // Static method for birth date validation
  static validateBirthDate(value) {
      if (value === undefined || value === null || value === "") {
        throw new Error("Birth date is required.");
      }
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid birth date.");
      }
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age--;
      }
      if (age < 0 || age > 120) {
        throw new Error("Age must be between 0 and 120 years.");
      }
      return date;
    }
// Static method for height validation
  static validateHeight(value) {
    if (typeof value !== "number" || isNaN(value)) {
      throw new TypeError("Height must be a number.");
    }
    if (value < 30 || value > 200) {
      throw new Error("Height must be between 30 cm and 200 cm.");
    }
    return value;
  }
// Static method for weight validation
  static validateWeight(value) {
    if (typeof value !== "number" || isNaN(value)) {  
      throw new TypeError("Weight must be a number.");
    }
    if (value < 1 || value > 200) {
      throw new Error("Weight must be between 1 kg and 200 kg.");
    }     
}
}
// Example usage
const testContacts = [
    { firstName: "A", lastName: "Smith" },          // Invalid first name
    { firstName: "John", lastName: "D" },          // Invalid last name
    { firstName: " Jane ", lastName: "  Green  " }, // Valid names with whitespace
    { firstName: 123, lastName: "Brown" },         // Invalid first name type
    { firstName: "Emily", lastName: null },        // Invalid last name type
    { firstName: "Michael", lastName: "Johnson" },  // Valid names
    { firstName: "Li", lastName: "Wang" },            // Valid short names
    { firstName: "O'Connor", lastName: "McDonald" } // Valid names with special characters
];
// Testing contact creation and validation
// for (const [firstName, lastName] of testContacts) {
//   try {
//     const contact = new Contact(firstName, lastName);
//     console.log("Contact created:", contact);
//   } catch (err) {
//     console.error(
//       `Failed to create contact (${firstName} ${lastName}): ${err.message}`
//     );
//   }
// }
// Functions to create and validate contacts
function createContact(firstName, lastName) {
  try {
    return { ok: true, data: new Contact(firstName, lastName) };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
function isValidContact(firstName, lastName) {
  try {
    Contact.validateName(firstName, "First Name");
    Contact.validateName(lastName, "Last Name");
    return true;
  } catch {
    return false;
  }
}
// DOM Elements
const submit = document.getElementById('submit');
const addEmail = document.getElementById('email2');

if (addEmail) {
  addEmail.addEventListener('click', (e) => {
    e.preventDefault();
    const anchorLi = document.getElementById('email-li');
    const ul = anchorLi ? anchorLi.parentElement : document.querySelector('ul');
    if (!ul) return;

    const newLi = document.createElement('li');
    const newLabel = document.createElement('label');
    const newInput = document.createElement('input');

    newInput.type = 'email';
    newInput.className = 'email-class';
    newInput.placeholder = 'Enter email';
    // Allow multiple emails to be submitted as an array
    newInput.name = 'email[]';

    newLabel.textContent = 'Email: ';
    newLabel.appendChild(newInput);
    newLi.appendChild(newLabel);

    // Insert the new li right after the original email li, or append to end
    if (anchorLi && anchorLi.nextSibling) {
      ul.insertBefore(newLi, anchorLi.nextSibling);
    } else {
      ul.appendChild(newLi);
    }
  });
}

submit.addEventListener('click', (e) => {
  e.preventDefault();

//Collect Patient Details from the form
  const first = (document.getElementById('fname') || {}).value || '';
  const last = (document.getElementById('lname') || {}).value || '';
  const phone = (document.getElementById('number') || {}).value || '';
  const dob = (document.getElementById('dob') || {}).value || '';
  const healthNotes = (document.getElementById('health-notes') || {}).value || '';
  const weightVal = (document.getElementById('weight') || {}).value || '';
  const heightVal = (document.getElementById('height') || {}).value || '';

  //Collect all email inputs on the page (support multiple added emails)
  const emailEls = Array.from(document.querySelectorAll('input[type="email"]'));
  const emails = emailEls.map(el => (el.value || '').trim()).filter(v => v !== '');

  //Validate and prepare a patient object; use Contact static validators where available
  try {
    const validFirst = Contact.validateFirstName ? Contact.validateFirstName(first, 'First Name') : first.trim();
    const validLast = Contact.validateLastName ? Contact.validateLastName(last, 'Last Name') : last.trim();

  //Phone validation (will throw if invalid)
    if (Contact.validatePhone) Contact.validatePhone(phone);

  //Validate each Email (will throw on first invalid)
    if (Contact.validateEmail) {
      for (const em of emails) Contact.validateEmail(em);
    }
  //DOB validation
    const validDob = Contact.validateBirthDate ? Contact.validateBirthDate(dob) : new Date(dob);

  //Height and weight validation
    const parsedWeight = Number(weightVal);
    const parsedHeight = Number(heightVal);
    if (!isFinite(parsedWeight) || parsedWeight <= 0) throw new Error('Weight must be a positive number');
    if (!isFinite(parsedHeight) || parsedHeight <= 0) throw new Error('Height must be a positive number');
    if (Contact.validateHeight) Contact.validateHeight(parsedHeight);
    if (parsedWeight < 1 || parsedWeight > 200) throw new Error('Weight must be between 1 and 200 kg');

    // Calculate BMI and category (re-using functions already on the page)
    let bmiValue = null;
    let bmiCategory = '';
    try {
      bmiValue = calculateBMI(parsedWeight, parsedHeight);
      bmiCategory = typeof getBMICategory === 'function' ? getBMICategory(bmiValue) : '';
    } catch (innerErr) {
      // ignore bmi calculation error here; we'll still log other details
      bmiValue = null;
      bmiCategory = '';
    }

    const patient = {
      firstName: validFirst,
      lastName: validLast,
      phone,
      emails,
      birthDate: validDob instanceof Date && !isNaN(validDob.getTime()) ? validDob.toISOString().split('T')[0] : dob,
      heightCm: parsedHeight,
      weightKg: parsedWeight,
      bmi: bmiValue,
      bmiCategory,
      healthNotes
    };

    console.log('Submitted patient details:', patient);
    // Indicate success in console
    console.info('Contact submission successful.');
  } catch (err) {
    console.error('Contact submission failed:', err && err.message ? err.message : err);
  }
});

// BMI calculation helper (weight in kg, height in cm)
function calculateBMI(weightKg, heightCm) {
  const w = Number(weightKg);
  const h = Number(heightCm);
  if (!isFinite(w) || w <= 0) {
    throw new Error('Weight must be a positive number');
  }
  if (!isFinite(h) || h <= 0) {
    throw new Error('Height must be a positive number');
  }
  const heightM = h / 100;
  const bmi = w / (heightM * heightM);
  return Number(bmi.toFixed(1));
}

// Return BMI category string using specified ranges
function getBMICategory(bmi) {
  if (!isFinite(bmi)) return 'Unknown';
  if (bmi < 18.5) return 'Underweight (<18.5)';
  if (bmi >= 18.5 && bmi <= 24.9) return 'Normal (18.5-24.9)';
  if (bmi >= 25.0 && bmi <= 29.9) return 'Overweight (25.0-29.9)';
  return 'Obese (>=30)';
}

// Calculate BMI button
const calcBtn = document.getElementById('calc-bmi');
const bmiDisplay = document.getElementById('bmi-display');
const bmiCategoryEl = document.getElementById('bmi-category');
if (calcBtn && bmiDisplay) {
  calcBtn.addEventListener('click', () => {
    const weightEl = document.getElementById('weight');
    const heightEl = document.getElementById('height');
    const weight = weightEl ? parseFloat(weightEl.value) : NaN;
    const height = heightEl ? parseFloat(heightEl.value) : NaN;
    try {
      const bmi = calculateBMI(weight, height);
      bmiDisplay.value = bmi;
      if (bmiCategoryEl) bmiCategoryEl.value = getBMICategory(bmi);
    } catch (err) {
      bmiDisplay.value = 'Error: ' + err.message;
      if (bmiCategoryEl) bmiCategoryEl.value = '';
    }
  });
}

