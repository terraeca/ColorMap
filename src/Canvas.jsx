import React, { useRef, useEffect } from "react";


export const MyCanvas = (props = { reverse, width, height }) => {

  const { width, height, reverse } = props;
  const canvasRef = useRef(null);

  //Calculate center point of canvas for reference
  const centerX = width / 2;
  const centerY = height / 2;


  //Array containing all RGB collors *step by 8
  const colors = [];
  for (let r = 0; r <= 255; r += 8) {
    for (let g = 0; g <= 255; g += 8) {
      for (let b = 0; b <= 255; b += 8) {
        colors.push([r, g, b]);
      }
    }
  }

  //calculate pixel size for each color
  const pixelSize = {
    height: height / Math.sqrt(colors.length),
    width: width / Math.sqrt(colors.length),
  }


  //Function to create Retangular motion draw
  function drawRectangularMotion(ctx) {

    //our initial position set on the center of the canvas
    let x = centerX;
    let y = centerY;


    let direction = 0;

    let steps = 1;
    let stepsTaken = 0;

    //loop thought all colors
    for (let i = 0; i < colors.length; i++) {

      //assign color from the array for this pixel
      ctx.fillStyle = `rgb(${colors[i].join(",")})`;
      //Draw pixel rectangular pixel on position (x,y) with the calculate Pixel Size
      ctx.fillRect(x, y, pixelSize.height, pixelSize.width);

      //determine which direction should the next position be calculated
      switch (direction) {
        //go up
        case 0:
          y = y + pixelSize.height;
          break;
        //go left  
        case 1:
          x = x - pixelSize.width;
          break;
        //go down
        case 2:
          y = y - pixelSize.height;
          break;
        //go right 
        case 3:
          x = x + pixelSize.width;
          break;
      }

      stepsTaken++;

      //check if should move to next direction
      if (stepsTaken === steps) {
        //get next direction, making sure is not higher than 3
        direction = (direction + 1) % 4;
        //if new direction is either going up or down, increase the number of steps necessary to complete this line
        (direction === 0 || direction === 2) && steps++
        stepsTaken = 0;
      }
    }
  }



  //Check if reverse button was click to reverse color order
  useEffect(() => {
    //initiate canvas Ref
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    reverse && colors.reverse()
    drawRectangularMotion(ctx)
  }, [reverse]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};
