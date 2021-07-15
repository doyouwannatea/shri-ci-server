import { ID, Name } from '.'

export type BuildCommand = string
export type MainBranch = string
export type Period = number

export interface SettignsResponse {
    id: ID
    repoName: Name
    buildCommand: BuildCommand
    mainBranch: MainBranch
    period: Period
}

export type Settings = Omit<SettignsResponse, 'id'>
