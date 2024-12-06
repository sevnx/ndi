'use client'

import { addBadge } from "./badge";

const EndPage = () => {
  return <div className="w-0 h-0" onLoad={() => addBadge("Read")} />;
};

export default EndPage;
