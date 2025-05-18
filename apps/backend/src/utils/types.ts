export enum VOTE_TYPE {
  NO_VOTE,
  YEA,
  NAY
}

export type Vote = {
  id: number
  billId: number
}

export type VoteResults = {
  id: number
  legislatorId: number
  voteId: number
  voteType: VOTE_TYPE
}

export type Bill = {
  id: number
  title: string
  sponsorId: number
}

export type Legislator = {
  id: number
  name: string
}

export type LegislatorSummary = Legislator & {
  supportedBills: number
  opposedBills: number
}

export type BillsSummary = {
  id: number
  title: string
  supporters: number
  opposers: number
  primarySponsor: string
}