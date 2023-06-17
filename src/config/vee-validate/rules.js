import { defineRule } from "vee-validate";

defineRule("required", (value) =>
  value && value.trim() ? true : "This field is required"
);

defineRule("email", (value) => {
  if (!value || !value.length) {
    return true;
  }

  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
    return "This field must be a valid email";
  }

  return true;
});

defineRule("min", (value, [limit]) => {
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return `This field must be at least ${limit} characters`;
  }
  return true;
});
