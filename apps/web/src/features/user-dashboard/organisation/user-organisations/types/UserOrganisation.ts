export type UserOrganisation = {
  id: number;
  name: string;
  role: string;
  logoLink: string;
  owner: {
    id: string;
    fullName: string;
    displayName: string;
    profileImage: string;
  };
};
