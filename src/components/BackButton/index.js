"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { NavigateBeforeIcon } from "@/components/Icons";

function BackButton() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Button color="inherit" variant="outlined" onClick={handleBackClick}>
      <NavigateBeforeIcon />
    </Button>
  );
}

export default BackButton;
