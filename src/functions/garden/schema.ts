export default {
  plants: {
    type: "object",
    properties: {},
  },
  createPlantRequest: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 3,
      },
    },
    required: ["name"],
  },
} as const;
