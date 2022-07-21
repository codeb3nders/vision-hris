import CardWTitle from 'CustomComponents/CardWTitle';
import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

type Props = {
  className?: string;
};

const AttendancePreview = ({ className }: Props) => {
  return (
    <CardWTitle className={`${className}`} title='Attendance'>
      <div>
        <VictoryChart
          height={380}
          theme={VictoryTheme.material}
          animate={{
            duration: 1000,
            onLoad: { duration: 1000 },
          }}
        >
          <VictoryLine
            interpolation='natural'
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' },
            }}
            labels={({ datum }) => datum.y}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 4 },
            ]}
          />
          <VictoryLine
            interpolation='natural'
            style={{
              data: { stroke: 'orange' },
              // parent: { border: '1px solid #ccc' },
            }}
            labels={({ datum }) => datum.y}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 4 },
              { x: 3, y: 1 },
              { x: 4, y: 4.5 },
              { x: 5, y: 3 },
            ]}
          />
        </VictoryChart>
      </div>
    </CardWTitle>
  );
};

export default AttendancePreview;
