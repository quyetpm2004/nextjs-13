"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

const Facebook = () => {
  const router = useRouter();

  const handleBtn = () => {
    router.push("/");
  };
  return (
    <>
      <h2>Facebook page</h2>
      <div>
        <Button variant="primary">Hoidanit</Button>
        <button onClick={() => handleBtn()}>Back Home</button>
      </div>
    </>
  );
};

export default Facebook;
