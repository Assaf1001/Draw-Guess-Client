import { useEffect } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const DrawingCanvas = ({ canvasRef, paths }) => {
  useEffect(() => {
    if (!!paths && !!canvasRef && !!canvasRef.current) {
      canvasRef.current.resetCanvas();
      if (paths.length > 0) canvasRef.current.loadPaths(paths);
    }
  }, [paths, canvasRef]);

  return (
    <div className="drawing-canvas">
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={!!paths ? '0' : '4'}
        strokeColor="#14274E"
        width="100%"
        height="100%"
      />
      {!paths && (
        <div className="buttons">
          <button onClick={() => canvasRef.current.undo()}>Undo</button>
          <button onClick={() => canvasRef.current.clearCanvas()}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default DrawingCanvas;
