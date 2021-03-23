interface Section {
  sections: true;
  _id: string;
  ru: string;
  ee: string;
  __v: number;
}
export type Sections = Section[];

interface Contact {
  _id: string;
  ruInfo: string;
  eeInfo: string;
  email: string;
  phone: string;
  __v: number;
}
export type Contacts = [Contact];

export default interface ResponsesTypes {
  allsections: Sections;
  contacts: Contacts;
}
