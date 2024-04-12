import { Person } from "@prisma/client";

export function composeFullName(person: Person) {
  const { firstname, goby, middlename, lastname } = person;
  const name = middlename ? `${firstname} ${middlename}` : firstname;
  if (goby) {
    return `${goby} (${name}) ${lastname}`;
  } else {
    return `${name} ${lastname}`;
  }
}
