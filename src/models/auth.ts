export enum StatusAccount {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}
export interface UserInfo {
  _id: string;
  userId: UserId;
  memberId: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalHistory: boolean;
  medicalConditions: string[];
  medicalDetail: string;
  avatarUrl: string;
  email: string;
  exercise: any[];
  createdAt: string;
  updatedAt: string;
}

export interface UserId {
  fullName: string;
  dateOfBirth: string;
  gender: number;
  phone: string;
}
