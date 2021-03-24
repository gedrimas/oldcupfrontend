interface Section {
  sections: true;
  _id: string;
  ru: string;
  ee: string;
  __v: number;
}
export interface Sections {
  allsections: Section[];
}

interface Contact {
  _id: string;
  ruInfo: string;
  eeInfo: string;
  email: string;
  phone: string;
  __v: number;
}
export interface Contacts {
  contacts: [Contact];
}

// export default interface ResponsesTypes<T extends Sections | Contacts> {
//   allsections: T;
//   contacts: T;
// }

export type ResponsesTypes = Contacts | Sections;

//type test<T extends 'allsections' | 'contacts'> = Pick<ResponsesTypes, T>;

//type all = test<'allsections'>;
