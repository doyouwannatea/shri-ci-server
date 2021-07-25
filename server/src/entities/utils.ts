import { Options, spawn } from 'child-process-promise'
import { SpawnOptions } from 'child_process'
import { ChildProcessOutput } from '../../../models'

export function concatLog({ stdout, stderr }: ChildProcessOutput): string {
    return stdout + '\n' + stderr
}

export async function spawnWithLog(
    command: string,
    args?: readonly string[] | null | undefined,
    options?: Readonly<Options & SpawnOptions> | undefined): Promise<{ stdout: string, stderr: string }> {
    const result = {
        stdout: '',
        stderr: ''
    }, promise = spawn(command, args, options)

    promise.childProcess.stdout?.on('data', (buffer: Buffer) => {
        result.stdout += buffer.toString()
    })

    promise.childProcess.stderr?.on('data', (buffer: Buffer) => {
        result.stderr += buffer.toString()
    })

    await promise
    return result
}