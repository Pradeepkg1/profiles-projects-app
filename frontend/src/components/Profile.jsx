import React from "react";

function Profile({ profiles }) {
  return (
    <div>
      <h2>Profiles</h2>
      {profiles.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.email}</p>
          <p>{p.education}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;