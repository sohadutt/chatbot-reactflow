import React, { useState } from 'react';
import { getBezierPath } from '@xyflow/react';

function CustomEdge({
  id,
  sourceX, sourceY,
  targetX, targetY,
  sourcePosition,
  targetPosition,
  data,
  label,
  selected,
  style,
  markerEnd,
  onLabelChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(label || '');

  const [edgePath] = getBezierPath({
    sourceX, sourceY, targetX, targetY,
    sourcePosition, targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text>
        <textPath
          href={`#${id}`}
          style={{ fontSize: 12, pointerEvents: 'all', userSelect: 'none', cursor: 'pointer' }}
          startOffset="50%"
          textAnchor="middle"
          onClick={() => setIsEditing(true)}
        >
          {!isEditing ? tempLabel || 'Click to name' : (
            <tspan>
              <foreignObject width={100} height={20} x="-50" y="-15">
                <input
                  type="text"
                  value={tempLabel}
                  onChange={e => setTempLabel(e.target.value)}
                  onBlur={() => {
                    onLabelChange(id, tempLabel);
                    setIsEditing(false);
                  }}
                  autoFocus
                  style={{ width: '100%', fontSize: 12, padding: 2, borderRadius: 4, border: '1px solid #ccc' }}
                />
              </foreignObject>
            </tspan>
          )}
        </textPath>
      </text>
    </>
  );
}

export default CustomEdge;
