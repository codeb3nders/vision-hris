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
  CakeTwoTone,
  CelebrationTwoTone,
  WorkOffTwoTone,
  PregnantWomanTwoTone,
  BabyChangingStationTwoTone,
  HomeWorkTwoTone,
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
  <HomeWorkTwoTone color='secondary' {...props} />
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
const BirthdayIcon = (props?: any) => <CakeTwoTone color='success' {...props} />;
const CelebrationIcon = (props?: any) => <CelebrationTwoTone color='success' {...props} />;
const CompensatoryIcon = (props?: any) => <WorkOffTwoTone color='success' {...props} />;
const MaternityIcon = (props?: any) => <PregnantWomanTwoTone color='success' {...props} />;
const PaternityIcon = (props?: any) => <BabyChangingStationTwoTone color='success' {...props} />;
const OBIcon = (props?: any) => <BusinessCenterTwoTone color='success' {...props} />;

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
  BirthdayIcon,
  CelebrationIcon,
  CompensatoryIcon,
  MaternityIcon,
  PaternityIcon,
  OBIcon
};
