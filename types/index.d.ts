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
  handleChangeText: (e) => void;
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
  $permissions: string[] | [];
  $tenant: string;
  $updatedAt: string;
  accountId: string;
  avatar: string;
  email: string;
  username: string;
};

declare interface SearchInputProps {
  value: string;
  handleChangeText: (e: string) => void;
  placeholder: string;
}

declare interface EmptyStateProps {
  title: string;
  subtitle: string;
}

declare type VideoDoc = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[] | [];
  $tenant: string;
  $updatedAt: string;
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
  users: User;
};

declare interface TrendingItemProps {
  activeItemKey: string;
  item: VideoDoc;
  index: number;
  arrLength: number;
}

declare interface ViewableItemProps {
  index: number | null;
  isViewable: boolean;
  key: string;
  item: VideoDoc;
}

declare interface VideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
  videoPlayerStyles?: string;
  thumbnailStyles?: string;
}
