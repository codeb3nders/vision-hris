import {
  MoreTimeTwoTone,
  BusinessCenterTwoTone,
  SickTwoTone,
  BeachAccessTwoTone,
  CottageTwoTone,
  MoneyOffTwoTone,
  AttachMoneyTwoTone,
  MedicalServicesTwoTone,
  PaidTwoTone,
  TimeToLeaveTwoTone,
} from '@mui/icons-material';

const OTIcon = (props?: any) => <MoreTimeTwoTone color='action' {...props} />;
const LeaveIcon = (props?: any) => (
  <TimeToLeaveTwoTone color='action' {...props} />
);
const BusinessIcon = (props?: any) => (
  <BusinessCenterTwoTone color='primary' {...props} />
);
const SickIcon = (props?: any) => <SickTwoTone color='error' {...props} />;
const VacationIcon = (props?: any) => (
  <BeachAccessTwoTone color='success' {...props} />
);
const HomeIcon = (props?: any) => (
  <CottageTwoTone color='secondary' {...props} />
);
const UnpaidIcon = (props?: any) => (
  <MoneyOffTwoTone color='warning' {...props} />
);
const PaidIcon = (props?: any) => (
  <AttachMoneyTwoTone color='success' {...props} />
);
const EmergencyIcon = (props?: any) => (
  <MedicalServicesTwoTone color='error' {...props} />
);
const ServiceIcon = (props?: any) => <PaidTwoTone color='success' {...props} />;

export {
  OTIcon,
  LeaveIcon,
  BusinessIcon,
  SickIcon,
  VacationIcon,
  UnpaidIcon,
  HomeIcon,
  PaidIcon,
  EmergencyIcon,
  ServiceIcon,
};
