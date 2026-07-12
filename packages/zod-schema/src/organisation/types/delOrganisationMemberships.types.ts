import z from "zod";
import {
  delOrganisationMembershipItem,
  delOrganisationMemberships,
} from "../delOrganisationMembership.schema";

type delOrganisationMembershipItemType = z.infer<
  typeof delOrganisationMembershipItem
>;

type delOrganisationMembershipsType = z.infer<
  typeof delOrganisationMemberships
>;

export type {
  delOrganisationMembershipItemType,
  delOrganisationMembershipsType,
};
