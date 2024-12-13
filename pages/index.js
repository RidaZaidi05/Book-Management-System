import { useRouter } from "next/router";
import { useEffect } from "react";

const NavigateToBooks = () => {
  const router = useRouter();
  useEffect(()=>{
    handleNavigation();
  },[])

  const handleNavigation = () => {
    router.push("/books");
  };

  return (
    <div></div>
  );
};

export default NavigateToBooks;
