import styles from "./StarRating.module.css";
import { Star } from "./Star";
import { useState } from "react";

export const StarRating = ({
  maxRating = 5,
  color = "#000",
  size = 1,
  defaultRating = 0,
  onSetRating = () => {
    console.log("onSetRating not defined");
  },
}) => {
  const textStyles = {
    color: color,
    fontSize: `${size / 1.5}rem`,
  };

  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);
  const handleRate = (ratingValue) => {
    setRating(ratingValue);
    onSetRating(ratingValue);
  };

  const handleHoverRate = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.starContainer}>
        {Array.from({ length: maxRating }, (_, i) => {
          return (
            <Star
              key={i}
              onRate={() => handleRate(i + 1)}
              onHoverIn={() => handleHoverRate(i + 1)}
              onHoverOut={() => handleHoverRate(0)}
              full={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
              color={color}
              size={size}
            />
          );
        })}
      </div>
      <p className={styles.text} style={textStyles}>
        {hoverRating || rating || ""}
      </p>
    </div>
  );
};
