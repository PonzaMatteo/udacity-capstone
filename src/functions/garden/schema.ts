export default {
  plants: {
    type: "object",
    properties: {},
  },
  createPlantRequest: {
    type: "object",
    properties: {
      name: { type: "string" },
      type: { type: "string" },
    },
    required: ["name", "type"],
  },
} as const;
