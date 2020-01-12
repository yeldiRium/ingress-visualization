import { Value } from "validate-value";

const validate = portal => {
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
      },
      annotation: {
        type: "string"
      }
    },
    required: ["uid", "title", "lat", "lng"]
  });

  value.validate(portal, { valueName: "portal" });
};

const create = (
  uid,
  title,
  lat,
  lng,
  team = "unclaimed",
  level = 0,
  annotation = ""
) => ({
  uid,
  title,
  lat,
  lng,
  team,
  level,
  annotation
});

const parse = data => {
  validate(data);

  return create(
    data.uid,
    data.title,
    data.lat,
    data.lng,
    data.team,
    data.level,
    data.annotation
  );
};

const validateReactProp = data => {
  try {
    validate(data);

    return null;
  } catch (ex) {
    return ex;
  }
};

export { validate, parse, create, validateReactProp };

export default create;
