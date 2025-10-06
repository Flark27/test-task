import { CallIcon } from "../../components/icons/call-icon";
import { WhatsappIcon } from "../../components/icons/whatsapp-icon";
import { Contact } from "../types/contacts";

export const CONTACTS: Contact[] = [
  {
    id: 1,
    icon: <WhatsappIcon />,
    number: "+7 945-918-2135",
    title: "Whats App",
  },
  {
    id: 2,
    icon: <CallIcon />,
    number: "+7 945-918-2132",
    title: "Позвоните нам",
  },
];
