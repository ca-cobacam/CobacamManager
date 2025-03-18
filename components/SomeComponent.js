import React, { useEffect, useState } from "react";

const SomeComponent = () => {
  const [randomValue, setRandomValue] = useState(null);

  useEffect(() => {
    setRandomValue(Math.random());
  }, []);

  return (
    <div>
      {/* ...existing code... */}
      {randomValue && <p>Random Value: {randomValue}</p>}
      {/* ...existing code... */}
    </div>
  );
};

export default SomeComponent;
