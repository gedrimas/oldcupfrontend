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
  ru: string;
  ee: string;
  email: string;
  phone: string;
  __v: number;
}
export interface Contacts {
  contacts: Contact[];
}

export type ResponsesTypes = Contacts | Sections;
