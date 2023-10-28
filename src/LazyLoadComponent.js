import React, { useState, useEffect } from "react";

function LazyLoadComponent({ path }) {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    import(`./${path}`).then((module) => {
      setComponent(module.default);
    });
  }, [path]);
  return Component ? <Component /> : <div>Loading...</div>;
}

export default LazyLoadComponent;
