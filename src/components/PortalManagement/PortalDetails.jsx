import React from "react";

import { validateReactProp as validatePortal } from "../../elements/portal";

const PortalDetails = ({ portal }) => (
  <table>
    <tbody>
      <tr>
        <th>Uid</th>
        <td>{portal.uid}</td>
      </tr>
      <tr>
        <th>Title</th>
        <td>{portal.title}</td>
      </tr>
      <tr>
        <th>Team</th>
        <td>{portal.team}</td>
      </tr>
      <tr>
        <th>Level</th>
        <td>{portal.level}</td>
      </tr>
      <tr>
        <th>Longitude</th>
        <td>{portal.lng}</td>
      </tr>
      <tr>
        <th>Latitude</th>
        <td>{portal.lat}</td>
      </tr>
    </tbody>
  </table>
);

PortalDetails.propTypes = {
  portal: validatePortal
};

export default PortalDetails;
