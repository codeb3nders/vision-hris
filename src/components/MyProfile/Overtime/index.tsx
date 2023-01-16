import History from 'components/MyProfile/Overtime/history';
import UpcomingOT from './upcoming';
import DisapprovedCancelled from './disapprovedCancelled';
import PendingOT from './pending';

type Props = {
    pendingOT: any[];
    OTRequests: any[];
    OTHistory: any[];
    cancelledOT: any[];
    isHRview?: boolean;
}

const OT = ({pendingOT, OTRequests, OTHistory, cancelledOT, isHRview}: Props) => {
    
    return <>
        <PendingOT data={pendingOT} isHRview />
        <UpcomingOT data={OTRequests} />
        <History data={OTHistory}/>
        <DisapprovedCancelled data={cancelledOT}/>
    </>
}
export default OT;
