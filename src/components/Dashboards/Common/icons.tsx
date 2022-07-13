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
} from '@mui/icons-material';

const OTIcon = (props?: any) => <MoreTimeTwoTone {...props} color='action' />;
const BusinessIcon = (props?: any) => (
  <BusinessCenterTwoTone {...props} color='primary' />
);
const SickIcon = (props?: any) => <SickTwoTone {...props} color='error' />;
const VacationIcon = (props?: any) => (
  <BeachAccessTwoTone {...props} color='success' />
);
const HomeIcon = (props?: any) => (
  <CottageTwoTone {...props} color='secondary' />
);
const UnpaidIcon = (props?: any) => (
  <MoneyOffTwoTone {...props} color='warning' />
);
const PaidIcon = (props?: any) => (
  <AttachMoneyTwoTone {...props} color='success' />
);
const EmergencyIcon = (props?: any) => (
  <MedicalServicesTwoTone {...props} color='error' />
);
const ServiceIcon = (props?: any) => <PaidTwoTone {...props} color='success' />;

export {
  OTIcon,
  BusinessIcon,
  SickIcon,
  VacationIcon,
  UnpaidIcon,
  HomeIcon,
  PaidIcon,
  EmergencyIcon,
  ServiceIcon,
};
