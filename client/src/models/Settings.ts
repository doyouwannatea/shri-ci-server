import { ID, Name } from '.'

export type BuildCommand = string
export type MainBranch = string
export type Period = number

export interface SettignsResponce {
    id: ID
    repoName: Name
    buildCommand: BuildCommand
    mainBranch: MainBranch
    period: Period
}

export interface Settings extends Omit<SettignsResponce, 'id'> { }
