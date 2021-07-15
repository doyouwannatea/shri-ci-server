import { ID, Name } from '.'
import { BuildCommand } from './Settings'

export type BuildStatus = 'Waiting' | 'InProgress' | 'Success' | 'Fail' | 'Canceled'

export type CommitHash = string
export type BuildNumber = number
export type CommitMessage = string
export type Duration = number
export type StartDate = string

export type Logs = string
// TODO: убрать тип снизу
export type DateTime = Date | string

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

export interface BuildConfig {
    buildCommand: BuildCommand
    commitHash: CommitHash
    repoLink: Name
    buildId: ID
    buildDate: Date
}

export type BuildConfigsList = BuildConfig[]

// *** Requests ***
export interface SetBuildBody {
    commitMessage: CommitMessage
    commitHash: CommitHash
    branchName: Name
    authorName: Name
}

export interface StartBuildBody {
    buildId: ID
    dateTime: Date
}

export interface FinishBuildBody {
    buildId: ID
    duration: Duration
    success: boolean
    buildLog: Logs
}

export interface CancelBuildBody {
    buildId: ID
}
// *** Requests ***

// *** Responces ***
export interface SetBuildResponse {
    id: ID
    buildNumber: BuildNumber
    status: BuildStatus
}

export interface AxiosResponse<B> {
    data: B
}
// *** Responces ***
