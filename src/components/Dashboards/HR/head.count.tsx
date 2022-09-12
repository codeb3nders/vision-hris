import CardWTitle from 'CustomComponents/CardWTitle';
import { stringToColour } from 'utils/functions';
import { VictoryChart, VictoryBar } from 'victory';

type Props = {
  className?: string;
  data: any[];
};

const HeadCount = ({ className, data }: Props) => {
  return (
    <CardWTitle title='Headcount' className={`${className}`}>
      <div className=''>
        <VictoryChart
          height={500}
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
            // categories={{ y: ['0%', '10%', '20%', '30%', '40%', '50%'] }}
            style={{
              data: {
                fill: ({ datum }) => stringToColour(datum.name)
              },
            }}
            data={data}
          />
        </VictoryChart>
      </div>
    </CardWTitle>
  );
};

export default HeadCount;
