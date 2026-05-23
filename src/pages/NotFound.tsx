import { useEffect } from "react";
import FuzzyText from "@/Components/TextAnimations/FuzzyText/FuzzyText";
import "@/CssPages/notfound.css";

const NotFound = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="ev">
        <title>PAGE NOT FOUND</title>

        <div className="parent">
          <header>
            <div className="n404">
              <div className="n404-wr">
                <FuzzyText
                  baseIntensity={0.1}
                  hoverIntensity={0.6}
                  enableHover={true}
                  fontSize="9rem"
                  fontFamily="nippo"
                >
                  404
                </FuzzyText>
              </div>
              <div className="n404-wr">
                <FuzzyText
                  baseIntensity={0.1}
                  hoverIntensity={0.5}
                  enableHover={true}
                  fontSize="3rem"
                  fontFamily="nippo"
                >
                  Not Found
                </FuzzyText>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default NotFound;
