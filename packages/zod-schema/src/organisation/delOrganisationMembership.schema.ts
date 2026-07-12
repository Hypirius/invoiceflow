import z from "zod";

const delOrganisationMembershipItem = z.number();
const delOrganisationMemberships = z.array(delOrganisationMembershipItem);

export { delOrganisationMembershipItem, delOrganisationMemberships };
