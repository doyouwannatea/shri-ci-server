import { ChildProcessOutput } from '../../../models'

export function concatLog({ stdout, stderr }: ChildProcessOutput): string {
    return stdout + '\n' + stderr
}
