import CardWTitle from 'CustomComponents/CardWTitle';
import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';

type Props = {
  className?: string;
};

const HeadCount = ({ className }: Props) => {
  return (
    <CardWTitle title='Headcount' className={`${className}`}>
      <div className=''>
        <VictoryChart
          height={400}
          // theme={VictoryTheme.material}
          domainPadding={{ x: 20 }}
          animate={{
            duration: 1000,
            onLoad: { duration: 1000 },
          }}
        >
          <VictoryBar
            horizontal
            barRatio={1}
            labels={({ datum }) => datum.y}
            categories={{ y: ['0%', '10%', '20%', '30%', '40%', '50%'] }}
            style={{
              data: {
                fill: ({ datum }) =>
                  datum.x === 'Administration'
                    ? 'forestgreen'
                    : datum.x === 'Operations'
                    ? 'dodgerblue'
                    : datum.x === 'Marketing'
                    ? 'gold'
                    : datum.x === 'Finance'
                    ? 'orangered'
                    : datum.x === 'Human Resources'
                    ? 'red'
                    : datum.x === 'Sales'
                    ? ''
                    : '#ccc',
              },
            }}
            data={[
              { x: 'Administration', y: '30%' },
              { x: 'Operations', y: '20%' },
              { x: 'Finance', y: '40%' },
              { x: 'Human Resources', y: '30%' },
              { x: 'Sales', y: '50%' },
              { x: 'Marketing', y: '10%' },
            ]}
          />
          {/* <VictoryAxis
            label='Ratings'
            style={{
              axisLabel: {},
              tickLabels: { fontSize: 12, width: 50, wordWrap: 'break-word' },
            }}
          /> */}
        </VictoryChart>
      </div>
    </CardWTitle>
  );
};

export default HeadCount;
