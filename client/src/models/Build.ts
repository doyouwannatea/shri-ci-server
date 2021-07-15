import { ID, Name } from '.'

export type BuildStatus = 'Waiting' | 'InProgress' | 'Success' | 'Fail' | 'Canceled'

export type CommitHash = string
export type BuildNumber = number
export type CommitMessage = string
export type Duration = number
export type StartDate = string

export type Logs = string

export interface BuildItem {
    id: ID
    configurationId: ID
    buildNumber: BuildNumber
    commitMessage: CommitMessage
    commitHash: CommitHash
    branchName: Name
    authorName: Name
    status: BuildStatus
    start: StartDate | null
    duration: Duration | null
}

export type BuildsList = BuildItem[]

