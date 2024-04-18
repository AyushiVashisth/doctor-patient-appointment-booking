export const validationRules = {
  text: {
    required: "This field is required.",
    minLength: {
      value: 2,
      message: "Please enter at least 2 characters."
    },
    maxLength: {
      value: 255,
      message: "Please enter a shorter value."
    }
  },
  email: {
    required: "Please enter a valid email address.",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Please enter a valid email address."
    }
  },
  password: {
    required: "Password is required.",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long."
    },
    maxLength: {
      value: 32,
      message: "Password must not exceed 32 characters."
    }
  },
  date: {
    required: "Please enter a valid date."
  },
  select: {
    required: "Please select an option."
  },
  tel: {
    required: "Please enter a valid phone number.",
    pattern: {
      value: /^\d{10}$/,
      message: "Please enter a valid 10-digit phone number."
    }
  },
  about: {
    required: "Please tell us about yourself.",
    maxLength: {
      value: 500,
      message: "Please enter a shorter value."
    }
  },
  specialty: {
    required: "Please enter your specialty.",
    maxLength: {
      value: 255,
      message: "Please enter a shorter value."
    }
  },
  clinicLocation: {
    required: "Please enter your clinic location.",
    maxLength: {
      value: 255,
      message: "Please enter a shorter value."
    }
  },
  workingHours: {
    required: "Please enter your working hours.",
    maxLength: {
      value: 255,
      message: "Please enter a shorter value."
    }
  },
  dateOfBirth: {
    required: "Please enter your date of birth."
  },
  gender: {
    required: "Please select a gender.",
    validate: {
      validOption: (value) =>
        ["male", "female", "other"].includes(value.toLowerCase()) ||
        "Please select a valid gender option."
    }
  },

  bloodGroup: {
    required: "Please select a blood group.",
    validate: {
      validOption: (value) =>
        ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "other"].includes(
          value.toUpperCase()
        ) || "Please select a valid blood group option."
    }
  },
  street: {
    required: "Please enter your street.",
    maxLength: {
      value: 255,
      message: "Please enter a shorter value."
    }
  },
  city: {
    required: "Please enter your city.",
    maxLength: {
      value: 255,
      message: "Please enter a shorter value."
    }
  },
  state: {
    required: "Please enter your state.",
    maxLength: {
      value: 255,
      message: "Please enter a shorter value."
    }
  },
  postalCode: {
    required: "Please enter your postal code.",
    pattern: {
      value: /^\d{6}$/,
      message: "Please enter a valid 6-digit postal code."
    }
  }
};
