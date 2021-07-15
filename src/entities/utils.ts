import { access } from 'fs/promises'
import { ChildProcessOutput } from '../models'

export function concatLog({ stdout, stderr }: ChildProcessOutput): string {
    return stdout + '\n' + stderr
}

export async function exists(path: string): Promise<boolean> {
    try {
        await access(path)
        return true
    } catch (error) {
        return false
    }
}