import React, { useEffect } from "react";

const TrustedCustomers = () => {
  const [randomNumbers, setRandomNumbers] = React.useState<number | null>(null);

  useEffect(() => {
    const randomNumber = 2000 + Math.floor(Math.random() * 100);
    setRandomNumbers(randomNumber);
  }, []);
  return (
    <span>
      <strong className="text-accent">+{randomNumbers ?? 0}</strong>{" "}
    </span>
  );
};

export default TrustedCustomers;
