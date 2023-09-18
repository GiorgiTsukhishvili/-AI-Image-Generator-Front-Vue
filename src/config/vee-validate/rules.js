import { defineRule } from "vee-validate";

defineRule("required", (value) =>
  value && value.trim() ? true : "This field is required"
);

defineRule("requiredSelect", (value) =>
  value ? true : "This field is required"
);

defineRule("email", (value) => {
  if (!value || !value.length) {
    return true;
  }

  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  ) {
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

defineRule("confirmed", (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return "Passwords must match";
});
