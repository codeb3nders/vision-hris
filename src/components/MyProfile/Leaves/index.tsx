import History from 'components/MyProfile/Leaves/history';
import UpcomingLeaves from 'components/MyProfile/Leaves/upcoming';
import DisapprovedCancelled from './disapprovedCancelled';
import PendingLeaves from 'components/MyProfile/Leaves/pending.leaves';

type Props = {
    pendingLeaves: any[];
    leaveRequests: any[];
    leaveHistory: any[];
    cancelledLeaves: any[];
    isHRview?: boolean;
}

const Leaves = ({pendingLeaves, leaveRequests, leaveHistory, cancelledLeaves, isHRview}: Props) => {
    
    return <>
        <PendingLeaves data={pendingLeaves} isHRview />
        <UpcomingLeaves data={leaveRequests} />
        <History data={leaveHistory}/>
        <DisapprovedCancelled data={cancelledLeaves}/>
    </>
}
export default Leaves;
