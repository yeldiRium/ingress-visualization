import { connect } from "react-redux";
import React, { useState } from "react";

import createLink from "../../elements/link";
import { actions as ingressMapActions } from "../../store/slices/ingressMap";

const AddAndClearLinks = connect(null, {
  addLinkIfPossible: ingressMapActions.addLinkIfPossible,
  clearLinks: ingressMapActions.clearLinks
})(({ addLinkIfPossible, clearLinks }) => {
  const [startPortalUid, setStartPortalUid] = useState("");
  const [targetPortalUid, setTargetPortalUid] = useState("");
  const [error, setError] = useState(undefined);

  const handleAddLink = () => {
    setError(undefined);

    try {
      const link = createLink(startPortalUid, targetPortalUid);
      addLinkIfPossible(link);

      setStartPortalUid("");
      setTargetPortalUid("");
    } catch (ex) {
      setError(ex.message);
    }
  };

  return (
    <div className="add-and-clear-links">
      <div className="add-and-clear-links__start-portal-uid">
        <span>Start Portal Uid</span>
        <input
          type="text"
          value={startPortalUid}
          onChange={e => setStartPortalUid(e.currentTarget.value)}
        />
      </div>
      <div className="add-and-clear-links__target-portal-uid">
        <span>Target Portal Uid</span>
        <input
          type="text"
          className="add-and-clear-links__target-portal-uid"
          value={targetPortalUid}
          onChange={e => setTargetPortalUid(e.currentTarget.value)}
        />
      </div>
      <button
        className="add-and-clear-links__add-button"
        onClick={handleAddLink}
      >
        Add Link
      </button>
      <button
        className="add-and-clear-links__clear-button"
        onClick={() => clearLinks()}
      >
        Clear Links
      </button>
      {error ? <p className="add-and-clear-links__error">{error}</p> : <></>}
    </div>
  );
});

export default AddAndClearLinks;
