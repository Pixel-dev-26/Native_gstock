export type Tourist = {
  id: number;
  name: string;
  email: string;
};

export type TouristInput = Pick<Tourist, "name" | "email">;
