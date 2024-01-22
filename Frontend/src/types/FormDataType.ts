export type FormValue = {
  email: string;
  password: string;
  confirmPassword?: string;
  date_de_naissance?: Date;
};
export interface Order {
  _id: string;
  ProductName: string;
  quantity: number;
  state: string;
  // Add more properties as needed
}
