const { check } = require("express-validator");

exports.testValidation = [
  // UUID - optional for create, but must be UUID if provided
  check("uuid").optional().isUUID().withMessage("Invalid UUID format."),

  check("role_id").not().isEmpty().withMessage("Role is required."),

  // username - required, string, max length 50
  check("username")
    .not()
    .isEmpty()
    .withMessage("Username is required.")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Username must be at most 50 characters."),

  // bio - optional, string
  check("bio").optional().isString().withMessage("Bio must be a string."),

  // countryCode - required, exactly 2 chars
  check("countryCode")
    .not()
    .isEmpty()
    .withMessage("Country code is required.")
    .bail()
    .isLength({ min: 2, max: 2 })
    .withMessage("Country code must be exactly 2 characters."),

  // age - required, integer, min 0
  check("age")
    .not()
    .isEmpty()
    .withMessage("Age is required.")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Age must be a non-negative integer."),

  // accountBalance - optional, decimal
  check("accountBalance")
    .optional()
    .isDecimal()
    .withMessage("Account balance must be a decimal number."),

  // rating - optional, float between 0 and 5
  check("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a number between 0 and 5."),

  // isActive - optional, boolean
  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  // birthDate - required, date only
  check("birthDate")
    .not()
    .isEmpty()
    .withMessage("Birth date is required.")
    .bail()
    .isISO8601()
    .withMessage("Birth date must be a valid date."),

  // lastLogin - optional, date/time
  check("lastLogin")
    .optional()
    .isISO8601()
    .withMessage("Last login must be a valid date/time."),

  // userRole - required, enum check
  check("userRole")
    .not()
    .isEmpty()
    .withMessage("User role is required.")
    .bail()
    .isIn(["admin", "user", "guest"])
    .withMessage("User role must be one of: admin, user, guest."),

  // preferences - optional, JSON (stringify to check)
  check("preferences")
    .optional()
    .custom((value) => {
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        throw new Error("Preferences must be a valid JSON object.");
      }
      return true;
    }),

  // profilePicture - optional, no real validation here since it's binary

  // tags - optional, array of strings (expecting JSON array string)
  check("tags")
    .optional()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error("Tags must be an array.");
      }
      const allStrings = value.every((tag) => typeof tag === "string");
      if (!allStrings) {
        throw new Error("Each tag must be a string.");
      }
      return true;
    }),

  // location - optional, expect object with lat/lng
  // location - optional, expect object with lat/lng as numbers
  check("location")
    .optional()
    .custom((value) => {
      if (typeof value !== "object" || value === null) {
        throw new Error("Location must be an object.");
      }

      const { lat, lng } = value;

      if (typeof lat !== "number" || typeof lng !== "number") {
        throw new Error("Location must include 'lat' and 'lng' as numbers.");
      }

      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        throw new Error(
          "Latitude must be between -90 and 90; longitude between -180 and 180."
        );
      }

      return true;
    }),
];
