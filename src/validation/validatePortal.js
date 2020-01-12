import { Value } from "validate-value";

const validatePortal = portal => {
  const value = new Value({
    type: "object",
    properties: {
      uid: {
        type: "string"
      },
      title: {
        type: "string"
      },
      lat: {
        type: "number"
      },
      lng: {
        type: "number"
      },
      team: {
        type: "string",
        enum: ["Enlightened", "Resistance", "unclaimed"]
      },
      level: {
        type: "number"
      }
    }
  });

  value.validate(portal, { valueName: "portal" });
};

export default validatePortal;
