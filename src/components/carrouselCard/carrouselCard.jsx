import React,{useState} from "react";
import { Carousel } from "react-bootstrap";


export default function Carrousel({ imagen, velocidad }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel style={{ maxWidth: 400, margin: "auto" }} activeIndex={index} onSelect={handleSelect} interval={velocidad} >
        {imagen.map((picture) => (
          <Carousel.Item  >
            <img
              className="d-block w-100"
              height={230}
              src={picture}
              alt="Not fount"
              style={{objectFit: "contain"}}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
