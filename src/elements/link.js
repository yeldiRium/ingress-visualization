import { Value } from "validate-value";

const value = new Value({
  type: "object",
  properties: {
    startPortalUid: {
      type: "string"
    },
    targetPortalUid: {
      type: "string"
    },
    annotation: {
      type: "string"
    }
  },
  required: ["startPortalUid", "targetPortalUid"]
});

const validate = link => {
  value.validate(link, { valueName: "link" });
};

const create = (startPortalUid, targetPortalUid, annotation = "") => ({
  startPortalUid,
  targetPortalUid,
  annotation
});

const parse = data => {
  validate(data);

  return create(data.startPortalUid, data.targetPortalUid, data.annotation);
};

const validateReactProp = (props, propName, componentName) => {
  const data = props[propName];

  try {
    value.validate(data, { valueName: `${componentName}.${propName}` });

    return null;
  } catch (ex) {
    return ex;
  }
};

export { validate, parse, create, validateReactProp };

export default create;
