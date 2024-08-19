import { useRef, useState, useEffect } from 'react';
import useDraggable from '@pega/cosmos-react-core/lib/hooks/useDraggable';

const useDraggableWrapper = (draggableElementRef, dragHandleRef, enabled = true) => {
  const [dragging, setDragging] = useState(false);
  const draggableElPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const onMouseDown = (event) => {
      setDragging(true);
      if (draggableElementRef.current) {
        const { clientX, clientY } = 'touches' in event ? event.touches[0] : event;
        draggableElPosition.current.x = clientX - draggableElementRef.current.getBoundingClientRect().left;
        draggableElPosition.current.y = clientY - draggableElementRef.current.getBoundingClientRect().top;
        console.log('Drag started', draggableElPosition.current);
      }
    };

    if (dragHandleRef.current) {
      const { current } = dragHandleRef;
      current.addEventListener('mousedown', onMouseDown);
      current.addEventListener('touchstart', onMouseDown);
      return () => {
        current.removeEventListener('mousedown', onMouseDown);
        current.removeEventListener('touchstart', onMouseDown);
      };
    }
  }, [dragHandleRef.current, enabled]);

  useEffect(() => {
    const onMouseMove = (event) => {
      if (!dragging) return;
      if (draggableElementRef.current) {
        const { clientX, clientY } = 'touches' in event ? event.touches[0] : event;
        const positionX = clientX - draggableElementRef.current.offsetLeft - draggableElPosition.current.x;
        const positionY = clientY - draggableElementRef.current.offsetTop - draggableElPosition.current.y;
        draggableElementRef.current.style.transform = `translate(${positionX}px, ${positionY}px)`;
        console.log('Dragging', { positionX, positionY });
      }
    };

    const onMouseUp = () => {
      setDragging(false);
      console.log('Drag ended');
    };

    if (dragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchend', onMouseUp);
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchend', onMouseUp);
      };
    }
  }, [dragging]);

  useDraggable(draggableElementRef, dragHandleRef, enabled);
};

export default useDraggableWrapper;