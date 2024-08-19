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
