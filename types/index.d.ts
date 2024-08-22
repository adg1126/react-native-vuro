declare module '*.jpg';
declare module '*.jpeg';

declare interface TabIconProps {
  icon: number;
  color: string;
  name: string;
  focused: boolean;
}

declare interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

declare interface FormFieldProps {
  title: string;
  placeholder: string;
  value: string;
  handleChangeText: any;
  otherStyles?: string;
  keyboardType?: string;
}

declare interface SigninProps {
  email: string;
  password: string;
}

declare interface SignupProps {
  email: string;
  password: string;
  username: string;
}

declare type User = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $tenant: string;
  $updatedAt: string;
  accountId: string;
  avatar: string;
  email: string;
  username: string;
};
