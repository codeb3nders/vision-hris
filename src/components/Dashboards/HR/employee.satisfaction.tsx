import CardWTitle from 'CustomComponents/CardWTitle';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';

type Props = {
  className?: string;
};

const EmployeeSatisfaction = ({ className }: Props) => {
  return (
    <CardWTitle title='Employee Work Satisfaction' className={className}>
      <p className='text-xs'>
        How likely do you think this company is likely to succeed.
      </p>
      <div className='mt-[-10px]'>
        <VictoryChart
          // theme={VictoryTheme.material}
          domainPadding={{ x: 15 }}
          animate={{
            duration: 1000,
            onLoad: { duration: 1000 },
          }}
        >
          <VictoryBar
            barWidth={50}
            labels={({ datum }) => datum.y}
            style={{
              data: {
                fill: ({ datum }) =>
                  datum.x === 'Extremely likely'
                    ? 'forestgreen'
                    : datum.x === 'Very likely'
                    ? 'dodgerblue'
                    : datum.x === 'Somewhat likely'
                    ? 'gold'
                    : datum.x === 'Not so likely'
                    ? 'orangered'
                    : datum.x === 'Not at all likely'
                    ? 'red'
                    : '#ccc',
              },
            }}
            data={[
              { x: 'Extremely likely', y: 3 },
              { x: 'Very likely', y: 2 },
              { x: 'Somewhat likely', y: 4 },
              { x: 'Not so likely', y: 2 },
              { x: 'Not at all likely', y: 1 },
            ]}
          />
          <VictoryAxis
            label='Ratings'
            style={{
              axisLabel: {},
              tickLabels: { fontSize: 12, width: 50, wordWrap: 'break-word' },
            }}
          />
        </VictoryChart>
      </div>
    </CardWTitle>
  );
};

export default EmployeeSatisfaction;
