import prisma, { queryPubExt, validatePublication } from "./prisma";

export async function getAllPubs() {
  const pubs = await prisma.publication.findMany(queryPubExt);
  return pubs.map(validatePublication);
}

export async function getPubsByPerson(
  personId: number,
  selectByMemberId?: string,
) {
  const where = {
    authors: {
      some: {
        id: personId,
      },
    },
  };

  const pubs = await (selectByMemberId
    ? prisma.publication.findMany({
        where: {
          AND: {
            ...where,
            selectedBy: {
              some: {
                memberId: selectByMemberId,
              },
            },
          },
        },
        ...queryPubExt,
      })
    : prisma.publication.findMany({
        where: where,
        ...queryPubExt,
      }));

  return pubs.map(validatePublication);
}
